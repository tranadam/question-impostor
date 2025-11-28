import { GameConfig } from "@/types/game";
import { Input } from "@/components/ui/input";
import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";

export default function QuestionForm({
  config,
  setMainQuestion,
  setImpostorQuestion,
}: {
  config: GameConfig;
  setMainQuestion: (mainQuestion: string) => void;
  setImpostorQuestion: (impostorQuestion: string) => void;
}) {
  return (
    <section className="flex flex-col gap-8">
      <TypographyH2>Questions</TypographyH2>
      <div className="flex flex-col gap-1">
        <TypographySmall>main question</TypographySmall>
        <Input
          value={config.mainQuestion}
          onChange={(e) => setMainQuestion(e.target.value)}
          placeholder="Favourite place in Seoul?"
        />
        <TypographyMuted>
          {config.totalPlayers - config.impostorCount} players see this question
        </TypographyMuted>
      </div>
      <div className="flex flex-col gap-1">
        <TypographySmall>impostor question</TypographySmall>
        <Input
          value={config.impostorQuestion}
          onChange={(e) => setImpostorQuestion(e.target.value)}
          placeholder="First place you visited in Seoul?"
        />
        <TypographyMuted>
          {config.impostorCount} impostor
          {config.impostorCount > 1 ? "s" : ""} see this question
        </TypographyMuted>
      </div>
    </section>
  );
}
