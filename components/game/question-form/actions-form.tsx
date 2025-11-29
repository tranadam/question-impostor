import { GameConfig } from "@/types/game";
import { Input } from "@/components/ui/input";
import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuestionForm({
  config,
  setMainQuestion,
  setImpostorQuestion,
  setWhoAskedIdx,
}: {
  config: GameConfig;
  setMainQuestion: (mainQuestion: string) => void;
  setImpostorQuestion: (impostorQuestion: string) => void;
  setWhoAskedIdx: (whoAskedId: number) => void;
}) {
  return (
    <section>
      <TypographyH2>Questions</TypographyH2>
      <div className="mt-8 space-y-6">
        <div>
          <TypographySmall>main question</TypographySmall>
          <Input
            value={config.mainQuestion}
            onChange={(e) => setMainQuestion(e.target.value)}
            placeholder="Favourite place in Seoul?"
            className="mt-2 mb-1"
          />
          <TypographyMuted>
            {config.totalPlayers - config.impostorCount} players see this
            question
          </TypographyMuted>
        </div>
        <div>
          <TypographySmall>impostor question</TypographySmall>
          <Input
            className="mt-2 mb-1"
            value={config.impostorQuestion}
            onChange={(e) => setImpostorQuestion(e.target.value)}
            placeholder="First place you visited in Seoul?"
          />
          <TypographyMuted>
            {config.impostorCount} impostor
            {config.impostorCount > 1 ? "s" : ""} see
            {config.impostorCount > 1 ? "" : "s"} this question
          </TypographyMuted>
        </div>
        <div>
          <TypographySmall>who asked</TypographySmall>
          <Select onValueChange={(i) => setWhoAskedIdx(parseInt(i))}>
            <SelectTrigger className="mt-2 mb-1 w-full">
              <SelectValue placeholder="Player 1" />
            </SelectTrigger>
            <SelectContent>
              {config.players.map((player, idx) => (
                <SelectItem key={player.id} value={idx.toString()}>
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TypographyMuted>
            the player that asked can&apos;t play this round
          </TypographyMuted>
        </div>
      </div>
    </section>
  );
}
