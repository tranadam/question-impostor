import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import React from 'react';

export function CategoryInput({
  setCategories,
  ...props
}: {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = React.useState('');
  const [items, setItems] = React.useState<string[]>([]);

  function addItem(v: string) {
    const trimmed = v.trim();
    if (!trimmed || items.includes(trimmed)) return;
    setItems([...items, trimmed]);
    setValue('');
  }

  function removeItem(v: string) {
    setItems(items.filter((i) => i !== v));
  }

  return (
    <div className="focus-within:border-ring focus-within:ring-ring/50 flex flex-wrap gap-2 rounded-md border px-3 py-1 transition-[color,box-shadow] focus-within:ring-[3px]">
      {items.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="cursor-pointer"
          onClick={() => removeItem(item)}
        >
          {item}
          <X />
        </Badge>
      ))}

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addItem(value);
          }
          if (e.key === 'Backspace' && !value) {
            setItems(items.slice(0, -1));
          }
          setCategories(items);
        }}
        className="h-7 rounded-none border-0 p-0 shadow-none focus-visible:ring-0"
        type="text"
        {...props}
      />
    </div>
  );
}
