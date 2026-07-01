import { ProcessedGitHubData } from "@/types";
import {
  Award,
  FolderGit2,
  Code2,
  BookOpen,
  Users,
  CalendarClock,
} from "lucide-react";

interface Props {
  score: ProcessedGitHubData["developerScore"];
}

interface Metric {
  label: string;
  value: number;
  color: string;
  iconBg: string;
  iconFg: string;
  icon: React.ElementType;
}

export function GitHubProfileScore({ score }: Props) {
  const metrics: Metric[] = [
    {
      label: "Portfolio",
      value: score.portfolio,
      color: "bg-secondary",
      iconBg: "bg-secondary",
      iconFg: "text-secondary-foreground",
      icon: FolderGit2,
    },
    {
      label: "Technology",
      value: score.technology,
      color: "bg-accent",
      iconBg: "bg-accent",
      iconFg: "text-accent-foreground",
      icon: Code2,
    },
    {
      label: "Documentation",
      value: score.documentation,
      color: "bg-destructive",
      iconBg: "bg-destructive",
      iconFg: "text-destructive-foreground",
      icon: BookOpen,
    },
    {
      label: "Community",
      value: score.community,
      color: "bg-primary",
      iconBg: "bg-primary",
      iconFg: "text-primary-foreground",
      icon: Users,
    },
    {
      label: "Consistency",
      value: score.consistency,
      color: "bg-violet-500",
      iconBg: "bg-violet-500",
      iconFg: "text-destructive-foreground",
      icon: CalendarClock,
    },
  ];

  return (
    <section className="border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
          <Award className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-black tracking-tight">
            Github Profile Score
          </h2>

          <p className="text-sm text-muted-foreground">
            Calculated from your GitHub repositories and activity.
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-8 flex items-center justify-between border-2 border-border bg-primary p-5 text-primary-foreground shadow-brutal-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">
            Overall Score
          </p>

          <h3 className="mt-1 text-5xl font-black leading-none">
            {score.overall}
          </h3>
        </div>

         <div className="text-right">
          <p className="text-sm font-bold">out of 100</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-5">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center border-2 border-border ${metric.iconBg} ${metric.iconFg}`}
                >
                  <metric.icon className="h-4 w-4" />
                </span>

                <span className="font-bold">{metric.label}</span>
              </div>

              <span className="text-lg font-black tabular-nums">
                {metric.value}
              </span>
            </div>

            <div className="h-4 overflow-hidden border-2 border-border bg-muted">
              <div
                className={`h-full transition-all duration-700 ${metric.color}`}
                style={{
                  width: `${metric.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}