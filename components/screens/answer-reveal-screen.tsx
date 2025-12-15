import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { ArrowRight, Eye } from 'lucide-react';

export default function AnswerRevealScreen({ onNext }: { onNext: () => void }) {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <section>
        <TypographyH2>answer reveal</TypographyH2>
        <TypographyP>Count down from three and show or say what was your answer!</TypographyP>
      </section>
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext}>
          <ArrowRight />
          reveal question & vote
        </Button>
      </div>
    </main>
  );
}
