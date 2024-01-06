import { User } from "../../../core/models/room.model";

export interface FourInARowSettings {
  rows: number;
  columns: number;
  winCondition: number;
}

export type PlayerScore = { player: User; score: number };