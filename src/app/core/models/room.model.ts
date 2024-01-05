export interface Room {
    id: string;
    name: string;
    hostId: string;
    game: string;
    state: RoomStateEnum;
    players: User[];
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