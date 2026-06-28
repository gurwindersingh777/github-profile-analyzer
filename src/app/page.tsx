'use client'

import { FeatureCards } from '@/components/home/feature-card'
import { GithubStarButton } from '@/components/home/github-star-button'
import { ProfileSearch } from '@/components/home/public-search'
import { ThemeToggle } from '@/components/home/theme-toggle'
import { motion } from 'motion/react'


export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b-2 border-border px-4 py-3 sm:px-6">
        <GithubStarButton />
        <ThemeToggle />
      </header>

      <div className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 lg:items-center lg:overflow-hidden lg:py-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              GitHub Profile{' '}
              <span className="bg-primary px-2 text-primary-foreground">
                Analyzer
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Drop in any username to uncover coding patterns, repository
              quality, language usage, and a personalized developer score.
            </p>
          </motion.div>

          <div className="mt-6 w-full max-w-2xl sm:mt-8">
            <ProfileSearch />
          </div>

          <div className="mt-6 w-full sm:mt-10">
            <FeatureCards />
          </div>
        </div>
      </div>
    </main>
  )
}
