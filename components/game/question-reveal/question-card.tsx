import { TypographyH4 } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

export default function QuestionCard({
  question,
  setNextReady,
  revealed,
  setRevealed,
}: {
  question: string;
  setNextReady: React.Dispatch<React.SetStateAction<boolean>>;
  revealed: boolean;
  setRevealed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => {
        setRevealed(!revealed);
        setNextReady(true);
      }}
      className="h-80 w-full cursor-pointer transition-transform perspective-midrange hover:scale-95"
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 transform-3d',
          revealed && 'rotate-y-180'
        )}
      >
        <div className="bg-card absolute grid h-full w-full place-items-center rounded-lg border shadow-sm backface-hidden">
          <div className="flex flex-col items-center gap-1">
            <Eye />
            <TypographyH4>tap to reveal question</TypographyH4>
          </div>
        </div>
        <div className="bg-card absolute grid h-full w-full rotate-y-180 place-items-center rounded-lg border shadow-sm backface-hidden">
          <TypographyH4>{question}</TypographyH4>
        </div>
      </div>
    </button>
  );
}
