import { Progress } from '@/components/ui/progress';
import { TypographyMuted, TypographySmall } from '@/components/ui/typography';
import { ArrowRight } from 'lucide-react';
import { GameConfig } from '@/types/game';

export function PlayerOrderDisplay({
  players,
  currentPlayerIdx: currIdx,
}: Pick<GameConfig, 'players' | 'currentPlayerIdx'>) {
  return (
    <div className="flex items-center gap-2">
      {currIdx === players.length - 1 && players.length >= 3 && (
        <>
          <TypographyMuted>{players[currIdx - 2].name}</TypographyMuted>
          <ArrowRight size={16} />
        </>
      )}
      {currIdx >= 1 && (
        <>
          <TypographyMuted>{players[currIdx - 1].name}</TypographyMuted>
          <ArrowRight size={16} />
        </>
      )}
      <TypographySmall>{players[currIdx].name}</TypographySmall>
      {currIdx + 1 < players.length && (
        <>
          <ArrowRight size={16} />
          <TypographyMuted>{players[currIdx + 1].name}</TypographyMuted>
        </>
      )}
      {currIdx === 0 && currIdx + 2 < players.length && (
        <>
          <ArrowRight size={16} />
          <TypographyMuted>{players[currIdx + 2].name}</TypographyMuted>
        </>
      )}
    </div>
  );
}

export default function RevealProgress({
  namesEnabled,
  players,
  currentPlayerIdx,
}: Pick<GameConfig, 'namesEnabled' | 'players' | 'currentPlayerIdx'>) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {namesEnabled && (
          <PlayerOrderDisplay players={players} currentPlayerIdx={currentPlayerIdx} />
        )}
        <TypographySmall>
          {currentPlayerIdx + 1} / {players.length}
        </TypographySmall>
      </div>
      <Progress className="mt-2" value={((currentPlayerIdx + 1) / players.length) * 100} />
    </div>
  );
}
