import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [
    ListComponent
  ],
  templateUrl: './search-page.component.html',
})

export default class SearchPageComponent {

  public gifService = inject(GifService);
  public gifs = signal<Gif[]>([]);
  public searchedGifsLoading = signal<boolean>(true);

  onSearch( query: string ): void {
    this.gifService.searchGifs( query ).subscribe( (resp) => {
      this.gifs.set( resp );
      this.searchedGifsLoading.set(false);
    });
  }
}
