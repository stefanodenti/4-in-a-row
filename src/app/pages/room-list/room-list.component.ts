import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faCog,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../core/service/modal.service';
import { Subscription } from 'rxjs';
import { Room, RoomStateEnum } from '../../core/models/room.model';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { ContainerComponent } from '../../core/components/container/container.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { signal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-room-list',
  standalone: true,
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
  imports: [
    FontAwesomeModule,
    NavbarComponent,
    ContainerComponent,
    RoomCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomListComponent implements OnDestroy {
  //Icons
  faPlus = faPlus;
  faCog = faCog;
  faRightFromBracket = faRightFromBracket;

  //Properties
  @ViewChild('join', { static: true })
  joinModal: TemplateRef<HTMLElement> | null = null;
  joinModalSubscription: Subscription | null = null;

  @ViewChild('newRoom', { static: true })
  newRoomModal: TemplateRef<HTMLElement> | null = null;
  newRoomModalSubscription: Subscription | null = null;

  rooms = signal<Room[]>([
    {
      id: 'bdhsjkfb',
      name: 'Room 1',
      game: '4 in a row', // TODO: change to ID
      hostId: 'UserPippo123', // TODO: change to ID
      state: RoomStateEnum.Waiting,
      players: [
        {
          id: 'UserPippo123',
          username: 'UserPippo123',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
      ],
    },
  ]);

  constructor(private modalService: ModalService, private router: Router) {}

  // Lifecycle hooks

  ngOnDestroy(): void {
    // Unsubscribe
    this.joinModalSubscription?.unsubscribe();
    this.newRoomModalSubscription?.unsubscribe();
  }

  joinRoom(room: Room) {
    if (this.joinModal) {
      const modal = this.modalService.openModal(this.joinModal, {
        title: room.name,
        size: 'md',
        position: 'center',
        showCloseButton: true,
        showConfirmActions: true,
        confirmText: 'Join',
        backdropDismiss: false,
      });

      modal.closeEvent.subscribe({
        next: (result: boolean) => {
          if (result) {
            this.router.navigate(['/room', room.id]);
          }
        },
      });
    }
  }

  createRoom() {
    if (this.newRoomModal) {
      const modal = this.modalService.openModal(this.newRoomModal, {
        title: 'New room',
        size: 'md',
        position: 'center',
        showCloseButton: true,
        showConfirmActions: true,
        confirmText: 'Create',
        backdropDismiss: false,
      });

      modal.closeEvent.subscribe({
        next: (result: boolean) => {
          if (result) {
            alert('Creating new room');
          }
        },
      });
    }
  }
}
