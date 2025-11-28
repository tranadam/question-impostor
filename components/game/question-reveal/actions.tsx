import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { GameConfig } from "@/types/game";
import { ArrowRight } from "lucide-react";

export default function QuestionRevealAction({
  mainQuestion,
  impostorQuestion,
  players,
  currentPlayerIdx,
  setCurrentPlayerIdx,
  onNext,
}: Pick<
  GameConfig,
  "mainQuestion" | "impostorQuestion" | "players" | "currentPlayerIdx"
> & {
  setCurrentPlayerIdx: (idx: number) => void;
  onNext: () => void;
}) {
  const question = players[currentPlayerIdx].isImpostor
    ? impostorQuestion
    : mainQuestion;

  const handleNextPlayer = () => {
    if (currentPlayerIdx + 1 >= players.length) {
      onNext();
      return;
    }
    setCurrentPlayerIdx(currentPlayerIdx + 1);
  };

  return (
    <section className="mt-8">
      <TypographyP>{question}</TypographyP>
      <div className="flex justify-end">
        <Button className="mt-8" onClick={handleNextPlayer}>
          <ArrowRight />
          continue
        </Button>
      </div>
    </section>
  );
}
