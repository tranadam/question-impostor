import { Button } from '@/components/ui/button';
import { TypographySmall } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { GameConfig } from '@/types/game';
import { Eye, Repeat, X } from 'lucide-react';
import { useState } from 'react';

function PlayersVotingList({
  namesEnabled,
  gamePlayers,
  selectedImpostors,
  setSelectedImpostors,
  impostorCount,
  submitted,
}: Pick<GameConfig, 'gamePlayers' | 'impostorCount' | 'namesEnabled'> & {
  selectedImpostors: number[];
  setSelectedImpostors: React.Dispatch<React.SetStateAction<number[]>>;
  submitted: boolean;
}) {
  const togglePlayer = (playerId: number) => {
    if (selectedImpostors.includes(playerId)) {
      setSelectedImpostors(selectedImpostors.filter((id) => id !== playerId));
      return;
    }

    if (selectedImpostors.length === impostorCount) {
      setSelectedImpostors([...selectedImpostors.slice(0, selectedImpostors.length - 1), playerId]);
    } else {
      setSelectedImpostors([...selectedImpostors, playerId]);
    }
  };
  return (
    <div className="space-y-2">
      {gamePlayers.map((player) => (
        <button
          key={player.id}
          onClick={() => {
            if (!submitted) togglePlayer(player.id);
          }}
          className={cn(
            'bg-card flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-left shadow-sm transition-colors',
            !submitted &&
              selectedImpostors.includes(player.id) &&
              'bg-primary/20 border-primary/60 hover:bg-primary/15',
            !submitted && !selectedImpostors.includes(player.id) && 'hover:bg-primary/5',
            submitted &&
              player.isImpostor &&
              selectedImpostors.includes(player.id) &&
              'border-green-600 bg-green-200 text-green-600',
            submitted &&
              !player.isImpostor &&
              selectedImpostors.includes(player.id) &&
              'border-red-600 bg-red-200 text-red-600',
            submitted &&
              player.isImpostor &&
              !selectedImpostors.includes(player.id) &&
              'border-red-400 bg-red-200 text-red-600'
          )}
        >
          <TypographySmall>{namesEnabled ? player.name : 'Player ' + player.id}</TypographySmall>
          {submitted && player.isImpostor && <TypographySmall>IMPOSTOR</TypographySmall>}
          {submitted && !player.isImpostor && selectedImpostors.includes(player.id) && (
            <X size={16} />
          )}
        </button>
      ))}
    </div>
  );
}

export default function VotingActions({
  gamePlayers,
  namesEnabled,
  impostorCount,
  updateConfig,
  onNext,
}: Pick<GameConfig, 'gamePlayers' | 'impostorCount' | 'namesEnabled'> & {
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const [selectedImpostors, setSelectedImpostors] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handlePlayAgain = () => {
    updateConfig({
      currentPlayerIdx: 0,
      mainQuestion: '',
      impostorQuestion: '',
    });
    onNext();
  };

  const handleVoteSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <PlayersVotingList
        selectedImpostors={selectedImpostors}
        setSelectedImpostors={setSelectedImpostors}
        impostorCount={impostorCount}
        namesEnabled={namesEnabled}
        gamePlayers={gamePlayers}
        submitted={submitted}
      />
      <Button disabled={submitted} onClick={handleVoteSubmit} className="mt-6 w-full">
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
