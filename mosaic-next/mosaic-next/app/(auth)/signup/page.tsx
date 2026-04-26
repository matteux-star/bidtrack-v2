export const metadata = {
  title: 'Sign up - BidTrack',
  description: 'Create a BidTrack workspace.',
}

import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { signUpAction } from '../actions'

export default function SignUp() {
  return (
    <main className="bg-white dark:bg-gray-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Create your workspace</h1>
              <p className="mb-6 text-sm text-gray-500">Start with a secure tender pipeline for your SME bid team.</p>
              {/* Form */}
              <form action={signUpAction}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-red-500">*</span></label>
                    <input id="email" name="email" className="form-input w-full" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name <span className="text-red-500">*</span></label>
                    <input id="name" name="name" className="form-input w-full" type="text" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="organisation">Organisation <span className="text-red-500">*</span></label>
                    <input id="organisation" name="organisation" className="form-input w-full" type="text" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">Your Role <span className="text-red-500">*</span></label>
                    <select id="role" name="role" className="form-select w-full">
                      <option>Bid manager</option>
                      <option>Bid writer</option>
                      <option>Sales lead</option>
                      <option>Director / owner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" name="password" className="form-input w-full" type="password" autoComplete="new-password" required />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" required />
                      <span className="text-sm ml-2">I agree to the terms and privacy policy.</span>
                    </label>
                  </div>
                  <button className="btn bg-violet-600 text-white hover:bg-violet-700 ml-3 whitespace-nowrap" type="submit">Start trial</button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="/signin">Sign in</Link>
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
