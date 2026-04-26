import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const publicPrefixes = [
  '/',
  '/signin',
  '/signup',
  '/reset-password',
  '/auth/callback',
  '/privacy',
  '/terms',
  '/api',
]

const appPrefixes = ['/onboarding-01', '/dashboard', '/opportunities', '/reports', '/notifications', '/team', '/settings']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const isPublic = publicPrefixes.some((prefix) => pathname === prefix || (prefix !== '/' && pathname.startsWith(`${prefix}/`)))
  const isAppRoute = appPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (!isPublic && !isAppRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isAppRoute) {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
