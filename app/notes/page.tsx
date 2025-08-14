import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addNote, deleteNote, toggleStatus } from './actions'
import Link from 'next/link'

export async function addNoteAction(formData: FormData): Promise<void> {
	'use server'
	await addNote(formData)
}

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select('*').order('id', { ascending: false })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground mt-2">
            {notes?.length || 0} note{notes?.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <form action={addNoteAction} className="mb-10 grid gap-3 max-w-2xl mx-auto sm:grid-cols-[1fr_1fr]">
          <Input name="title" placeholder="Title" aria-label="Note title" />
          <Input name="body" placeholder="Body" aria-label="Note body" />
          <div className="sm:col-span-2 flex justify-center">
            <Button type="submit" className="w-full sm:w-auto">Add</Button>
          </div>
        </form>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes?.map((note) => (
            <Card key={note.id} className="group relative hover:shadow-lg transition-shadow duration-200">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <form action={deleteNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <Button type="submit" variant="destructive" size="sm">Delete</Button>
                </form>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <form action={toggleStatus}>
                    <input type="hidden" name="id" value={note.id} />
                    <input type="hidden" name="nextStatus" value={(!note.status).toString()} />
                    <button aria-label={note.status ? 'Mark as not done' : 'Mark as done'} className="inline-flex items-center justify-center align-middle">
                      <span className={`inline-block size-4 rounded-sm border ${note.status ? 'bg-primary' : ''}`} />
                    </button>
                  </form>
                  <Link href={`/notes/${note.id}`} className="hover:underline truncate">
                    {note.title || 'Untitled'}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap break-words">{note.body || ''}</p>
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