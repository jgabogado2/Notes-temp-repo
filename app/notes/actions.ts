'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function addNote(formData: FormData): Promise<void> {
	const title = String(formData.get('title') ?? '').trim()
	const body = String(formData.get('body') ?? '').trim()

	if (!title) return

	const supabase = await createClient()

	await supabase.from('notes').insert({ title, body, status: false })

	revalidatePath('/notes')
}

export async function updateNote(formData: FormData): Promise<void> {
	const idRaw = formData.get('id')
	const id = typeof idRaw === 'string' ? Number(idRaw) : Number(idRaw)
	const title = String(formData.get('title') ?? '').trim()
	const body = String(formData.get('body') ?? '').trim()
	const statusRaw = formData.get('status')
	const status = statusRaw === 'on' || statusRaw === 'true' || statusRaw === '1'

	if (!id || Number.isNaN(id)) return

	const supabase = await createClient()
	await supabase.from('notes').update({ title, body, status }).eq('id', id)

	revalidatePath('/notes')
	redirect('/notes')
}

export async function deleteNote(formData: FormData): Promise<void> {
	const idRaw = formData.get('id')
	const id = typeof idRaw === 'string' ? Number(idRaw) : Number(idRaw)
	if (!id || Number.isNaN(id)) return

	const supabase = await createClient()
	await supabase.from('notes').delete().eq('id', id)

	revalidatePath('/notes')
}

export async function toggleStatus(formData: FormData): Promise<void> {
	const idRaw = formData.get('id')
	const id = typeof idRaw === 'string' ? Number(idRaw) : Number(idRaw)
	const nextRaw = formData.get('nextStatus')
	const nextStatus = nextRaw === 'true' || nextRaw === '1' || nextRaw === 'on'

	if (!id || Number.isNaN(id)) return

	const supabase = await createClient()
	await supabase.from('notes').update({ status: nextStatus }).eq('id', id)

	revalidatePath('/notes')
}
