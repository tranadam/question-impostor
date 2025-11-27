import { GameConfig } from "@/app/types/game";
import QuestionForm from "@/components/question-form";

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
        updateConfig={updateConfig}
        onNext={onNext}
      />
    </main>
  );
}
