import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile/profile-page'

type Props = {
  params: Promise<{username: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const { username } = await params
  return {
    title: `${username} — GitHub Profile Analysis`,
    description: `AI-powered GitHub profile analysis for ${username}`,
  }
}

export default async function Page({ params }: Props) {
  const { username } = await params

  return <ProfilePage username={username} />
}