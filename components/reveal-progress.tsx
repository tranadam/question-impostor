import { Progress } from "@/components/ui/progress";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import { GameConfig, Player } from "@/types/game";

export function PlayerOrderDisplay({
  players,
  playerIdx,
}: {
  players: Player[];
  playerIdx: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {playerIdx === players.length - 1 && players.length >= 3 && (
        <>
          <TypographyMuted>{players[playerIdx - 2].name}</TypographyMuted>
          <ArrowRight size={16} />
        </>
      )}
      {playerIdx >= 1 && (
        <>
          <TypographyMuted>{players[playerIdx - 1].name}</TypographyMuted>
          <ArrowRight size={16} />
        </>
      )}
      <TypographySmall>{players[playerIdx].name}</TypographySmall>
      {playerIdx + 1 < players.length && (
        <>
          <ArrowRight size={16} />
          <TypographyMuted>{players[playerIdx + 1].name}</TypographyMuted>
        </>
      )}
      {playerIdx === 0 && playerIdx + 2 < players.length && (
        <>
          <ArrowRight size={16} />
          <TypographyMuted>{players[playerIdx + 2].name}</TypographyMuted>
        </>
      )}
    </div>
  );
}

export default function RevealProgress({
  namesEnabled,
  players,
  currentPlayerIdx,
}: Pick<GameConfig, "namesEnabled" | "players" | "currentPlayerIdx">) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {namesEnabled &&
          PlayerOrderDisplay({
            players: players,
            playerIdx: currentPlayerIdx,
          })}
        <TypographySmall>
          {currentPlayerIdx + 1} / {players.length}
        </TypographySmall>
      </div>
      <Progress
        className="mt-2"
        value={((currentPlayerIdx + 1) / players.length) * 100}
      />
    </div>
  );
}
