import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rooms',
  },
  {
    path: 'rooms',
    loadComponent: () =>
      import('./pages/room-list/room-list.component').then(
        (m) => m.RoomListComponent
      ),
  },
];
