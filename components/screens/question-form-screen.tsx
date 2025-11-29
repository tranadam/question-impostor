import { GameConfig, GamePlayer, Player } from "@/types/game";
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
  const getUpdatedGamePlayers = (players: Player[], whoAskedIdx: number) => {
    const afterPlayers = players.slice(whoAskedIdx + 1, players.length);
    const beforePlayers = players.slice(0, whoAskedIdx);
    const updatedGamePlayers = [...afterPlayers, ...beforePlayers].map(
      (player) => ({
        ...player,
        isImpostor: false,
      }),
    );
    return updatedGamePlayers;
  };

  const getPlayersWithImpostors = (
    players: GamePlayer[],
    impostorCount: number,
  ) => {
    const randomIdxs = generateRandomIntFromRange(
      0,
      players.length - 1,
      impostorCount,
    );

    return players.map((player, idx) => ({
      ...player,
      isImpostor: randomIdxs.includes(idx),
    }));
  };

  const handleNext = () => {
    const gamePlayersWithoutWhoAsked = getUpdatedGamePlayers(
      config.players,
      config.whoAskedIdx,
    );
    const playersWithImpostors = getPlayersWithImpostors(
      gamePlayersWithoutWhoAsked,
      config.impostorCount,
    );
    updateConfig({ currentPlayerIdx: 0, gamePlayers: playersWithImpostors });
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
        setWhoAskedIdx={(i: number) => updateConfig({ whoAskedIdx: i })}
      />
      <div className="mt-8 flex flex-col gap-2">
        <Button
          disabled={
            config.mainQuestion === "" ||
            config.impostorQuestion === "" ||
            config.whoAskedIdx === -1
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
