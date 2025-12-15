import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import React from 'react';

export function CategoryInput({
  categories,
  setCategories,
  ...props
}: {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = React.useState('');

  function addItem(v: string) {
    const trimmed = v.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories([...categories, trimmed]);
    setValue('');
  }

  function removeItem(v: string) {
    setCategories(categories.filter((i) => i !== v));
  }

  return (
    <div className="focus-within:border-ring focus-within:ring-ring/50 flex flex-wrap gap-2 rounded-md border px-3 py-1 transition-[color,box-shadow] focus-within:ring-[3px]">
      {categories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="cursor-pointer"
          onClick={() => removeItem(category)}
        >
          {category}
          <X />
        </Badge>
      ))}

      <Input
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.endsWith(',')) {
            addItem(newValue.slice(0, -1));
          } else {
            setValue(newValue);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addItem(value);
            setCategories(categories);
          } else if (e.key === 'Backspace' && !value) {
            setCategories(categories.slice(0, -1));
          }
        }}
        className="h-7 rounded-none border-0 p-0 shadow-none focus-visible:ring-0"
        type="text"
        {...props}
      />
    </div>
  );
}
