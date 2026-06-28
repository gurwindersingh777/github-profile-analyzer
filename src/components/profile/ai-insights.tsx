import { Sparkles, Check, Target, Trophy, Lightbulb } from "lucide-react";
import { type AIInsights } from "@/types";



export function AIInsights({ insights }: { insights: AIInsights }) {
  return (
    <section className="border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>

        <h2 className="text-lg font-black tracking-tight">
          AI Insights
        </h2>
      </div>

      {/* Top Section */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center border-2 border-border bg-primary p-5 text-center text-primary-foreground shadow-brutal-sm">
          <Trophy className="mb-2 h-6 w-6" />

          <p className="text-2xl font-black leading-tight">
            {insights.archetype}
          </p>

          <p className="mt-2 text-sm font-bold uppercase tracking-wide">
            Developer Archetype
          </p>
        </div>

        <div className="space-y-3 lg:col-span-2">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {insights.summary}
          </p>

          <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide">
              Archetype Description
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {insights.archetypeDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Strengths */}
        <div>
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide">
            Strengths
          </h3>

          <ul className="space-y-2">
            {insights.strengths.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-snug"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>

                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div>
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide">
            Improvements
          </h3>

          <ul className="space-y-2">
            {insights.improvements.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-snug"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-border bg-accent text-accent-foreground">
                  <Target className="h-3 w-3" />
                </span>

                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide">
            Suggestions
          </h3>

          <ul className="space-y-2">
            {insights.suggestions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-snug"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-border bg-secondary text-secondary-foreground">
                  <Lightbulb className="h-3 w-3" />
                </span>

                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}