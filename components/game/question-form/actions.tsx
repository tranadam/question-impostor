"use client";

import { generateRandomIntFromRange } from "@/lib/random";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dices, Sparkles } from "lucide-react";
import Link from "next/link";
import { GameConfig, GamePlayer, Player } from "@/types/game";
import { QuestionResponse } from "@/types/openai";

const getUpdatedGamePlayers = (players: Player[], whoAskedIdx: number) => {
  const afterPlayers = players.slice(whoAskedIdx + 1, players.length);
  const beforePlayers = players.slice(0, whoAskedIdx);
  const updatedGamePlayers = [...afterPlayers, ...beforePlayers].map(
    (player) => ({
      ...player,
      isImpostor: false,
    }),
  );
  return updatedGamePlayers;
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
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<QuestionResponse[]>([]);

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

  const handleAiInspiration = async () => {
    setLoadingAI(true);
    let questions: QuestionResponse[] = [];

    const fetchQuestions = async () => {
      const res = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({
          categories: ["funny", "personal", "embarrassing"],
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      questions = JSON.parse(data) as QuestionResponse[];

      setAiSuggestions(questions);
      console.log(questions);
      setLoadingAI(false);
    };

    toast.promise(fetchQuestions, {
      loading: "Generating questions with AI...",
      success: "Suggestions loaded!",
      error: "Failed to get AI suggestions:(",
    });
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
      <Button
        onClick={handleAiInspiration}
        variant="outline"
        disabled={loadingAI}
      >
        <Sparkles />
        get inspired by ai
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/">change settings</Link>
      </Button>
      {JSON.stringify(aiSuggestions)}
    </div>
  );
}
