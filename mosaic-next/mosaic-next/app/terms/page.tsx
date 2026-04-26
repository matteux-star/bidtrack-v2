export const metadata = {
  title: 'Terms - BidTrack',
  description: 'BidTrack terms outline.',
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-gray-800 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-950">Terms outline</h1>
      <p className="mt-6 text-gray-600">
        These placeholder terms describe the intended MVP boundaries: BidTrack is a tender pipeline tracker, not a CRM, bid-writing service, legal adviser, or procurement decision maker.
      </p>
      <div className="mt-8 space-y-6">
        {[
          ['User responsibility', 'Customers remain responsible for tender submissions, buyer communications, deadlines, and data entered into the product.'],
          ['Availability', 'The MVP should aim for reliable hosted service while making CSV exports available for customer backups.'],
          ['Billing', 'Self-serve subscriptions are planned through Stripe, with manual onboarding fallback for early customers.'],
          ['Acceptable use', 'Users must not upload unlawful content or use BidTrack to process unnecessary personal data.'],
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
