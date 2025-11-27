"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GameConfig, SetupScreen, StorageKeys } from "./types/game";
import { INITIAL_GAME_CONFIG } from "@/lib/game-config";
import LandingScreen from "@/components/screens/landing-screen";
import PlayerNamesScreen from "@/components/screens/player-names-screen";
import VariantScreen from "@/components/screens/variant-screen";
import { useGameStorage } from "@/lib/hooks/use-game-storage";

export default function SetupWizard() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useGameStorage<SetupScreen>(
    StorageKeys.CURRENT_SETUP_SCREEN,
    SetupScreen.LANDING,
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
      {currentScreen === SetupScreen.LANDING && (
        <LandingScreen
          config={config}
          updateConfig={updateConfig}
          onNext={nextScreen}
        />
      )}
      {currentScreen === SetupScreen.PLAYER_NAMES && (
        <PlayerNamesScreen
          config={config}
          updateConfig={updateConfig}
          onPrev={prevScreen}
          onNext={nextScreen}
        />
      )}
      {currentScreen === SetupScreen.VARIANT && (
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
