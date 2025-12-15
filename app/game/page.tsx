'use client';

import { INITIAL_GAME_CONFIG } from '@/lib/game/config';
import { useGameStorage } from '@/lib/hooks/use-game-storage';
import { GameConfig, GameScreen, StorageKeys } from '@/types/game';
import QuestionFormScreen from '@/components/screens/question-form-screen';
import QuestionRevealScreen from '@/components/screens/question-reveal-screen';
import VotingScreen from '@/components/screens/voting-screen';
import AnswerRevealScreen from '@/components/screens/answer-reveal-screen';

export default function Game() {
  const [currentGameScreen, setCurrentGameScreen] = useGameStorage<GameScreen>(
    StorageKeys.CURRENT_GAME_SCREEN,
    GameScreen.QUESTION_FORM
  );

  const [config, setConfig] = useGameStorage<GameConfig>(
    StorageKeys.GAME_CONFIG,
    INITIAL_GAME_CONFIG
  );

  const updateConfig = (updates: Partial<GameConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const nextScreen = () =>
    setCurrentGameScreen((prev) => {
      if (prev === GameScreen.VOTING) {
        return GameScreen.QUESTION_FORM;
      }
      if (prev + 1 === GameScreen.ANSWER_REVEAL && config.gameType === 'mobile') {
        return GameScreen.ANSWER_REVEAL + 1;
      }
      return prev + 1;
    });

  const screenMap = {
    [GameScreen.QUESTION_FORM]: QuestionFormScreen,
    [GameScreen.QUESTION_REVEAL]: QuestionRevealScreen,
    [GameScreen.ANSWER_REVEAL]: AnswerRevealScreen,
    [GameScreen.VOTING]: VotingScreen,
  };

  const CurrentScreenComponent = screenMap[currentGameScreen];

  return <CurrentScreenComponent config={config} updateConfig={updateConfig} onNext={nextScreen} />;
}
