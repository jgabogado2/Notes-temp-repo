import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground mt-2">
            {notes?.length || 0} note{notes?.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes?.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Note #{note.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Title:</p>
                <p className="font-medium">{note.title || 'Untitled'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {(!notes || notes.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notes found.</p>
          </div>
        )}
      </div>
    </div>
  )
}