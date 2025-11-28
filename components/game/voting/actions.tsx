import { Button } from "@/components/ui/button";
import NumericInput from "@/components/ui/numeric-input";
import { TypographySmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { GameConfig, Player } from "@/types/game";
import { Lock, Repeat } from "lucide-react";
import { useState } from "react";

function PlayerVotingCard({ player }: { player: Player }) {
  return <TypographySmall>{player.name}</TypographySmall>;
}

function PlayersVotingList({
  players,
  votes,
  setVotes,
  submitted,
}: {
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
  const handleDecrease = (playerId: number) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [playerId]: Math.max(0, prevVotes[playerId] - 1),
    }));
  };
  const handleIncrease = (playerId: number) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [playerId]: prevVotes[playerId] + 1,
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
          <PlayerVotingCard player={player} />
          <NumericInput
            size="sm"
            value={votes[player.id]}
            onChange={(event) =>
              handleVoteChange(player.id, Number(event.target.value))
            }
            onDecrease={() => handleDecrease(player.id)}
            onIncrease={() => handleIncrease(player.id)}
            disabled={submitted}
          />
        </div>
      ))}
    </div>
  );
}

export default function VotingActions({
  players,
  updateConfig,
  onNext,
}: Pick<GameConfig, "players"> & {
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

  return (
    <div>
      <PlayersVotingList
        players={players}
        votes={votes}
        setVotes={setVotes}
        submitted={submitted}
      />
      <Button
        disabled={submitted}
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full"
      >
        <Lock />
        submit vote
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
