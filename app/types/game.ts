export enum GameScreen {
  LANDING,
  PLAYER_NAMES,
  VARIANT,
}

export interface Player {
  id: number;
  name: string;
  isImpostor: boolean;
}

export interface GameConfig {
  totalPlayers: number;
  impostorCount: number;
  players: Player[];
  gameType: "paper" | "mobile";
  namesEnabled: boolean;
  mainQuestion: string;
  impostorQuestion: string;
}

export enum StorageKeys {
  GAME_CONFIG = "game_config",
  CURRENT_STEP = "current_step",
}
