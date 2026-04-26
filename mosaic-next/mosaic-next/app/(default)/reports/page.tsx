import { formatCurrency, liveOpportunities, metrics, opportunities } from '@/lib/bidtrack-data'

export const metadata = {
  title: 'Reports - BidTrack',
  description: 'Tender pipeline performance, workload, and forecast reporting.',
}

export default function ReportsPage() {
  const won = opportunities.filter((opportunity) => opportunity.stage === 'Won').length
  const lost = opportunities.filter((opportunity) => opportunity.stage === 'Lost').length
  const submitted = won + lost + opportunities.filter((opportunity) => opportunity.stage === 'Award').length
  const winRate = submitted ? Math.round((won / submitted) * 100) : 0

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Performance / workload / forecast</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Reports</h1>
        </div>
        <div className="flex gap-2">
          {['90', '180', '360'].map((days) => (
            <button key={days} className={`btn ${days === '90' ? 'bg-violet-600 text-white' : 'border-gray-200 bg-white text-gray-700'}`}>{days} days</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {[
          ['Win rate', `${winRate}%`, `${won} won / ${lost} lost`],
          ['Won value', formatCurrency(metrics.wonValue), 'Closed won tenders'],
          ['Live forecast', formatCurrency(metrics.liveValue), `${liveOpportunities.length} active tenders`],
          ['Submitted', String(submitted), 'Award, won, and lost'],
        ].map(([label, value, helper]) => (
          <div key={label} className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 md:col-span-6 xl:col-span-3">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{helper}</p>
          </div>
        ))}

        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 xl:col-span-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Value by stage</h2>
            <button className="btn-sm border-gray-200 bg-white text-gray-700 hover:border-gray-300">Export report CSV</button>
          </div>
          <div className="space-y-4">
            {['PSQ', 'ITT', 'Presentation', 'Award', 'Won', 'Lost'].map((stage) => {
              const total = opportunities.filter((opportunity) => opportunity.stage === stage).reduce((sum, opportunity) => sum + opportunity.value, 0)
              const width = `${Math.max(6, Math.round((total / 900000) * 100))}%`
              return (
                <div key={stage}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{stage}</span>
                    <span className="text-gray-500">{formatCurrency(total)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <div className="h-3 rounded-full bg-violet-600" style={{ width }} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 xl:col-span-5">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Workload by owner</h2>
          <div className="mt-5 space-y-3">
            {Array.from(new Set(opportunities.map((opportunity) => opportunity.owner))).map((owner) => {
              const active = liveOpportunities.filter((opportunity) => opportunity.owner === owner)
              return (
                <div key={owner} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{owner}</p>
                    <p className="text-sm text-gray-500">{active.length} active tenders</p>
                  </div>
                  <p className="font-semibold text-violet-600">{formatCurrency(active.reduce((sum, opportunity) => sum + opportunity.value, 0))}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
