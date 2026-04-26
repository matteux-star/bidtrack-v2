import { liveOpportunities, daysUntil } from '@/lib/bidtrack-data'

export const metadata = {
  title: 'Notifications - BidTrack',
  description: 'Telegram deadline reminders.',
}

const reminderWindows = ['7 days before deadline', '3 days before deadline', '1 day before deadline', 'Overdue reminder']

export default function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600">Telegram first</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Notifications</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 lg:col-span-5">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Telegram connection</h2>
          <p className="mt-2 text-sm text-gray-500">Connect a Telegram chat to receive bid deadline reminders. WhatsApp is intentionally deferred until the reminder workflow is proven.</p>
          <div className="mt-5 rounded-lg border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-semibold text-violet-800">Not connected</p>
            <p className="mt-1 text-sm text-violet-700">MVP integration will store Telegram chat ID per user and organisation.</p>
          </div>
          <button className="btn mt-5 bg-violet-600 text-white hover:bg-violet-700">Connect Telegram</button>
        </section>

        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 lg:col-span-7">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Default reminder rules</h2>
          <div className="mt-5 space-y-3">
            {reminderWindows.map((window) => (
              <label key={window} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{window}</span>
                <input type="checkbox" className="form-checkbox text-violet-600" defaultChecked />
              </label>
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-xl bg-white shadow-sm dark:bg-gray-800">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Upcoming reminder queue</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {liveOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[1fr_auto_auto] md:items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{opportunity.name}</p>
                  <p className="text-gray-500">{opportunity.buyer}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{opportunity.deadline}</p>
                <p className="font-medium text-violet-600">{daysUntil(opportunity.deadline)} days</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
