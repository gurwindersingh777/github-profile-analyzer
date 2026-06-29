import { Sparkles, Check, Target, Trophy, Lightbulb, GraduationCap, ShieldCheck, Briefcase, BookOpen } from "lucide-react";
import { type AIInsights } from "@/types";

interface Props {
  insights?: AIInsights
  isError: boolean
}

export function AIInsights({ insights, isError }: Props) {

  if (isError) {
    return (
      <section className="border-2   bg-card p-6 shadow-brutal">
        <h2 className="font-bold text-destructive">
          AI analysis unavailable
        </h2>

        <p className="mt-2 text-muted-foreground">
          We couldn't generate AI insights right now. Your GitHub statistics are
          still available. Please try again in a few moments.
        </p>
      </section>
    )
  }

  if (!insights) return null

  return (
    <section className="border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>

        <h2 className="text-lg font-black tracking-tight">AI Insights</h2>
      </div>

      {/* Top Section */}
      <div className="grid gap-5 lg:grid-cols-3">

        <div className="flex flex-col items-center justify-center border-2 border-border bg-primary p-5 text-center text-primary-foreground shadow-brutal-sm">
          <Trophy className="mb-2 h-7 w-7" />
          <p className="text-2xl font-black leading-tight">{insights.archetype}</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-wide">Developer Archetype</p>
        </div>

        <div className="space-y-3 lg:col-span-2">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{insights.summary}</p>

          <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide">Archetype Description</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{insights.archetypeDescription}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center border-2 border-border bg-secondary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </span>
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">Career Level</p>
          </div>
          <p className="mt-2 text-lg font-black">{insights.careerLevel}</p>
        </div>

        <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center border-2 border-border bg-accent text-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">Confidence</p>
          </div>
          <p className="mt-2 text-lg font-black">{insights.confidenceScore}%</p>
        </div>

        <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
              <Briefcase className="h-4 w-4" />
            </span>
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">Best Fit Roles</p>
          </div>
          <div className="mt-2 space-y-1">
            {insights.bestFitRoles.map((role) => (
              <p key={role} className="flex items-start gap-2 text-sm font-semibold"><span>□</span>{role}</p>
            ))}
          </div>
        </div>

        <div className="border-2 border-border bg-muted p-4 shadow-brutal-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center border-2 border-border bg-destructive text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </span>
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">Learning Focus</p>
          </div>
          <div className="mt-2 space-y-1">
            {insights.learningFocus.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm font-semibold"><span>□</span> {item}</p>
            ))}
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
                  <Check className="h-4 w-4" />
                </span>

                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div>
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide">Improvements</h3>

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
  )
}