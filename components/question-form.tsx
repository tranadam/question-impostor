"use client";

import { GameConfig } from "@/app/types/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { Dices, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function QuestionForm({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const handleAIInspiration = () => {
    toast.warning("AI inspiration coming soon! (surely)");
    return;
  };

  return (
    <section className="flex flex-col gap-8">
      <TypographyH2>Questions</TypographyH2>
      <div className="flex flex-col gap-1">
        <TypographySmall>main question</TypographySmall>
        <Input
          value={config.mainQuestion}
          onChange={(e) => updateConfig({ mainQuestion: e.target.value })}
          placeholder="Favourite place in Seoul?"
        />
        <TypographyMuted>
          {config.totalPlayers} players see this question
        </TypographyMuted>
      </div>
      <div className="flex flex-col gap-1">
        <TypographySmall>impostor question</TypographySmall>
        <Input
          value={config.impostorQuestion}
          onChange={(e) => updateConfig({ impostorQuestion: e.target.value })}
          placeholder="First place you visited in Seoul?"
        />
        <TypographyMuted>
          {config.impostorCount} impostor
          {config.impostorCount > 1 ? "s" : ""} see this question
        </TypographyMuted>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleAIInspiration} variant="outline">
          <Sparkles />
          get inspired by ai
        </Button>
        <Button onClick={onNext}>
          <Dices />
          let&apos;s play
        </Button>
      </div>
    </section>
  );
}
