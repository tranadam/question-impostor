'use client';

import { useRouter } from 'next/navigation';
import { GameConfig, GameScreen, SetupScreen, StorageKeys } from '@/types/game';
import { INITIAL_GAME_CONFIG } from '@/lib/game/config';
import LandingScreen from '@/components/screens/landing-screen';
import PlayerNamesScreen from '@/components/screens/player-names-screen';
import VariantScreen from '@/components/screens/variant-screen';
import { useGameStorage } from '@/lib/hooks/use-game-storage';

export default function SetupWizard() {
  const router = useRouter();

  const [currentSetupScreen, setCurrentSetupScreen] = useGameStorage<SetupScreen>(
    StorageKeys.CURRENT_SETUP_SCREEN,
    SetupScreen.LANDING
  );
  const [, setCurrentGameScreen] = useGameStorage<GameScreen>(
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

  const startGame = () => {
    setCurrentGameScreen(GameScreen.QUESTION_FORM);
    router.push('/game');
  };
  const nextScreen = () => {
    if (currentSetupScreen === SetupScreen.VARIANT) {
      startGame();
    } else {
      setCurrentSetupScreen((prev) => prev + 1);
    }
  };
  const prevScreen = () => setCurrentSetupScreen((prev) => prev - 1);

  const CurrentScreenComponent =
    currentSetupScreen === SetupScreen.LANDING
      ? LandingScreen
      : currentSetupScreen === SetupScreen.PLAYER_NAMES
        ? PlayerNamesScreen
        : VariantScreen;
  return (
    <CurrentScreenComponent
      config={config}
      updateConfig={updateConfig}
      onNext={nextScreen}
      onPrev={prevScreen}
    />
  );
}
