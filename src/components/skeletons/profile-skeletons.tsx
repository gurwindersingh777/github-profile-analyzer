import { Skeleton } from '@/components/ui/skeleton'

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-5 border-2 border-border bg-card p-5 shadow-brutal sm:flex-row sm:gap-6 sm:p-6">
      <Skeleton className="h-24 w-24 shrink-0 rounded-full sm:h-28 sm:w-28" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-4 w-64" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  )
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border-2 border-border bg-card p-4 shadow-brutal-sm sm:p-5"
        >
          <Skeleton className="mb-3 h-10 w-10" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="mt-1 h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function LanguageChartSkeleton() {
  return (
    <div className="flex h-full flex-col border-2 border-border bg-card p-5 shadow-brutal sm:p-6">
      <Skeleton className="mb-4 h-6 w-40" />
      <div className="flex flex-1 items-center justify-center py-6">
        <Skeleton className="h-44 w-44 rounded-full" />
      </div>
    </div>
  )
}

export function TopReposSkeleton() {
  return (
    <div className="flex h-full flex-col border-2 border-border bg-card p-5 shadow-brutal sm:p-6">
      <Skeleton className="mb-4 h-6 w-44" />
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 border-2 border-border bg-background p-4 shadow-brutal-sm"
          >
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AIInsightsSkeleton() {
  return (
    <div className="border-2 border-border bg-card p-5 shadow-brutal sm:p-6">
      <Skeleton className="mb-5 h-8 w-40" />
      <div className="grid gap-5 lg:grid-cols-3">
        <Skeleton className="h-36 w-full" />
        <div className="space-y-2 lg:col-span-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export function GitHubProfileScoreSkeleton() {
  return (
    <section className="border-2 border-border bg-card p-6 shadow-brutal">
      <Skeleton className="mb-6 h-6 w-48" />

      <div className="mb-8 border-2 border-border p-4">
        <Skeleton className="h-20 w-full" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="mb-2 flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-10" />
            </div>

            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}