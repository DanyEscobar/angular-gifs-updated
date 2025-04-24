import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  public imgUrl = input.required<string>();
}
