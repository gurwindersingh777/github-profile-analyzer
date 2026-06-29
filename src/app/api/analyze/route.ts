import { ai, buildPrompt } from "@/lib/ai";
import { AIInsights, ProcessedGitHubData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ProcessedGitHubData

    if (!data?.user) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const prompt = buildPrompt(data)

    const completion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: {
        type: "json_object"
      },
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const text = completion.choices[0].message.content ?? ""

    try {
      const insights = JSON.parse(text) as AIInsights

      return NextResponse.json(insights)
    } catch (error) {
      return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 })
    }

  } catch (error) {
      console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}