"use client";

import { Button } from "@/components/ui/button";
import NumericInput from "@/components/ui/numeric-input";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { MAX_PLAYERS, MIN_IMPOSTORS, MIN_PLAYERS } from "@/lib/game/config";
import { Rocket } from "lucide-react";
import { toast } from "sonner";
import BasicStickman from "@/components/illustrations/basic-stickman.svg";
import { cn } from "@/lib/utils";
import { GameConfig } from "@/types/game";

function PlayerCountIllustration({
  count,
  isImpostor,
}: {
  count: number;
  isImpostor: boolean;
}) {
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

export default function GameSetup({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const validatePlayersCount = (count: number): boolean => {
    return count >= MIN_PLAYERS && count <= MAX_PLAYERS;
  };

  const updatePlayersCount = (count: number) => {
    if (!validatePlayersCount(count)) {
      toast.warning(
        `Number of players must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`,
      );
      return;
    }
    if (count <= config.impostorCount) {
      updateImpostorsCount(count - 1);
    }

    if (count > config.players.length) {
      const newPlayers = [
        ...config.players,
        ...Array.from({ length: count - config.players.length }, (_, i) => ({
          id: config.players.length + i + 1,
          name: "",
          isImpostor: false,
        })),
      ];
      updateConfig({
        totalPlayers: count,
        players: newPlayers,
      });
    } else {
      updateConfig({
        totalPlayers: count,
        players: config.players.slice(0, count),
      });
    }
  };

  const validateImpostorsCount = (count: number): boolean => {
    return count >= MIN_IMPOSTORS && count < config.totalPlayers;
  };

  const updateImpostorsCount = (count: number) => {
    if (!validateImpostorsCount(count)) {
      toast.warning(
        `At least ${MIN_IMPOSTORS} impostor is required, at most all players except one.`,
      );
      return;
    }
    updateConfig({ impostorCount: count });
  };

  const calcRecommendedImpostors = (players: number): number => {
    if (players <= 6) return 1;
    if (players <= 9) return 2;
    return 3;
  };

  const PlayerSelection = (
    <div>
      <TypographySmall>total number of players</TypographySmall>
      <div className="mt-2 flex items-center gap-4">
        <NumericInput
          size="lg"
          value={config.totalPlayers}
          onIncrease={() => {
            updatePlayersCount(config.totalPlayers + 1);
          }}
          onDecrease={() => {
            updatePlayersCount(config.totalPlayers - 1);
          }}
          onChange={(e) => {
            const val = Number(e.target.value);
            updatePlayersCount(val);
          }}
        />
        <PlayerCountIllustration
          count={config.totalPlayers}
          isImpostor={false}
        />
      </div>
    </div>
  );

  const ImpostorSelection = (
    <div>
      <TypographySmall>number of impostors</TypographySmall>
      <div className="mt-2 mb-1 flex items-center gap-4">
        <NumericInput
          size="lg"
          value={config.impostorCount}
          onIncrease={() => {
            updateImpostorsCount(config.impostorCount + 1);
          }}
          onDecrease={() => {
            updateImpostorsCount(config.impostorCount - 1);
          }}
          onChange={(e) => {
            const val = Number(e.target.value);
            updateImpostorsCount(val);
          }}
        />
        <PlayerCountIllustration
          count={config.impostorCount}
          isImpostor={true}
        />
      </div>
      <TypographyMuted>
        recommended {calcRecommendedImpostors(config.totalPlayers)} impostor
        {calcRecommendedImpostors(config.totalPlayers) > 1 && "s"} for{" "}
        {config.totalPlayers} players
      </TypographyMuted>
    </div>
  );

  return (
    <section className="space-y-6">
      {PlayerSelection}
      {ImpostorSelection}
      <Button onClick={onNext} size="lg">
        <Rocket />
        start game
      </Button>
    </section>
  );
}
