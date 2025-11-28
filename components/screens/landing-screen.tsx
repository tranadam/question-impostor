import { GameConfig } from "@/types/game";
import GameSetup from "@/components/game/setup/game-setup";
import Rules from "@/components/game/setup/rules";

export default function LandingScreen({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <div className="mt-8 mb-16">
        <GameSetup
          config={config}
          updateConfig={updateConfig}
          onNext={onNext}
        />
      </div>
      <Rules />
    </main>
  );
}
