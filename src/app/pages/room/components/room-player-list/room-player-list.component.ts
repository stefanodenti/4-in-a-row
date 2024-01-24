import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../../core/models/room.model';

@Component({
  selector: 'app-room-player-list',
  standalone: true,
  imports: [],
  templateUrl: './room-player-list.component.html',
  styleUrl: './room-player-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomPlayerListComponent {
  @Input() players: User[] = [];
  @Input() hostId: string = '';
}
