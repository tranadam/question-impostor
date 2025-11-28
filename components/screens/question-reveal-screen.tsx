import { Progress } from "@/components/ui/progress";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { GameConfig, Player } from "@/types/game";
import { ArrowRight } from "lucide-react";

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
          <ArrowRight size={16} />
          <TypographyMuted>{players[playerIdx - 2].name}</TypographyMuted>
        </>
      )}
      {playerIdx > 1 && (
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
      {playerIdx === 0 && players.length >= 3 && (
        <>
          <ArrowRight size={16} />
          <TypographyMuted>{players[playerIdx + 2].name}</TypographyMuted>
        </>
      )}
    </div>
  );
}

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
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {config.namesEnabled &&
            PlayerOrderDisplay({
              players: config.players,
              playerIdx: config.currentPlayerIdx,
            })}
        </div>
        <TypographySmall>
          {config.currentPlayerIdx + 1} / {config.totalPlayers}
        </TypographySmall>
      </div>
      <Progress
        className="mt-2"
        value={((config.currentPlayerIdx + 1) / config.totalPlayers) * 100}
      />
    </main>
  );
}
