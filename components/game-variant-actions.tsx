"use client";

import { IconCard } from "@/components/ui/icon-card";
import PenAndPaper from "@/components/illustrations/pen-and-paper.svg";
import Phone from "@/components/illustrations/phone.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GameConfig } from "@/app/types/game";

export function GameVariantActions({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const handleStartGame = () => {
    if (config.gameType === null) return;

    onNext();
  };

  return (
    <section>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <IconCard
          onClick={() => updateConfig({ gameType: "paper" })}
          heading="Pen & Paper"
          description="Every player writes their answer on paper"
          icon={PenAndPaper}
          active={config.gameType === "paper"}
        />
        <IconCard
          onClick={() => updateConfig({ gameType: "mobile" })}
          heading="Mobile"
          description="Players write their answers directly into the phone"
          icon={Phone}
          active={config.gameType === "mobile"}
          disabled
        />
      </div>
      <Button
        onClick={handleStartGame}
        disabled={config.gameType === null}
        className="w-full"
      >
        <ArrowRight />
        choose mode
      </Button>
    </section>
  );
}
