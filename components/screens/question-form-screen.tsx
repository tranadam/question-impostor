import { GameConfig } from "@/types/game";
import QuestionForm from "@/components/game/question-form/form";
import QuestionFormActions from "@/components/game/question-form/actions";

export default function QuestionFormScreen({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <QuestionForm
        config={config}
        setMainQuestion={(q: string) => updateConfig({ mainQuestion: q })}
        setImpostorQuestion={(q: string) =>
          updateConfig({ impostorQuestion: q })
        }
        setWhoAskedIdx={(i: number) => updateConfig({ whoAskedIdx: i })}
      />
      <div className="mt-8">
        <QuestionFormActions
          config={config}
          updateConfig={updateConfig}
          onNext={onNext}
        />
      </div>
    </main>
  );
}
