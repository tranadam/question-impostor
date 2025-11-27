"use client";
import { Player } from "@/app/types/game";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PlayerNamesActions({
  setNamesEnabled,
  players,
  onNext,
}: {
  setNamesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  players: Player[];
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
      <Button onClick={handleContinueWithNames}>continue</Button>
    </div>
  );
}
