import { Button } from "@/components/ui/button";
import NumericInput from "@/components/ui/numeric-input";
import { TypographySmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { GameConfig, Player } from "@/types/game";
import { Eye, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function PlayersVotingList({
  namesEnabled,
  players,
  votes,
  setVotes,
  submitted,
}: {
  namesEnabled: boolean;
  players: Player[];
  votes: Record<number, number>;
  setVotes: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  submitted: boolean;
}) {
  const handleVoteChange = (playerId: number, value: number) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [playerId]: Math.max(0, value),
    }));
  };
  return (
    <div className="space-y-2">
      {players.map((player) => (
        <div
          key={player.id}
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg border px-4 py-2 shadow-sm",
            submitted && player.isImpostor
              ? "bg-primary/20 border-primary/60"
              : "bg-card",
          )}
        >
          <TypographySmall>
            {namesEnabled ? player.name : "Player " + player.id}
          </TypographySmall>
          <NumericInput
            size="sm"
            value={votes[player.id]}
            onChange={(event) =>
              handleVoteChange(player.id, Number(event.target.value))
            }
            onDecrease={() =>
              handleVoteChange(player.id, Math.max(0, votes[player.id] - 1))
            }
            onIncrease={() => handleVoteChange(player.id, votes[player.id] + 1)}
            disabled={submitted}
          />
        </div>
      ))}
    </div>
  );
}

export default function VotingActions({
  players,
  namesEnabled,
  updateConfig,
  onNext,
}: Pick<GameConfig, "players" | "namesEnabled"> & {
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const initialVotes = players.reduce(
    (acc, player) => {
      acc[player.id] = 0;
      return acc;
    },
    {} as Record<number, number>,
  );
  const [votes, setVotes] = useState<Record<number, number>>(initialVotes);
  const [submitted, setSubmitted] = useState(false);

  const handlePlayAgain = () => {
    updateConfig({
      currentPlayerIdx: 0,
      mainQuestion: "",
      impostorQuestion: "",
    });
    onNext();
  };

  const handleVoteSubmit = () => {
    setSubmitted(true);
    // Count total votes
    const totalVotes = Object.values(votes).reduce(
      (sum, count) => sum + count,
      0,
    );
    const impostorVotes = Object.entries(votes)
      .filter(([playerId, votes]) => {
        const player = players.find((p) => p.id === Number(playerId));
        return player?.isImpostor;
      })
      .reduce((sum, [, count]) => sum + count, 0);

    if (impostorVotes > totalVotes / 2) {
      toast.info(
        `Crewmates win! ${impostorVotes} out of ${totalVotes} votes were for the impostor.`,
        { duration: 8000 },
      );
      return;
    } else {
      toast.info(
        `Impostor wins! Only ${impostorVotes} out of ${totalVotes} votes were for the impostor.`,
        { duration: 8000 },
      );
    }
  };

  return (
    <div>
      <PlayersVotingList
        namesEnabled={namesEnabled}
        players={players}
        votes={votes}
        setVotes={setVotes}
        submitted={submitted}
      />
      <Button
        disabled={submitted}
        onClick={handleVoteSubmit}
        className="mt-6 w-full"
      >
        <Eye />
        vote & reveal
      </Button>
      {submitted && (
        <Button onClick={handlePlayAgain} className="mt-2 w-full">
          <Repeat />
          play again
        </Button>
      )}
    </div>
  );
}
