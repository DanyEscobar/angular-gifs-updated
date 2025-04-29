import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  public imgUrl = input.required<string>();
}
