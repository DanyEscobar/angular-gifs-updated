import { Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-list',
  imports: [
    ListItemComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent {
  public gifs = input.required<Gif[]>();
}
