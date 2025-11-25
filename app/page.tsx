import GameConfig from "@/components/game-config";
import Rules from "@/components/rules";

export default function Home() {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <Rules />
      <div className="mt-10">
        <GameConfig />
      </div>
    </main>
  );
}
