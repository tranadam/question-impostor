"use client";
import { GameConfig } from "@/types/game";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function PlayerNamesActions({
  setNamesEnabled,
  players,
  onNext,
}: Pick<GameConfig, "players"> & {
  setNamesEnabled: (enabled: boolean) => void;
  onNext: () => void;
}) {
  function handleSkipNames() {
    setNamesEnabled(false);
    onNext();
  }

  function handleContinueWithNames() {
    setNamesEnabled(true);
    if (
      players.filter((player) => player.name.trim() !== "").length !==
      players.length
    ) {
      toast.warning("Please fill in all player names or skip naming players.");
      return;
    }
    onNext();
  }

  return (
    <div className="flex justify-end gap-2">
      <Button onClick={handleSkipNames} variant="outline">
        skip names
      </Button>
      <Button onClick={handleContinueWithNames}>
        <ArrowRight />
        continue
      </Button>
    </div>
  );
}
