import { createClient } from '@/lib/supabase/server'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updateNote } from '../actions'

type PageProps = {
	params: Promise<{ id: string }>
}

export default async function NoteEditPage(props: PageProps) {
	const { id } = await props.params
	const supabase = await createClient()
	const { data: note } = await supabase
		.from('notes')
		.select('*')
		.eq('id', Number(id))
		.single()

	return (
		<div className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>Edit Note</CardTitle>
					</CardHeader>
					<CardContent>
						<form action={updateNote} className="grid gap-4">
							<input type="hidden" name="id" value={id} />
							<div>
								<label className="mb-1 block text-sm text-muted-foreground">Title</label>
								<Input name="title" defaultValue={note?.title ?? ''} />
							</div>
							<div>
								<label className="mb-1 block text-sm text-muted-foreground">Body</label>
								<Input name="body" defaultValue={note?.body ?? ''} />
							</div>
							<div className="flex items-center gap-2">
								<input id="status" name="status" type="checkbox" defaultChecked={!!note?.status} />
								<label htmlFor="status" className="text-sm">Done</label>
							</div>
							<div className="flex items-center gap-3">
								<Button type="submit">Save</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}


