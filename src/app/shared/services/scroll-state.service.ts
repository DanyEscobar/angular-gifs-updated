import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  public trendingScrollState = signal<number>(0);

  // pagesScrollState: Record<string, number> = {
  //   'page1': 1000,
  //   'page2': 0,
  //   'aboutPage': 50,
  // }

}
