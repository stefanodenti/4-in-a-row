import { Component } from '@angular/core';
import { Room, User } from '../../../../core/models/room.model';
import { input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { computed } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  room = input.required<Room>();
  @Output() joinRoom = new EventEmitter<Room>();

  getHost = computed(() => {
    return this.room().players.find(
      (player: User) => player.id === this.room().hostId
    )?.username;
  });
}
