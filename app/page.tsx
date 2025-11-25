import GameSetup from "@/components/game-setup";
import Rules from "@/components/rules";

export default function Home() {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <div className="mt-8 mb-16">
        <GameSetup />
      </div>
      <Rules />
    </main>
  );
}
