import QuestionCard from '@/components/game/question-reveal/question-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { GameConfig } from '@/types/game';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function QuestionRevealAction({
  mainQuestion,
  impostorQuestion,
  gamePlayers,
  currentPlayerIdx,
  gameType,
  setCurrentPlayerIdx,
  answers,
  setAnswers,
  onNext,
}: Pick<
  GameConfig,
  'mainQuestion' | 'answers' | 'gameType' | 'impostorQuestion' | 'gamePlayers' | 'currentPlayerIdx'
> & {
  setCurrentPlayerIdx: (idx: number) => void;
  setAnswers: (answers: string[]) => void;
  onNext: () => void;
}) {
  const [nextReady, setNextReady] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  const question = gamePlayers[currentPlayerIdx].isImpostor ? impostorQuestion : mainQuestion;

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
      <div
        className={cn('mt-8 flex gap-2', gameType === 'mobile' ? 'justify-between' : 'justify-end')}
      >
        {gameType === 'mobile' && (
          <Input
            value={answers[currentPlayerIdx]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[currentPlayerIdx] = e.target.value;
              setAnswers(newAnswers);
            }}
            placeholder="your answer"
          />
        )}
        <Button
          disabled={!nextReady || (gameType === 'mobile' && !answers[currentPlayerIdx])}
          onClick={handleNextPlayer}
        >
          <ArrowRight />
          {gameType === 'mobile' ? 'submit' : 'continue'}
        </Button>
      </div>
    </section>
  );
}
