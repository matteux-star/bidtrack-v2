import { deadlineBadge, formatCurrency, opportunities, stageBadge } from '@/lib/bidtrack-data'

export const metadata = {
  title: 'Opportunities - BidTrack',
  description: 'Tender opportunity tracking.',
}

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Tender-only pipeline</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Opportunities</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-200">Export CSV</button>
          <button className="btn bg-violet-600 text-white hover:bg-violet-700">Add tender</button>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-5">
        {['Search tenders', 'Stage', 'Deadline', 'Owner', 'Region'].map((label) => (
          <div key={label}>
            <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
            <input className="form-input w-full" placeholder={label} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 rounded-xl bg-white shadow-sm dark:bg-gray-800 xl:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-700/30">
                <tr>
                  <th className="px-5 py-3 text-left">Opportunity</th>
                  <th className="px-5 py-3 text-left">Stage</th>
                  <th className="px-5 py-3 text-left">Deadline</th>
                  <th className="px-5 py-3 text-left">Owner</th>
                  <th className="px-5 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm dark:divide-gray-700/60">
                {opportunities.map((opportunity) => (
                  <tr key={opportunity.id}>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{opportunity.name}</p>
                      <p className="text-xs text-gray-500">{opportunity.buyer} / {opportunity.region} / {opportunity.source}</p>
                    </td>
                    <td className="px-5 py-4"><span className={stageBadge(opportunity.stage)}>{opportunity.stage}</span></td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${deadlineBadge(opportunity.deadline, opportunity.stage)}`}>{opportunity.deadline}</span></td>
                    <td className="px-5 py-4">{opportunity.owner}</td>
                    <td className="px-5 py-4 text-right font-medium text-gray-900 dark:text-gray-100">{formatCurrency(opportunity.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="col-span-12 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800 xl:col-span-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Fast tender form</h2>
          <p className="mt-1 text-sm text-gray-500">MVP captures required tender data in one pass, with optional dates, notes, and links below.</p>
          <form className="mt-5 space-y-4">
            {['Opportunity name', 'Buyer / client', 'Estimated value', 'Submission deadline'].map((label) => (
              <div key={label}>
                <label className="mb-1 block text-sm font-medium">{label}</label>
                <input className="form-input w-full" placeholder={label} />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-sm font-medium">Current stage</label>
              <select className="form-select w-full" defaultValue="PSQ">
                {['PSQ', 'ITT', 'Presentation', 'Award', 'Won', 'Lost'].map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Notes</label>
              <textarea className="form-textarea w-full" rows={4} placeholder="Key context, clarifications, risks, and next steps" />
            </div>
            <button className="btn w-full bg-violet-600 text-white hover:bg-violet-700" type="button">Save tender</button>
          </form>
        </aside>
      </div>
    </div>
  )
}
