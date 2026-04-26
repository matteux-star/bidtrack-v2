export const metadata = {
  title: 'Workspace setup - BidTrack',
  description: 'Set up your BidTrack workspace.',
}

import Link from 'next/link'
import OnboardingHeader from '../onboarding-header'
import OnboardingImage from '../onboarding-image'
import OnboardingProgress from '../onboarding-progress'

export default function Onboarding01() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        <div className="w-full md:w-1/2">
          <div className="flex h-full min-h-[100dvh] flex-col after:flex-1">
            <div className="flex-1">
              <OnboardingHeader />
              <OnboardingProgress step={1} />
            </div>

            <div className="px-4 py-8">
              <div className="mx-auto max-w-md">
                <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">Set up your bid workspace</h1>
                <p className="mb-6 text-sm text-gray-500">This creates the organisation record that all tender data, roles, billing, and exports will belong to.</p>
                <form className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Organisation name</label>
                    <input className="form-input w-full" placeholder="Example Bid Team Ltd" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Main tender volume</label>
                    <select className="form-select w-full" defaultValue="10-30">
                      <option>Under 10 tenders per year</option>
                      <option>10-30 tenders per year</option>
                      <option>30-100 tenders per year</option>
                      <option>100+ tenders per year</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Billing path</label>
                    <select className="form-select w-full" defaultValue="trial">
                      <option value="trial">Start trial and configure Stripe Checkout</option>
                      <option value="manual">Manual onboarding override</option>
                    </select>
                  </div>
                  <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 text-sm text-violet-800">
                    Owner, editor, and viewer roles are scaffolded now so team invitations can be expanded without changing the data model.
                  </div>
                  <div className="flex items-center justify-end">
                    <Link className="btn bg-violet-600 text-white hover:bg-violet-700" href="/dashboard">Enter workspace</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <OnboardingImage />
      </div>
    </main>
  )
}
