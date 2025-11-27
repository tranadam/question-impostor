import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function GameVariantExplanation() {
  return (
    <>
      <TypographyH2 className="flex justify-between">
        game variant
        <Button asChild variant="link">
          <Link href="/players">
            <ChevronLeft />
            change names
          </Link>
        </Button>
      </TypographyH2>
      <TypographyP>
        Decide whether you want to play a phone minimal version with pen and
        paper or fully integrated phone version.{" "}
      </TypographyP>
    </>
  );
}
