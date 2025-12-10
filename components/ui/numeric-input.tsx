import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function NumericInput({
  value,
  onIncrease,
  onDecrease,
  onChange,
  size,
  disabled,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: 'sm' | 'lg';
  disabled?: boolean;
}) {
  return (
    <ButtonGroup>
      <Button
        aria-label="Decrease"
        variant="outline"
        size={size === 'sm' ? 'icon-sm' : 'icon-lg'}
        onClick={disabled ? undefined : onDecrease}
        disabled={disabled}
      >
        <Minus />
      </Button>
      <Input
        min="0"
        max="12"
        type="number"
        inputMode="numeric"
        disabled={disabled}
        className={cn('w-16', size === 'sm' ? 'h-8' : 'h-10')}
        value={value}
        onChange={disabled ? undefined : onChange}
        placeholder="0"
      />
      <Button
        aria-label="Increase"
        variant="outline"
        size={size === 'sm' ? 'icon-sm' : 'icon-lg'}
        onClick={disabled ? undefined : onIncrease}
        disabled={disabled}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
