import { Player } from "@/types/game";
import { Input } from "@/components/ui/input";

export default function PlayerNamesInputs({
  players,
  setPlayerNames,
}: {
  players: Player[];
  setPlayerNames: (p: Player[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {players.map((player) => (
        <Input
          key={player.id}
          type="text"
          placeholder={`Player ${player.id + 1}`}
          value={player.name}
          onChange={(e) => {
            const newPlayers = [...players];
            const index = newPlayers.findIndex((p) => p.id === player.id);
            if (index !== -1) {
              newPlayers[index] = {
                ...newPlayers[index],
                name: e.target.value,
              };
              setPlayerNames(newPlayers);
            }
          }}
        />
      ))}
    </div>
  );
}
