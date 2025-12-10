import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { ChevronLeft } from 'lucide-react';

export default function GameVariantExplanation({ onPrev }: { onPrev: () => void }) {
  return (
    <>
      <TypographyH2 className="flex justify-between">
        game variant
        <Button onClick={onPrev} variant="link">
          <ChevronLeft />
          change names
        </Button>
      </TypographyH2>
      <TypographyP>
        Decide whether you want to play a phone minimal version with pen and paper or fully
        integrated phone version.{' '}
      </TypographyP>
    </>
  );
}
