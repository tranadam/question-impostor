"use client";

import { useState } from "react";
import { INITIAL_GAME_CONFIG } from "@/lib/game-config";
import { useGameStorage } from "@/lib/hooks/use-game-storage";
import { GameConfig, GameScreen, StorageKeys } from "@/app/types/game";
import QuestionFormScreen from "@/components/screens/question-form-screen";

export default function SetupWizard() {
  const [currentScreen, setCurrentScreen] = useGameStorage<GameScreen>(
    StorageKeys.CURRENT_GAME_SCREEN,
    GameScreen.QUESTION_FORM,
  );

  const [config, setConfig] = useState<GameConfig>(INITIAL_GAME_CONFIG);

  const updateConfig = (updates: Partial<GameConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const nextScreen = () => setCurrentScreen((prev) => prev + 1);

  return (
    <>
      {currentScreen === GameScreen.QUESTION_FORM && (
        <QuestionFormScreen
          config={config}
          updateConfig={updateConfig}
          onNext={nextScreen}
        />
      )}
    </>
  );
}
