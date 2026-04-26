export const metadata = {
  title: 'Team - BidTrack',
  description: 'Role scaffolding for BidTrack workspaces.',
}

const members = [
  ['Priya Shah', 'Owner', 'Bid manager', 'Full workspace and billing access'],
  ['Sam Morgan', 'Editor', 'Bid writer', 'Create and update tender opportunities'],
  ['Alicia Bennett', 'Editor', 'Bid writer', 'Create and update tender opportunities'],
  ['Daniel Price', 'Viewer', 'Sales lead', 'Read dashboard, reports, and opportunities'],
]

export default function TeamPage() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Multi-seat scaffold</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">Team</h1>
        </div>
        <button className="btn bg-violet-600 text-white hover:bg-violet-700">Invite user</button>
      </div>

      <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-700/30">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Function</th>
                <th className="px-5 py-3 text-left">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm dark:divide-gray-700/60">
              {members.map(([name, role, functionName, access]) => (
                <tr key={name}>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">{name}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-200">{role}</span>
                  </td>
                  <td className="px-5 py-4">{functionName}</td>
                  <td className="px-5 py-4 text-gray-500">{access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
