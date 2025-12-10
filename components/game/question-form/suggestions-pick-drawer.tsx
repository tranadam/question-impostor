import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TypographyMuted, TypographyP } from "@/components/ui/typography";
import { QuestionResponse } from "@/types/openai";

export function SuggestionsPickDrawer({
  questions,
  open,
  onPick,
  onClose
}: {
  onPick: (main: string, impostor: string) => void;
  questions: QuestionResponse[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="overflow-y-scroll">
        <DrawerHeader>
          <DrawerTitle>suggested question pairs</DrawerTitle>
          <DrawerDescription>
            Pick one of the suggested question pairs. You can edit it after
            picking.
          </DrawerDescription>
          <div className="mt-4 space-y-2  max-w-3xl mx-auto">
            {questions.length > 0 ? (
              questions.map((q, idx) => (
                <button
                  key={idx}
                  className="bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full cursor-pointer rounded-md border px-4 py-2 text-left shadow-xs transition-all focus-visible:ring-[3px]"
                  onClick={() => {
                    onPick(q.mainQuestion, q.impostorQuestion);
                  }}
                >
                  <TypographyMuted>Main question</TypographyMuted>
                  <TypographyP className="text-sm not-first:mt-0">
                    {q.mainQuestion}
                  </TypographyP>
                  <TypographyMuted className="mt-2">
                    Impostor question
                  </TypographyMuted>
                  <TypographyP className="text-sm not-first:mt-0">
                    {q.impostorQuestion}
                  </TypographyP>
                </button>
              ))
            ) : (
              <>
                <div className="bg-secondary h-20 w-full animate-pulse rounded-md"></div>
                <div className="bg-secondary h-20 w-full animate-pulse rounded-md delay-100"></div>
                <div className="bg-secondary h-20 w-full animate-pulse rounded-md delay-200"></div>
              </>
            )}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
