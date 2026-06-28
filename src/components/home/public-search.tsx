'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GithubIcon } from './github-icon'

// GitHub usernames: letters, numbers, and single hyphens (not leading/trailing)
const USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/

export function ProfileSearch() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = username.trim()

    if (!trimmed) {
      setError('Please enter a GitHub username.')
      return
    }
    if (!USERNAME_REGEX.test(trimmed)) {
      setError('Only letters, numbers, and hyphens are allowed.')
      return
    }

    setError('')
    setIsLoading(true)
    router.push(`/${trimmed}`)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center"
    >
      <div className="w-full flex-1">
        <div className="relative w-full">
          <GithubIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground" />
          <Input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (error) setError('')
            }}
            disabled={isLoading}
            placeholder="Enter GitHub username..."
            aria-label="GitHub username"
            aria-invalid={!!error}
            className="h-14 w-full rounded-none border-2 border-border bg-input pl-12 pr-5 text-base font-medium text-foreground shadow-brutal-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary disabled:opacity-60"
          />
        </div>
        {error ? (
          <p className="mt-2 text-left text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-14 w-full rounded-none border-2 border-border bg-primary px-7 text-base font-bold text-primary-foreground shadow-brutal-sm transition-transform hover:bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-1 h-5 w-5 animate-spin" aria-hidden="true" />
            Analyzing...
          </>
        ) : (
          <>
            Analyze Profile
            <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
          </>
        )}
      </Button>
    </motion.form>
  )
}
