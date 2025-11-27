export enum SetupScreen {
  LANDING,
  PLAYER_NAMES,
  VARIANT,
}

export enum GameScreen {
  QUESTION_FORM,
  PLAYER_ROLES,
  REVEAL,
  VOTING,
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
  CURRENT_SETUP_SCREEN = "current_setup_screen",
  CURRENT_GAME_SCREEN = "current_game_screen",
}
