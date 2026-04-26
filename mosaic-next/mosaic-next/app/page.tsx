import Link from 'next/link'
import { formatCurrency, metrics, opportunities } from '@/lib/bidtrack-data'

const features = [
  {
    title: 'Deadline control',
    text: 'See overdue, due-this-week, and due-this-month tenders before they become fire drills.',
  },
  {
    title: 'Tender pipeline clarity',
    text: 'Track PSQ, ITT, presentation, award, won, and lost stages without turning BidTrack into a CRM.',
  },
  {
    title: 'Reporting that travels',
    text: 'Export clean CSV data for backups, board packs, and the spreadsheet work users still want to do.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">B</span>
          <span className="text-lg font-bold">BidTrack</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <Link href="/signin" className="text-gray-600 hover:text-gray-950">Log in</Link>
          <Link href="/signup" className="rounded-lg bg-gray-950 px-4 py-2 text-white hover:bg-violet-700">Start trial</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            Built for SME bid teams
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-gray-950 md:text-6xl">
            Replace messy bid spreadsheets.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            BidTrack gives bid managers one secure place to track tender deadlines, values, stages, owners, reporting, and exports without the weight of a full CRM.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="inline-flex justify-center rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 hover:bg-violet-700">
              Start self-serve signup
            </Link>
            <Link href="/dashboard" className="inline-flex justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50">
              View product preview
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-950 p-3 shadow-2xl shadow-gray-950/10">
          <div className="rounded-xl bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Deadline risk</p>
                <p className="text-2xl font-bold text-gray-950">{metrics.dueSevenDays} due this week</p>
              </div>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">Live preview</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Live</p>
                <p className="text-xl font-bold">{metrics.liveCount}</p>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-xs text-yellow-700">Due soon</p>
                <p className="text-xl font-bold text-yellow-900">{metrics.dueSevenDays}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Pipeline</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.liveValue)}</p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
              {opportunities.slice(0, 4).map((opportunity) => (
                <div key={opportunity.id} className="grid grid-cols-[1fr_auto] gap-4 p-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{opportunity.name}</p>
                    <p className="text-xs text-gray-500">{opportunity.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{opportunity.stage}</p>
                    <p className="text-xs text-gray-500">{opportunity.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-violet-600">MVP plan</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">Secure enough for client data, simple enough for daily use.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {['Supabase auth and organisation isolation', 'Owner, editor, and viewer role scaffolding', 'Telegram deadline reminders first', 'CSV exports for backups and reporting'].map((item) => (
            <div key={item} className="rounded-lg border border-gray-200 p-4 text-sm font-medium text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Start with the pipeline. Add the team later.</h2>
            <p className="mt-2 text-gray-400">Self-serve signup, Stripe billing, and manual onboarding fallback are planned from day one.</p>
          </div>
          <Link href="/signup" className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">
            Create your workspace
          </Link>
        </div>
      </section>
    </main>
  )
}
