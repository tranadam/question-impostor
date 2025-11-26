import { GameVariantActions } from "@/components/game-variant-actions";
import GameVariantExplanation from "@/components/game-variation-explanation";

export default function GameVariant() {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <GameVariantExplanation />
      <div className="mt-6">
        <GameVariantActions />
      </div>
    </main>
  );
}
