"use client";

import { GameConfig, StorageKeys } from "@/app/types/game";
import { Input } from "@/components/ui/input";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { INITIAL_GAME_CONFIG } from "@/lib/game-config";
import { useGameStorage } from "@/lib/hooks/use-game-storage";

export default function QuestionForm() {
  const [gameConfig, setGameConfig] = useGameStorage<GameConfig>(
    StorageKeys.GAME_CONFIG,
    INITIAL_GAME_CONFIG,
  );
  return (
    <section>
      <div className="flex flex-col gap-1">
        <TypographySmall>main question</TypographySmall>
        <Input placeholder="What's your favourite place in Seoul?" />
        <TypographyMuted>
          {gameConfig.totalPlayers} players see this question
        </TypographyMuted>
      </div>
    </section>
  );
}
