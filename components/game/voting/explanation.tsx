import {
  TypographyBlockquote,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import { GameConfig } from "@/types/game";

export default function VotingExplanation({
  mainQuestion,
}: Pick<GameConfig, "mainQuestion">) {
  return (
    <section>
      <TypographyH2>Voting</TypographyH2>
      <TypographyP>Decide who you think is the impostor!</TypographyP>
      <TypographyBlockquote>{mainQuestion}</TypographyBlockquote>
    </section>
  );
}
