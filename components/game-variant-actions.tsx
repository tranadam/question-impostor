"use client";
import { IconCard } from "@/components/ui/icon-card";
import PenAndPaper from "@/components/illustrations/pen-and-paper.svg";
import Phone from "@/components/illustrations/phone.svg";
import { Button } from "@/components/ui/button";
import { useGameStorage } from "@/lib/hooks/use-game-storage";
import { UserGameConfig } from "@/lib/game-config";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function GameVariantActions() {
  const router = useRouter();

  const [gameVariant, setGameVariant] = useGameStorage<
    "pen-and-paper" | "mobile" | null
  >(UserGameConfig.GAME_VARIANT, null);

  const handleStartGame = () => {
    if (gameVariant === null) return;

    router.push("/game");
  };

  return (
    <section>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <IconCard
          onClick={() => setGameVariant("pen-and-paper")}
          heading="Pen & Paper"
          description="Every player writes their answer on paper"
          icon={PenAndPaper}
          active={gameVariant === "pen-and-paper"}
        />
        <IconCard
          onClick={() => setGameVariant("mobile")}
          heading="Mobile"
          description="Players write their answers directly into the phone"
          icon={Phone}
          active={gameVariant === "mobile"}
          disabled
        />
      </div>
      <Button
        onClick={handleStartGame}
        disabled={gameVariant === null}
        className="w-full cursor-pointer"
      >
        <ArrowRight />
        choose mode
      </Button>
    </section>
  );
}
