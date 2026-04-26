import { opportunitiesCsv } from '@/lib/bidtrack-data'

export async function GET() {
  return new Response(opportunitiesCsv(), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="bidtrack-opportunities.csv"',
    },
  })
}
