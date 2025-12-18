import VotingActions from '@/components/game/voting/actions';
import VotingExplanation from '@/components/game/voting/explanation';
import { GameConfig } from '@/types/game';

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
          namesEnabled={config.namesEnabled}
          answers={config.answers}
          gamePlayers={config.gamePlayers}
          impostorCount={config.impostorCount}
          gameType={config.gameType}
          updateConfig={updateConfig}
          onNext={onNext}
        />
      </div>
    </main>
  );
}
