import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { categories } = await req.json();

  if (!categories || !Array.isArray(categories)) {
    return NextResponse.json(
      { error: "categories must be an array" },
      { status: 400 },
    );
  }

  const prompt = `
You create fun, social deduction questions for a party game. The game goes like this:

Everyone discretely draws a question and writes down their answer.
The catch is, some of the players unknowingly receive an impostor question.
Once everyone locks their answer, original question is revealed along with all answers.
Players discuss who they think the impostor is, then vote.
If the majority correctly identifies the impostor, they win. If not, the impostor wins!

The question should be engaging, witty, embarrassing, or thought-provoking to spark lively discussions.
It is usually played among friends of age 18-25 (Gen Z) or at social gatherings.

The answers to the question should be subjective and open-ended, allowing for a variety of responses.
It could be a number, word, or a short sentence. Do NOT be generic, cringe, too specific.

Generate 3 unique question ideas with the main question and impostor question based on the categories below.
Both questions should have a similar theme and answer style. For example, both could require a one-word answer, or both could require a number.
If an answer is someone's name at the table, then the impostor question should also lead to a name as an answer.
However, the questions should never be identical in meaning.

Return JSON ONLY in this format:
[ {"mainQuestion": "string", "impostorQuestion": "string" }, ... ]
Do NOT include any explanations or additional text.

Categories: ${categories.join(", ")}
  `;

  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });

  const questions = response.output_text;

  // TODO: Validate it is question form type

  return NextResponse.json(questions);
}
