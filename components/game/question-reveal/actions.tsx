import QuestionCard from "@/components/game/question-reveal/question-card";
import { Button } from "@/components/ui/button";
import { GameConfig } from "@/types/game";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function QuestionRevealAction({
  mainQuestion,
  impostorQuestion,
  gamePlayers,
  currentPlayerIdx,
  setCurrentPlayerIdx,
  onNext,
}: Pick<
  GameConfig,
  "mainQuestion" | "impostorQuestion" | "gamePlayers" | "currentPlayerIdx"
> & {
  setCurrentPlayerIdx: (idx: number) => void;
  onNext: () => void;
}) {
  const [nextReady, setNextReady] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  const question = gamePlayers[currentPlayerIdx].isImpostor
    ? impostorQuestion
    : mainQuestion;

  const handleNextPlayer = () => {
    if (currentPlayerIdx + 1 >= gamePlayers.length) {
      onNext();
      return;
    }
    setCardRevealed(false);
    setNextReady(false);
    setCurrentPlayerIdx(currentPlayerIdx + 1);
  };

  return (
    <section className="mt-8">
      <QuestionCard
        question={question}
        setNextReady={setNextReady}
        revealed={cardRevealed}
        setRevealed={setCardRevealed}
      />
      <div className="flex justify-end">
        <Button
          disabled={!nextReady}
          className="mt-8"
          onClick={handleNextPlayer}
        >
          <ArrowRight />
          continue
        </Button>
      </div>
    </section>
  );
}
