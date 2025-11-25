import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import Link from "next/link";

export default function PlayerNamesExplanation() {
  return (
    <>
      <TypographyH2 className="flex justify-between">
        players
        <Button asChild variant="link">
          <Link href="/">change number of players</Link>
        </Button>
      </TypographyH2>
      <TypographyP>
        Fill names of the players in the order as you’re sitting in a circle for
        increased clarity. The phone will be passed around.{" "}
      </TypographyP>
    </>
  );
}
