import { GameConfig } from "@/types/game";
import QuestionForm from "@/components/game/question-form/actions-form";
import { generateRandomIntFromRange } from "@/lib/random";
import { Button } from "@/components/ui/button";
import { Dices, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
    const playersWithImpostor = config.players.map((player, idx) => ({
      ...player,
      isImpostor: randomIdxs.includes(idx),
    }));
    updateConfig({ players: playersWithImpostor });
  };
  const handleNext = () => {
    pickImpostorRandomly();
    updateConfig({ currentPlayerIdx: 0 });
    onNext();
  };
  const handleAIInspiration = () => {
    toast.warning("AI inspiration coming soon! (surely)");
    return;
  };

  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <QuestionForm
        config={config}
        setMainQuestion={(q: string) => updateConfig({ mainQuestion: q })}
        setImpostorQuestion={(q: string) =>
          updateConfig({ impostorQuestion: q })
        }
      />
      <div className="mt-8 flex flex-col gap-2">
        <Button
          disabled={
            config.mainQuestion === "" || config.impostorQuestion === ""
          }
          onClick={handleNext}
        >
          <Dices />
          let&apos;s play
        </Button>
        <Button onClick={handleAIInspiration} variant="outline">
          <Sparkles />
          get inspired by ai
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">change settings</Link>
        </Button>
      </div>
    </main>
  );
}
