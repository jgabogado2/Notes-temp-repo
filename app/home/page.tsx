import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome to Notes App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {user ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    Hey {user.email}!
                  </h2>
                  <p className="text-muted-foreground">
                    Ready to capture your thoughts?
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="/notes">
                      <Plus className="h-5 w-5" />
                      View Notes
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex items-center gap-2">
                    <Link href="/notes/add">
                      <Plus className="h-5 w-5" />
                      Add Note
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    Welcome to Notes App
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to start creating and managing your notes
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/auth/login">
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/auth/sign-up">
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
