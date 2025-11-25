"use client";

import PlayerNamesActions from "@/components/player-names-actions";
import PlayerNamesInputs from "@/components/player-names-inputs";
import PlayerNamesExplanation from "@/components/players-names-explanation";
import { MIN_PLAYERS, UserGameConfig } from "@/lib/game-config";
import { useGameStorage } from "@/lib/hooks/use-game-storage";

export default function Players() {
  const [namesEnabled, setNamesEnabled] = useGameStorage(
    UserGameConfig.NAMES_ENABLED,
    true,
  );

  const [playerCount, setPlayersCount] = useGameStorage(
    UserGameConfig.NUM_PLAYERS,
    MIN_PLAYERS,
  );

  const [playerNames, setPlayerNames] = useGameStorage(
    UserGameConfig.PLAYER_NAMES,
    Array.from({ length: playerCount }, () => ""),
  );

  return (
    <main className="mx-auto mb-16 max-w-2xl px-4">
      <PlayerNamesExplanation />
      <div className="mt-4 mb-8">
        <PlayerNamesInputs
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
        />
      </div>
      <PlayerNamesActions
        setNamesEnabled={setNamesEnabled}
        playerCount={playerCount}
        playerNames={playerNames}
      />
    </main>
  );
}
