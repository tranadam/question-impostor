import QuestionRevealAction from '@/components/game/question-reveal/actions';
import RevealProgress from '@/components/game/question-reveal/reveal-progress';
import { GameConfig } from '@/types/game';

export default function QuestionRevealScreen({
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
      <RevealProgress
        namesEnabled={config.namesEnabled}
        players={config.gamePlayers}
        currentPlayerIdx={config.currentPlayerIdx}
      />
      <QuestionRevealAction
        gamePlayers={config.gamePlayers}
        impostorQuestion={config.impostorQuestion}
        mainQuestion={config.mainQuestion}
        currentPlayerIdx={config.currentPlayerIdx}
        setCurrentPlayerIdx={(idx) => updateConfig({ currentPlayerIdx: idx })}
        onNext={onNext}
      />
    </main>
  );
}
