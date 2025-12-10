'use client';

import * as React from 'react';

import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Loader2, Rocket, Sparkles } from 'lucide-react';
import { CategoryInput } from '@/components/ui/category-input';

export function AiSuggestionDialog({
  onRollAndPlay,
  onGenerateSuggestions,
}: {
  disabled?: boolean;
  onRollAndPlay: (c: string[], p: string) => Promise<void>;
  onGenerateSuggestions: (c: string[], p: string) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const title = 'generate questions';
  const description =
    'Get inspired by AI-generated questions. You can either roll one randomly and everyone plays, or one player picks and edits one of the suggestions.';
  const triggerContent = (
    <>
      <Sparkles />
      get inspired
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{triggerContent}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <AiSuggestionsForm
            onGenerateSuggestions={onGenerateSuggestions}
            onRollAndPlay={onRollAndPlay}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{triggerContent}</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AiSuggestionsForm
            onGenerateSuggestions={onGenerateSuggestions}
            onRollAndPlay={onRollAndPlay}
            setOpen={setOpen}
          />
        </div>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AiSuggestionsForm({
  onGenerateSuggestions,
  onRollAndPlay,
  setOpen,
}: {
  onGenerateSuggestions: (c: string[], p: string) => Promise<void>;
  onRollAndPlay: (c: string[], p: string) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [context, setContext] = React.useState<string>('');
  const [loadingRoll, setLoadingRoll] = React.useState(false);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="categories">categories</Label>
        <CategoryInput
          setCategories={setCategories}
          id="categories"
          placeholder="comma separated categories"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="context">extra context</Label>
        <Input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          id="context"
          placeholder="any additional guidelines"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={async () => {
            setOpen(false);
            await onGenerateSuggestions(categories, context);
          }}
          variant="outline"
          type="button"
          disabled={loadingRoll}
        >
          <Bot />
          generate suggestions
        </Button>
        <Button
          onClick={async () => {
            setLoadingRoll(true);
            await onRollAndPlay(categories, context);
            setLoadingRoll(false);
            setOpen(false);
          }}
          type="button"
          disabled={loadingRoll}
        >
          {!loadingRoll ? (
            <>
              <Rocket />
              roll & play
            </>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </div>
    </section>
  );
}
