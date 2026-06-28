import { ProfilePage } from "@/components/profile/profile-page"

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProfilePage username={username} />
    </main>
  )
}
