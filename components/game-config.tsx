"use client";

import { Button } from "@/components/ui/button";
import NumericInput from "@/components/ui/numeric-input";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { MAX_PLAYERS, MIN_IMPOSTORS, MIN_PLAYERS } from "@/lib/game-config";
import { Rocket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BasicStickman from "@/components/illustrations/basic-stickman.svg";
import { cn } from "@/lib/utils";

function PlayerCountIllustration(count: number, isImpostor: boolean) {
  const total = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={cn("flex origin-left gap-1", count > 8 && "scale-90")}>
      {total.map((_, i) => (
        <BasicStickman
          className={cn(isImpostor ? "text-primary" : "text-black")}
          alt=""
          width={10}
          height={21}
          key={i}
        />
      ))}
    </div>
  );
}

export default function GameConfig() {
  const [playersCount, setPlayersCount] = useState(MIN_PLAYERS);
  const [impostorsCount, setImpostorsCount] = useState(MIN_IMPOSTORS);

  const validatePlayersCount = (count: number): boolean => {
    if (count < MIN_PLAYERS || count > MAX_PLAYERS) {
      toast.warning(
        `Number of players must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`,
      );
      return false;
    }
    return true;
  };

  const updatePlayersCount = (count: number) => {
    if (!validatePlayersCount(count)) {
      return;
    }
    setPlayersCount(count);
  };

  const validateImpostorsCount = (count: number): boolean => {
    if (count < MIN_IMPOSTORS || count >= playersCount) {
      toast.warning(
        "At least one impostor is required, at most players minus one.",
      );
      return false;
    }
    return true;
  };

  const updateImpostorsCount = (count: number) => {
    if (!validateImpostorsCount(count)) {
      return;
    }
    setImpostorsCount(count);
  };

  const calcRecommendedImpostors = (players: number): number => {
    if (players <= 6) return 1;
    if (players <= 9) return 2;
    return 3;
  };

  const PlayerSelection = (
    <div>
      <TypographySmall className="mb-2 block">
        total number of players
      </TypographySmall>
      <div className="flex items-center gap-4">
        <NumericInput
          value={playersCount}
          onIncrease={() => {
            updatePlayersCount(playersCount + 1);
          }}
          onDecrease={() => {
            if (playersCount - 1 <= impostorsCount) {
              updateImpostorsCount(impostorsCount - 1);
            }
            updatePlayersCount(playersCount - 1);
          }}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val - 1 <= impostorsCount) {
              updateImpostorsCount(impostorsCount - 1);
            }

            updatePlayersCount(val);
          }}
        />
        {PlayerCountIllustration(playersCount, false)}
      </div>
    </div>
  );

  const ImpostorSelection = (
    <div>
      <TypographySmall className="mb-2 block">
        number of impostors
      </TypographySmall>
      <div className="flex items-center gap-4">
        <NumericInput
          value={impostorsCount}
          onIncrease={() => {
            updateImpostorsCount(impostorsCount + 1);
          }}
          onDecrease={() => {
            updateImpostorsCount(impostorsCount - 1);
          }}
          onChange={(e) => {
            const val = Number(e.target.value);
            updateImpostorsCount(val);
          }}
        />
        {PlayerCountIllustration(impostorsCount, true)}
      </div>
      <TypographyMuted className="mt-2">
        recommended {calcRecommendedImpostors(playersCount)} impostor for{" "}
        {playersCount} players
      </TypographyMuted>
    </div>
  );

  return (
    <section className="flex flex-col gap-6">
      {PlayerSelection}
      {ImpostorSelection}
      <Button size="lg">
        <Rocket />
        start game
      </Button>
    </section>
  );
}
