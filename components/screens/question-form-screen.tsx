import { GameConfig } from "@/types/game";
import QuestionForm from "@/components/question-form";
import { generateRandomIntFromRange } from "@/lib/random";

export default function QuestionFormScreen({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const pickImpostorRandomly = () => {
    const randomIdxs = generateRandomIntFromRange(
      0,
      config.totalPlayers - 1,
      config.impostorCount,
    );
    const updatedPlayers = config.players.map((player, idx) => ({
      ...player,
      isImpostor: randomIdxs.includes(idx),
    }));
    updateConfig({ players: updatedPlayers });
  };
  const handleNext = () => {
    pickImpostorRandomly();
    updateConfig({ currentPlayerIdx: 0 });
    onNext();
  };
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <QuestionForm
        config={config}
        setMainQuestion={(q: string) => updateConfig({ mainQuestion: q })}
        setImpostorQuestion={(q: string) =>
          updateConfig({ impostorQuestion: q })
        }
        onNext={handleNext}
      />
    </main>
  );
}
