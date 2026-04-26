export const metadata = {
  title: 'Settings - BidTrack',
  description: 'Workspace, billing, export, and GDPR settings.',
}

const settingsCards = [
  ['Workspace', 'BidTrack Demo Ltd', 'Organisation profile and manual onboarding override.'],
  ['Billing', 'Stripe checkout ready', 'Subscription status, trial state, and customer portal entry.'],
  ['Data export', 'CSV available', 'Download tender pipeline data for backups and analysis.'],
  ['GDPR', 'UK-first controls', 'Deletion request flow, privacy policy, terms, and minimal data.'],
]

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600">Workspace controls</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Settings</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {settingsCards.map(([title, status, text]) => (
          <section key={title} className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 md:col-span-6">
            <p className="text-sm font-medium text-violet-600">{status}</p>
            <h2 className="mt-2 font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{text}</p>
          </section>
        ))}

        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Export and account actions</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn bg-violet-600 text-white hover:bg-violet-700" href="/api/export/opportunities">Download opportunities CSV</a>
            <button className="btn border-gray-200 bg-white text-gray-700 hover:border-gray-300">Open Stripe customer portal</button>
            <button className="btn border-red-200 bg-white text-red-700 hover:bg-red-50">Request organisation deletion</button>
          </div>
        </section>
      </div>
    </div>
  )
}
