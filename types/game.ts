export enum SetupScreen {
  LANDING,
  PLAYER_NAMES,
  VARIANT,
}
export enum GameScreen {
  QUESTION_FORM,
  QUESTION_REVEAL,
  ANSWER_REVEAL,
  VOTING,
}

export interface Player {
  id: number;
  name: string;
}

export interface GamePlayer extends Player {
  isImpostor: boolean;
}

export interface GameConfig {
  totalPlayers: number;
  impostorCount: number;
  players: Player[];
  gamePlayers: GamePlayer[];
  currentPlayerIdx: number;
  gameType: 'paper' | 'mobile';
  namesEnabled: boolean;
  mainQuestion: string;
  impostorQuestion: string;
  whoAskedIdx: number;
  answers: string[];
}

export enum StorageKeys {
  GAME_CONFIG = 'game_config',
  CURRENT_GAME_SCREEN = 'current_game_screen',
  CURRENT_SETUP_SCREEN = 'current_setup_screen',
}
