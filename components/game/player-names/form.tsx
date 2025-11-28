import { GameConfig, Player } from "@/types/game";
import { Input } from "@/components/ui/input";

export default function PlayerNamesInputs({
  players,
  setPlayerNames,
}: Pick<GameConfig, "players"> & {
  setPlayerNames: (p: Player[]) => void;
}) {
  return (
    <div className="space-y-2">
      {players.map((player, i) => (
        <Input
          key={player.id}
          type="text"
          placeholder={`Player ${player.id}`}
          value={player.name}
          onChange={(e) => {
            const newPlayers = [...players];
            newPlayers[i] = {
              ...newPlayers[i],
              name: e.target.value,
            };
            setPlayerNames(newPlayers);
          }}
        />
      ))}
    </div>
  );
}
