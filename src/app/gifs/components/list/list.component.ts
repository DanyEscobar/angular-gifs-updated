import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";

@Component({
  selector: 'app-list',
  imports: [
    ListItemComponent
  ],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  public gifs = input.required<string[]>();
}
