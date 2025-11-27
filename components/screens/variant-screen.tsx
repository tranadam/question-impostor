import { GameConfig } from "@/app/types/game";
import { GameVariantActions } from "@/components/game-variant-actions";
import GameVariantExplanation from "@/components/game-variation-explanation";

export default function VariantScreen({
  config,
  updateConfig,
  onNext,
  onPrev
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <GameVariantExplanation onPrev={onPrev} />
      <div className="mt-6">
        <GameVariantActions config={config} updateConfig={updateConfig} onNext={onNext} />
      </div>
    </main>
  );
}
