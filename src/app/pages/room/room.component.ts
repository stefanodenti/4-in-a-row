import { Component } from '@angular/core';
import { Room, RoomStateEnum } from '../../core/models/room.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStop,
  faPlay,
  faCog,
  faRefresh,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FourInARowSettingsComponent } from '../../games/four-in-a-row/components/four-in-a-row-settings/four-in-a-row-settings.component';
import { FourInARowComponent } from '../../games/four-in-a-row/four-in-a-row.component';
import { RoomPlayerListComponent } from "./components/room-player-list/room-player-list.component";
@Component({
    selector: 'app-room',
    standalone: true,
    templateUrl: './room.component.html',
    styleUrl: './room.component.scss',
    imports: [
        CommonModule,
        FontAwesomeModule,
        FourInARowSettingsComponent,
        FourInARowComponent,
        RouterLink,
        RoomPlayerListComponent
    ]
})
export default class RoomComponent {
  //Icons
  faCog = faCog;
  faRefresh = faRefresh;
  faPlay = faPlay;
  faStop = faStop;
  faArrowLeft = faArrowLeft;
  room: Room = {
    id: 'wewe',
    name: 'Room 1',
    hostId: 'UserPippo123',
    game: '4 in a row',
    state: RoomStateEnum.Waiting,
    players: [
      {
        id: 'UserPippo123',
        username: 'UserPippo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      },
      {
        id: 'UserSteve123',
        username: 'UserSteve123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      },
    ],
  };
  roomId: string = '';
  RoomStateEnum = RoomStateEnum;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
    });
  }

  openGameSettings() {
    console.log('openGameSettings');
  }

  switchGameState() {
    if (this.room.state === RoomStateEnum.Waiting) {
      this.room.state = RoomStateEnum.Playing;
      console.log('startGame');
    } else {
      this.room.state = RoomStateEnum.Waiting;
      console.log('stopGame');
    }
  }

  restartGame() {
    console.log('restartGame');
  }
}
