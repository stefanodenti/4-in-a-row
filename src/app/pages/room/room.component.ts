import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Room, RoomStateEnum } from '../../core/models/room.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStop,
  faPlay,
  faCog,
  faRefresh,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FourInARowSettingsComponent } from '../../games/four-in-a-row/components/four-in-a-row-settings/four-in-a-row-settings.component';
import { FourInARowComponent } from '../../games/four-in-a-row/four-in-a-row.component';
import { RoomPlayerListComponent } from './components/room-player-list/room-player-list.component';
import { ModalService } from '../../core/service/modal.service';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { ContainerComponent } from '../../core/components/container/container.component';
import { signal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FourInARowSettings } from '../../games/four-in-a-row/models/four-in-a-row.model';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { take } from 'rxjs';
@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  imports: [
    NgClass,
    FontAwesomeModule,
    FourInARowSettingsComponent,
    FourInARowComponent,
    RouterLink,
    RoomPlayerListComponent,
    NavbarComponent,
    ContainerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RoomComponent {
  @ViewChild('settings') settings: TemplateRef<HTMLElement> | undefined;
  //Icons
  faCog = faCog;
  faRefresh = faRefresh;
  faPlay = faPlay;
  faStop = faStop;
  faArrowLeft = faArrowLeft;
  room = signal<Room>({
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
  });
  roomId: string = '';

  RoomStateEnum = RoomStateEnum;
  gameState: 'start' | 'stop' | 'restart' = 'stop';

  activeModal: ModalComponent | undefined;
  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
      // TODO: GET ROOM
      if (this.room().game === '4 in a row')
        this.room().settings = { rows: 9, columns: 9, winCondition: 4 };
    });
  }

  openGameSettings() {
    if (this.settings) {
      this.activeModal = this.modalService.openModal(this.settings, {
        title: 'Game Settings',
        position: 'bottom',
      });
      this.activeModal?.closeEvent.pipe(take(1)).subscribe({
        next: () => {
          this.activeModal = undefined;
        },
      });
    }
  }
  updateSettings($event: FourInARowSettings) {
    this.room.update((room: Room) => {
      return { ...room, settings: $event };
    });
    this.activeModal?.close();
  }
  switchGameState() {
    if (this.room().state === RoomStateEnum.Waiting) {
      this.room().state = RoomStateEnum.Playing;
      console.log('startGame');
      this.gameState = 'start';
    } else {
      this.room().state = RoomStateEnum.Waiting;
      console.log('stopGame');
      this.gameState = 'stop';
    }
  }

  restartGame() {
    console.log('restartGame');
    this.gameState = 'restart';
  }
}
