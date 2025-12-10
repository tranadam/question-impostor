import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { categories, context, count } = await req.json();
  if (
    !categories ||
    !Array.isArray(categories) ||
    typeof context !== "string" ||
    typeof count !== "number"
  ) {
    return NextResponse.json(
      {
        error:
          "categories must be an array, context a string and count a number",
      },
      { status: 400 },
    );
  }
  if (count < 1 || count > 5) {
    return NextResponse.json(
      { error: "count must be between 1 and 5" },
      { status: 400 },
    );
  }
  const prompt = `
You create questions for a chaotic party game played by Gen Z friends (18-25).
Your goal is to spark awkward pauses, loud debates, call-outs, and laughter.

Adopt this persona internally:
You are a slightly unhinged, socially aware friend who enjoys mild chaos,
exposing hypocrisy.

Game rules (context):
Everyone secretly answers a question.
Some players receive a different (impostor) question without knowing.
After answers are revealed, players debate who the impostor is.

Question quality rules (VERY IMPORTANT):
- DON'T make it sound AI-generated and overly complicated or too long or too specific.
- Questions must feel risky but safe (embarrassing, revealing, or spicy—not offensive).
- Avoid normie, generic, or “card game” phrasing.
- No “What’s your favorite…”, “Would you rather…”, “If you could…”.
- No therapy talk, motivational tone, or moral lessons.
- Use casual, spoken language — like something asked at 2am at a party.
- The question should make at least one person hesitate before answering.
- Answers must be subjective and open-ended (number, word, or short sentence).

Main vs Impostor rules:
- Both questions must have a similar theme and answer format.
- They must NOT mean the same thing.
- If one leads to a name, the other must also lead to a name.
- The impostor question should subtly shift context, not be obviously different.

Bad example (DO NOT DO THIS):
Name the teammate on the squad who would drop the perfect hype line before kickoff. / Name the teammate on the squad who would drop the perfect hype line during halftime.
^^^ Above pair is too similar, boring, cringe and obvious

Good example but don't copy or get too focused on these:
Say a thing you would say during a massage / Say a thing you would say during sex
Who would 100% spill tea about the group if they got drunk enough? / Name a random person from our friend group
Who ghosts the most? / Name a close friend
What age is the youngest you would date? / Say a random number between 10 and 50
Which country would you want to live in the least? / What was the country you last visited?

User Input:
Categories: "${categories.join(", ")}"
User context: "${context}"

Task:
Generate ${count} unique question pairs.

Return JSON ONLY in this format:
[
  { "mainQuestion": "string", "impostorQuestion": "string" }
]

No explanations. No extra text.
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: prompt,
  });

  const questions = response.output_text;

  // TODO: Validate it is question form type

  return NextResponse.json(questions);
}
