import VotingActions from "@/components/voting-actions";
import VotingExplanation from "@/components/voting-explanation";
import { GameConfig } from "@/types/game";

export default function VotingScreen({
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
      <VotingExplanation mainQuestion={config.mainQuestion} />
      <div className="mt-8">
        <VotingActions
          players={config.players}
          updateConfig={updateConfig}
          onNext={onNext}
        />
      </div>
    </main>
  );
}
