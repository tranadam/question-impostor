import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { ChevronLeft } from "lucide-react";

export default function PlayerNamesExplanation({
  onPrev,
}: {
  onPrev: () => void;
}) {
  return (
    <>
      <TypographyH2 className="flex justify-between">
        players
        <Button onClick={onPrev} variant="link">
          <ChevronLeft /> change number of players
        </Button>
      </TypographyH2>
      <TypographyP>
        Fill names of the players in the order as you&apos;re sitting in a
        circle for better clarity. The phone will be passed around.{" "}
      </TypographyP>
    </>
  );
}
