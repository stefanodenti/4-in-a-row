import { Component } from '@angular/core';
import { Room } from '../../../../core/models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  room: Room = {};
}
