export const metadata = {
  title: 'Privacy - BidTrack',
  description: 'BidTrack privacy notice.',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-gray-800 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-950">Privacy notice</h1>
      <p className="mt-6 text-gray-600">
        BidTrack is planned as a UK/GDPR-first tender pipeline tool. The MVP collects the minimum data required to run secure workspaces, authenticate users, manage subscriptions, and store tender pipeline records.
      </p>
      <div className="mt-8 space-y-6">
        {[
          ['Data we store', 'Account details, organisation membership, tender opportunity records, notes, links, billing references, audit timestamps, and notification preferences.'],
          ['Data exports', 'Workspace owners can export opportunity data as CSV for backups and regular reporting.'],
          ['Deletion', 'Workspace owners can request organisation deletion from settings. Production implementation should verify authority before deleting data.'],
          ['Processors', 'Supabase, Stripe, hosting infrastructure, and Telegram are the intended core processors for MVP operation.'],
        ].map(([title, text]) => (
          <section key={title}>
            <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
            <p className="mt-2 text-gray-600">{text}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
