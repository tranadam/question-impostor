"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PlayerNamesActions({
  setNamesEnabled,
  playerNames,
  playerCount,
}: {
  setNamesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  playerNames: string[];
  playerCount: number;
}) {
  const router = useRouter();

  function handleSkipNames() {
    setNamesEnabled(false);
  }

  function handleContinueWithNames() {
    setNamesEnabled(true);
    if (
      playerNames.filter((name) => name.trim() !== "").length !== playerCount
    ) {
      toast.warning("Please fill in all player names or skip naming players.");
      return;
    }
    router.push("/variant");
  }

  return (
    <div className="flex justify-end gap-2">
      <Button onClick={handleSkipNames} variant="outline" asChild>
        <Link href="/variant">skip names</Link>
      </Button>
      <Button className="cursor-pointer" onClick={handleContinueWithNames}>
        continue
      </Button>
    </div>
  );
}
