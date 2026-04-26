export type OpportunityStage = 'PSQ' | 'ITT' | 'Presentation' | 'Award' | 'Won' | 'Lost'

export type Opportunity = {
  id: string
  name: string
  buyer: string
  source: string
  region: string
  sector: string
  value: number
  deadline: string
  stage: OpportunityStage
  owner: string
  bidDecision: 'Bid' | 'No bid' | 'Pending'
  psqDate?: string
  ittDate?: string
  presentationDate?: string
  awardDate?: string
  outcomeDate?: string
  links: string[]
  notes: string
  updatedAt: string
}

export const opportunities: Opportunity[] = [
  {
    id: 'opp-001',
    name: 'Facilities management framework',
    buyer: 'Northshire Council',
    source: 'Find a Tender',
    region: 'North West',
    sector: 'Facilities',
    value: 420000,
    deadline: '2026-05-01',
    stage: 'ITT',
    owner: 'Priya Shah',
    bidDecision: 'Bid',
    psqDate: '2026-04-04',
    ittDate: '2026-04-13',
    links: ['https://www.find-tender.service.gov.uk/'],
    notes: 'Clarifications due before final method statement review.',
    updatedAt: '2026-04-25',
  },
  {
    id: 'opp-002',
    name: 'Digital inclusion training tender',
    buyer: 'South Coast Housing',
    source: 'Contracts Finder',
    region: 'South East',
    sector: 'Training',
    value: 185000,
    deadline: '2026-04-28',
    stage: 'Presentation',
    owner: 'Sam Morgan',
    bidDecision: 'Bid',
    psqDate: '2026-03-21',
    ittDate: '2026-04-01',
    presentationDate: '2026-04-27',
    links: ['https://www.contractsfinder.service.gov.uk/'],
    notes: 'Presentation deck needs final pricing slide.',
    updatedAt: '2026-04-24',
  },
  {
    id: 'opp-003',
    name: 'Grounds maintenance DPS call-off',
    buyer: 'East Mercia NHS Trust',
    source: 'Atamis',
    region: 'Midlands',
    sector: 'Grounds',
    value: 96000,
    deadline: '2026-05-15',
    stage: 'PSQ',
    owner: 'Alicia Bennett',
    bidDecision: 'Pending',
    psqDate: '2026-05-03',
    links: ['https://health-family.force.com/s/Welcome'],
    notes: 'Awaiting go/no-go after resource check.',
    updatedAt: '2026-04-22',
  },
  {
    id: 'opp-004',
    name: 'Managed IT support contract',
    buyer: 'River Borough Council',
    source: 'Delta eSourcing',
    region: 'London',
    sector: 'IT Services',
    value: 735000,
    deadline: '2026-06-03',
    stage: 'Award',
    owner: 'Priya Shah',
    bidDecision: 'Bid',
    awardDate: '2026-05-28',
    links: ['https://www.delta-esourcing.com/'],
    notes: 'Submitted; evaluation clarification answered.',
    updatedAt: '2026-04-19',
  },
  {
    id: 'opp-005',
    name: 'Community transport service',
    buyer: 'Westvale Combined Authority',
    source: 'ProContract',
    region: 'Yorkshire',
    sector: 'Transport',
    value: 310000,
    deadline: '2026-03-17',
    stage: 'Won',
    owner: 'Sam Morgan',
    bidDecision: 'Bid',
    outcomeDate: '2026-04-08',
    links: ['https://procontract.due-north.com/'],
    notes: 'Won pending mobilisation call.',
    updatedAt: '2026-04-08',
  },
  {
    id: 'opp-006',
    name: 'Energy efficiency retrofit programme',
    buyer: 'Highland Homes',
    source: 'In-tend',
    region: 'Scotland',
    sector: 'Construction',
    value: 540000,
    deadline: '2026-02-20',
    stage: 'Lost',
    owner: 'Alicia Bennett',
    bidDecision: 'Bid',
    outcomeDate: '2026-03-18',
    links: ['https://in-tendhost.co.uk/'],
    notes: 'Lost on quality score; useful lessons for social value answer.',
    updatedAt: '2026-03-18',
  },
]

export const liveStages: OpportunityStage[] = ['PSQ', 'ITT', 'Presentation', 'Award']

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function daysUntil(date: string) {
  const today = new Date('2026-04-26T00:00:00Z')
  const target = new Date(`${date}T00:00:00Z`)
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000)
}

export function stageBadge(stage: OpportunityStage) {
  const classes: Record<OpportunityStage, string> = {
    PSQ: 'bg-violet-50 text-violet-700 ring-violet-200',
    ITT: 'bg-sky-50 text-sky-700 ring-sky-200',
    Presentation: 'bg-yellow-50 text-yellow-800 ring-yellow-200',
    Award: 'bg-violet-50 text-violet-700 ring-violet-200',
    Won: 'bg-green-50 text-green-700 ring-green-200',
    Lost: 'bg-gray-100 text-gray-600 ring-gray-200',
  }

  return `inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${classes[stage]}`
}

export function deadlineBadge(deadline: string, stage: OpportunityStage) {
  if (!liveStages.includes(stage)) return 'bg-gray-100 text-gray-600 ring-gray-200'
  const days = daysUntil(deadline)
  if (days < 0) return 'bg-red-50 text-red-700 ring-red-200'
  if (days <= 3) return 'bg-yellow-50 text-yellow-800 ring-yellow-200'
  if (days <= 7) return 'bg-violet-50 text-violet-700 ring-violet-200'
  return 'bg-gray-100 text-gray-600 ring-gray-200'
}

export const liveOpportunities = opportunities.filter((opportunity) => liveStages.includes(opportunity.stage))

export const metrics = {
  liveCount: liveOpportunities.length,
  dueSevenDays: liveOpportunities.filter((opportunity) => {
    const days = daysUntil(opportunity.deadline)
    return days >= 0 && days <= 7
  }).length,
  dueThisMonth: liveOpportunities.filter((opportunity) => opportunity.deadline.startsWith('2026-04')).length,
  overdue: liveOpportunities.filter((opportunity) => daysUntil(opportunity.deadline) < 0).length,
  liveValue: liveOpportunities.reduce((sum, opportunity) => sum + opportunity.value, 0),
  wonValue: opportunities.filter((opportunity) => opportunity.stage === 'Won').reduce((sum, opportunity) => sum + opportunity.value, 0),
  lostValue: opportunities.filter((opportunity) => opportunity.stage === 'Lost').reduce((sum, opportunity) => sum + opportunity.value, 0),
}

export function opportunitiesCsv() {
  const headers = ['Name', 'Buyer', 'Source', 'Region', 'Sector', 'Value', 'Deadline', 'Stage', 'Owner', 'Bid decision', 'Notes']
  const rows = opportunities.map((opportunity) => [
    opportunity.name,
    opportunity.buyer,
    opportunity.source,
    opportunity.region,
    opportunity.sector,
    String(opportunity.value),
    opportunity.deadline,
    opportunity.stage,
    opportunity.owner,
    opportunity.bidDecision,
    opportunity.notes,
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
    .join('\n')
}
