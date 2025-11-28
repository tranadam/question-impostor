"use client";

import { GameConfig, Player } from "@/types/game";
import PlayerNamesActions from "@/components/player-names-actions";
import PlayerNamesInputs from "@/components/player-names-inputs";
import PlayerNamesExplanation from "@/components/players-names-explanation";
import Image from "next/image";

export default function PlayerNamesScreen({
  config,
  updateConfig,
  onNext,
  onPrev,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const setPlayerNames = (players: Player[]) => {
    updateConfig({ players });
  };
  const setNamesEnabled = (enabled: boolean) => {
    updateConfig({ namesEnabled: enabled });
  };
  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <PlayerNamesExplanation onPrev={onPrev} />
      <div className="mt-4 mb-8">
        <PlayerNamesInputs
          players={config.players}
          setPlayerNames={setPlayerNames}
        />
      </div>
      <PlayerNamesActions
        setNamesEnabled={setNamesEnabled}
        players={config.players}
        onNext={onNext}
      />
      <Image
        className="mx-auto mt-10"
        src="/illustrations/people-table.svg"
        alt="People sitting around a table"
        width={200}
        height={157}
      />
    </main>
  );
}
