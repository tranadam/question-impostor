"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GameConfig, GameScreen, StorageKeys } from "./types/game";
import { INITIAL_GAME_CONFIG } from "@/lib/game-config";
import LandingScreen from "@/components/screens/landing-screen";
import PlayerNamesScreen from "@/components/screens/player-names-screen";
import VariantScreen from "@/components/screens/variant-screen";
import { useGameStorage } from "@/lib/hooks/use-game-storage";

export default function SetupWizard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useGameStorage<GameScreen>(
    StorageKeys.CURRENT_STEP,
    GameScreen.LANDING,
  );

  const [config, setConfig] = useState<GameConfig>(INITIAL_GAME_CONFIG);

  const updateConfig = (updates: Partial<GameConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const startGame = () => {
    // TODO: Save to session storage
    router.push("/game");
  };
  const nextScreen = () => setCurrentScreen((prev) => prev + 1);
  const prevScreen = () => setCurrentScreen((prev) => prev - 1);

  return (
    <>
      {currentScreen === GameScreen.LANDING && (
        <LandingScreen
          config={config}
          updateConfig={updateConfig}
          onNext={nextScreen}
        />
      )}
      {currentScreen === GameScreen.PLAYER_NAMES && (
        <PlayerNamesScreen
          config={config}
          updateConfig={updateConfig}
          onPrev={prevScreen}
          onNext={nextScreen}
        />
      )}
      {currentScreen === GameScreen.VARIANT && (
        <VariantScreen
          config={config}
          updateConfig={updateConfig}
          onPrev={prevScreen}
          onNext={startGame}
        />
      )}
    </>
  );
}
