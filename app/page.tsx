import PlayerSelection from "@/components/player-selection";
import Rules from "@/components/rules";

export default function Home() {
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <Rules />
      <div className="mt-10">
        <PlayerSelection />
      </div>
    </main>
  );
}
