import { FourInARowSettings } from './../../games/four-in-a-row/models/four-in-a-row.model';
export interface Room {
    id: string;
    name: string;
    hostId: string;
    game: string;
    state: RoomStateEnum;
    players: User[];
    settings?: FourInARowSettings | any;
}
export enum RoomStateEnum {
    Waiting = 'waiting',
    Playing = 'playing',
}

export interface User {
    id: string;
    username: string;
    avatar: string;
}