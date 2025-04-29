import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return <Record<string, Gif[]>>gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  private readonly httpClient = inject(HttpClient);
  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);
  public trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  public searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  public searchHistoryKey = computed<string[]>(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory()));
  })

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.httpClient.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offsett: this.trendingPage() * 20,
      },
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update((currentGifs) => [ ...currentGifs, ...gifs ]);
      this.trendingPage.update((page) => page + 1);

      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs( query: string ): Observable<Gif[]> {
    return this.httpClient.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      },
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }));
      }),
    );
  }

  getHistoryGifs( query: string ): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
