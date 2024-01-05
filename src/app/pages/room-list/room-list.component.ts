import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faCog,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../core/service/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
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

  rooms = [
    {
      id: 'bdhsjkfb',
      name: 'Room 1',
      game: '4 in a row', // TODO: change to ID
      host: 'UserPippo123', // TODO: change to ID
    },
    {
      id: 'x8Ys7Dn2',
      name: 'Room 2',
      game: '4 in a row',
      host: 'UserZeta456',
    },
    {
      id: 'p4Qs9Fv6',
      name: 'Room 3',
      game: '4 in a row',
      host: 'UserGamma789',
    },
    {
      id: 'r7Tb1Uv3',
      name: 'Room 4',
      game: '4 in a row',
      host: 'UserDelta012',
    },
    {
      id: 'w2Ei5Oz8',
      name: 'Room 5',
      game: '4 in a row',
      host: 'UserTheta345',
    },
    {
      id: 'y6Rj0Kx7',
      name: 'Room 6',
      game: '4 in a row',
      host: 'UserIota678',
    },
  ];

  constructor(private modalService: ModalService) {}

  // Lifecycle hooks

  ngOnDestroy(): void {
    // Unsubscribe
    this.joinModalSubscription?.unsubscribe();
    this.newRoomModalSubscription?.unsubscribe();
  }

  joinRoom(roomId: string, roomName: string) {
    if (this.joinModal) {
      const modal = this.modalService.openModal(this.joinModal, {
        title: roomName,
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
            alert('Joining room ' + roomId);
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
