"use client";

import { GameConfig, StorageKeys } from "@/app/types/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { INITIAL_GAME_CONFIG } from "@/lib/game-config";
import { useGameStorage } from "@/lib/hooks/use-game-storage";
import { Dices, Sparkles } from "lucide-react";

export default function QuestionForm() {
  const [gameConfig, setGameConfig] = useGameStorage<GameConfig>(
    StorageKeys.GAME_CONFIG,
    INITIAL_GAME_CONFIG,
  );
  return (
    <section className="flex flex-col gap-8">
      <TypographyH2>Questions</TypographyH2>
      <div className="flex flex-col gap-1">
        <TypographySmall>main question</TypographySmall>
        <Input placeholder="Favourite place in Seoul?" />
        <TypographyMuted>
          {gameConfig.totalPlayers} players see this question
        </TypographyMuted>
      </div>
      <div className="flex flex-col gap-1">
        <TypographySmall>impostor question</TypographySmall>
        <Input placeholder="First place you visited in Seoul?" />
        <TypographyMuted>
          {gameConfig.impostorCount} impostor
          {gameConfig.impostorCount > 1 ? "s" : ""} see this question
        </TypographyMuted>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline">
          <Sparkles />
          get inspired by ai
        </Button>
        <Button>
          <Dices />
          let&apos;s play
        </Button>
      </div>
    </section>
  );
}
