'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/dashboard')
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('name') ?? '')
  const organisation = String(formData.get('organisation') ?? '')
  const role = String(formData.get('role') ?? '')
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        organisation_name: organisation,
        role,
      },
    },
  })

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/onboarding-01')
}
