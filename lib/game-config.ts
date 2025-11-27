import { GameConfig } from "@/app/types/game";

export const MAX_PLAYERS = 12;

export const MIN_PLAYERS = 3;

export const MIN_IMPOSTORS = 1;

export const INITIAL_GAME_CONFIG: GameConfig = {
  totalPlayers: MIN_PLAYERS,
  impostorCount: MIN_IMPOSTORS,
  players: [],
  gameType: "paper",
  namesEnabled: true,
  mainQuestion: "",
  impostorQuestion: "",
};
