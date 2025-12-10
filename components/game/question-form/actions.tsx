"use client";

import { generateRandomIntFromRange } from "@/lib/random";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import Link from "next/link";
import { GameConfig, GamePlayer, Player } from "@/types/game";
import { QuestionResponse } from "@/types/openai";
import { AiSuggestionDialog } from "@/components/game/question-form/ai-suggestion-dialog";
import { useState } from "react";
import { SuggestionsPickDrawer } from "@/components/game/question-form/suggestions-pick-drawer";

const getUpdatedGamePlayers = (players: Player[], whoAskedIdx: number) => {
  let mixedGamePlayers = players;
  if (whoAskedIdx !== -1) {
    const afterPlayers = players.slice(whoAskedIdx + 1, players.length);
    const beforePlayers = players.slice(0, whoAskedIdx);
    mixedGamePlayers = afterPlayers.concat(beforePlayers);
  }
  const resetGamePlayers = mixedGamePlayers.map((player) => ({
    ...player,
    isImpostor: false,
  }));
  return resetGamePlayers;
};

const getPlayersWithImpostors = (
  players: GamePlayer[],
  impostorCount: number,
) => {
  const randomIdxs = generateRandomIntFromRange(
    0,
    players.length - 1,
    impostorCount,
  );

  return players.map((player, idx) => ({
    ...player,
    isImpostor: randomIdxs.includes(idx),
  }));
};

export default function QuestionFormActions({
  config,
  updateConfig,
  onNext,
}: {
  config: GameConfig;
  updateConfig: (config: Partial<GameConfig>) => void;
  onNext: () => void;
}) {
  const [suggestedQuestions, setSuggestedQuestions] = useState<
    QuestionResponse[]
  >([]);
  const [suggestionsDrawerOpen, setSuggestionsDrawerOpen] = useState(false);

  const handleNext = () => {
    const gamePlayersWithoutWhoAsked = getUpdatedGamePlayers(
      config.players,
      config.whoAskedIdx,
    );
    const playersWithImpostors = getPlayersWithImpostors(
      gamePlayersWithoutWhoAsked,
      config.impostorCount,
    );
    updateConfig({ currentPlayerIdx: 0, gamePlayers: playersWithImpostors });
    onNext();
  };

  const fetchQuestions = async (
    categories: string[],
    context: string,
    count: number,
  ) => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({
          categories,
          context,
          count,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch questions: " + res.statusText);
      }

      const data = await res.json();
      const questions = JSON.parse(data) as QuestionResponse[];
      return questions;
    } catch {
      toast.error("Failed to generate questions. Please try again.");
      return [];
    }
  };

  const handleRollAiAndPlay = async (categories: string[], context: string) => {
    toast.info("Generating questions with AI...");
    const questions = await fetchQuestions(categories, context, 1);
    if (questions.length === 0) {
      toast.error("Failed to generate questions. Please try again.");
      return;
    }

    updateConfig({
      mainQuestion: questions[0].mainQuestion,
      impostorQuestion: questions[0].impostorQuestion,
      whoAskedIdx: -1,
    });
    handleNext();
  };

  const handleGenerateAiSuggestions = async (
    categories: string[],
    context: string,
  ) => {
    toast.info("Generating questions with AI...");
    setSuggestionsDrawerOpen(true);
    const questions = await fetchQuestions(categories, context, 3);
    setSuggestedQuestions(questions);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        disabled={
          config.mainQuestion === "" ||
          config.impostorQuestion === "" ||
          config.whoAskedIdx === -1
        }
        onClick={handleNext}
      >
        <Dices />
        let&apos;s play
      </Button>
      <AiSuggestionDialog
        onGenerateSuggestions={handleGenerateAiSuggestions}
        onRollAndPlay={handleRollAiAndPlay}
      />
      <SuggestionsPickDrawer
        questions={suggestedQuestions}
        onPick={(main: string, impostor: string) => {
          updateConfig({ mainQuestion: main, impostorQuestion: impostor });
          setSuggestionsDrawerOpen(false);
        }}
        open={suggestionsDrawerOpen}
        onClose={() => setSuggestedQuestions([])}
      />
      <Button variant="ghost" asChild>
        <Link href="/">change settings</Link>
      </Button>
    </div>
  );
}
