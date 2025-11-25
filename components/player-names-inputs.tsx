import { Input } from "@/components/ui/input";

export default function PlayerNamesInputs({
  playerNames,
  setPlayerNames,
}: {
  playerNames: string[];
  setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      {playerNames.map((name, i) => (
        <Input
          key={i}
          type="text"
          placeholder={`Player ${i + 1}`}
          value={name}
          onChange={(e) => {
            const newNames = [...playerNames];
            newNames[i] = e.target.value;
            setPlayerNames(newNames);
          }}
        />
      ))}
    </div>
  );
}
