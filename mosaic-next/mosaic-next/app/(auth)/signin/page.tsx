export const metadata = {
  title: 'Sign in - BidTrack',
  description: 'Sign in to your BidTrack workspace.',
}

import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { signInAction } from '../actions'

export default function SignIn() {
  return (
    <main className="bg-white dark:bg-gray-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Welcome back</h1>
              <p className="mb-6 text-sm text-gray-500">Sign in to manage your tender pipeline, reports, and deadline reminders.</p>
              {/* Form */}
              <form action={signInAction}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" name="email" className="form-input w-full" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" name="password" className="form-input w-full" type="password" autoComplete="current-password" required />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" href="/reset-password">Forgot Password?</Link>
                  </div>
                  <button className="btn bg-violet-600 text-white hover:bg-violet-700 ml-3" type="submit">Sign in</button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  Need a workspace? <Link className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="/signup">Start your trial</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        <AuthImage />

      </div>

    </main>
  )
}
