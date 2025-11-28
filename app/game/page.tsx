"use client";

import { INITIAL_GAME_CONFIG } from "@/lib/game/config";
import { useGameStorage } from "@/lib/hooks/use-game-storage";
import { GameConfig, GameScreen, StorageKeys } from "@/types/game";
import QuestionFormScreen from "@/components/screens/question-form-screen";
import QuestionRevealScreen from "@/components/screens/question-reveal-screen";
import VotingScreen from "@/components/screens/voting-screen";

export default function Game() {
  const [currentGameScreen, setCurrentGameScreen] = useGameStorage<GameScreen>(
    StorageKeys.CURRENT_GAME_SCREEN,
    GameScreen.QUESTION_FORM,
  );

  const [config, setConfig] = useGameStorage<GameConfig>(
    StorageKeys.GAME_CONFIG,
    INITIAL_GAME_CONFIG,
  );

  const updateConfig = (updates: Partial<GameConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const nextScreen = () => setCurrentGameScreen((prev) => prev + 1);

  return (
    <>
      {currentGameScreen === GameScreen.QUESTION_FORM && (
        <QuestionFormScreen
          config={config}
          updateConfig={updateConfig}
          onNext={nextScreen}
        />
      )}
      {currentGameScreen === GameScreen.QUESTION_REVEAL && (
        <QuestionRevealScreen
          config={config}
          updateConfig={updateConfig}
          onNext={nextScreen}
        />
      )}
      {currentGameScreen === GameScreen.VOTING && (
        <VotingScreen
          config={config}
          updateConfig={updateConfig}
          onNext={() => setCurrentGameScreen(GameScreen.QUESTION_FORM)}
        />
      )}
    </>
  );
}
