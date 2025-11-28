import { GameConfig } from "@/types/game";

export const MAX_PLAYERS = 12;

export const MIN_PLAYERS = 3;

export const MIN_IMPOSTORS = 1;

export const INITIAL_GAME_CONFIG: GameConfig = {
  totalPlayers: MIN_PLAYERS,
  impostorCount: MIN_IMPOSTORS,
  players: Array.from({ length: MIN_PLAYERS }, (_, index) => ({
    id: index + 1,
    name: "",
    isImpostor: false,
  })),
  currentPlayerIdx: 0,
  gameType: "paper",
  namesEnabled: true,
  mainQuestion: "",
  impostorQuestion: "",
};
