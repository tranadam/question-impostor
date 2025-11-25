import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export default function NumericInput({
  value,
  onIncrease,
  onDecrease,
  onChange,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <ButtonGroup>
      <Button
        aria-label="Decrease"
        variant="outline"
        size="icon-lg"
        onClick={onDecrease}
      >
        <Minus />
      </Button>
      <Input
        min="0"
        max="12"
        type="number"
        inputMode="numeric"
        className="h-10 w-16"
        value={value}
        onChange={onChange}
        placeholder="0"
      />
      <Button
        aria-label="Increase"
        variant="outline"
        size="icon-lg"
        onClick={onIncrease}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
