'use client'

import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Code2, Trophy } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Insights',
    description: 'Personalized analysis of coding patterns and strengths.',
    iconBg: 'bg-primary',
    iconFg: 'text-primary-foreground',
  },
  {
    icon: BarChart3,
    title: 'Repo Analytics',
    description: 'Evaluate repository quality, activity, and engagement.',
    iconBg: 'bg-accent',
    iconFg: 'text-accent-foreground',
  },
  {
    icon: Code2,
    title: 'Language Stats',
    description: 'Visualize language usage and the full tech stack.',
    iconBg: 'bg-secondary',
    iconFg: 'text-secondary-foreground',
  },
  {
    icon: Trophy,
    title: 'Developer Score',
    description: 'A holistic score of impact, consistency, and skill.',
    iconBg: 'bg-destructive',
    iconFg: 'text-background',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function FeatureCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={item}
          whileHover={{ x: -2, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="h-full border-2 border-border bg-card p-4 text-left shadow-brutal-sm transition-shadow hover:shadow-brutal sm:p-5"
        >
          <div
            className={`mb-3 flex h-11 w-11 items-center justify-center border-2 border-border ${feature.iconBg} ${feature.iconFg}`}
          >
            <feature.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mb-1 text-sm font-extrabold tracking-tight text-card-foreground sm:text-base">
            {feature.title}
          </h3>
          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
