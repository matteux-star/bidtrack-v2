import Link from 'next/link'
import { deadlineBadge, daysUntil, formatCurrency, liveOpportunities, metrics, stageBadge } from '@/lib/bidtrack-data'

export const metadata = {
  title: 'Dashboard - BidTrack',
  description: 'Tender pipeline overview and deadline risk.',
}

const stageOrder = ['PSQ', 'ITT', 'Presentation', 'Award'] as const

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Deadline risk first</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Tender dashboard</h1>
        </div>
        <Link href="/opportunities" className="btn bg-violet-600 text-white hover:bg-violet-700">
          Add opportunity
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {[
          ['Overdue', String(metrics.overdue), 'Needs action', 'border-red-200 bg-red-50 text-red-700'],
          ['Due in 7 days', String(metrics.dueSevenDays), 'Tender deadlines', 'border-yellow-200 bg-yellow-50 text-yellow-800'],
          ['Due this month', String(metrics.dueThisMonth), 'April submissions', 'border-violet-200 bg-violet-50 text-violet-700'],
          ['Live pipeline', formatCurrency(metrics.liveValue), `${metrics.liveCount} active tenders`, 'border-gray-200 bg-white text-gray-800'],
        ].map(([label, value, helper, classes]) => (
          <div key={label} className={`col-span-12 rounded-xl border p-5 shadow-sm md:col-span-6 xl:col-span-3 ${classes}`}>
            <p className="text-sm font-medium opacity-80">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            <p className="mt-1 text-sm opacity-75">{helper}</p>
          </div>
        ))}

        <section className="col-span-12 rounded-xl bg-white shadow-sm dark:bg-gray-800 xl:col-span-8">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Due soon</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-700/30 dark:text-gray-400">
                <tr>
                  <th className="px-5 py-3 text-left">Tender</th>
                  <th className="px-5 py-3 text-left">Stage</th>
                  <th className="px-5 py-3 text-left">Deadline</th>
                  <th className="px-5 py-3 text-left">Owner</th>
                  <th className="px-5 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm dark:divide-gray-700/60">
                {liveOpportunities
                  .slice()
                  .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))
                  .map((opportunity) => (
                    <tr key={opportunity.id}>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{opportunity.name}</p>
                        <p className="text-xs text-gray-500">{opportunity.buyer}</p>
                      </td>
                      <td className="px-5 py-4"><span className={stageBadge(opportunity.stage)}>{opportunity.stage}</span></td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${deadlineBadge(opportunity.deadline, opportunity.stage)}`}>
                          {opportunity.deadline}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">{opportunity.owner}</td>
                      <td className="px-5 py-4 text-right font-medium text-gray-900 dark:text-gray-100">{formatCurrency(opportunity.value)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 xl:col-span-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Pipeline by stage</h2>
          <div className="mt-5 space-y-4">
            {stageOrder.map((stage) => {
              const count = liveOpportunities.filter((opportunity) => opportunity.stage === stage).length
              const width = `${Math.max(12, count * 25)}%`
              return (
                <div key={stage}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{stage}</span>
                    <span className="text-gray-500">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                    <div className="h-2 rounded-full bg-violet-600" style={{ width }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 rounded-lg border border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            Won value is currently <strong className="text-gray-900 dark:text-gray-100">{formatCurrency(metrics.wonValue)}</strong>; lost value is <strong className="text-gray-900 dark:text-gray-100">{formatCurrency(metrics.lostValue)}</strong>.
          </div>
        </section>
      </div>
    </div>
  )
}
