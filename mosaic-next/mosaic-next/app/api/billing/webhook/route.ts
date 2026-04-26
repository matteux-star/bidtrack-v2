export async function POST() {
  return Response.json({
    status: 'not_configured',
    message: 'Stripe webhook endpoint scaffolded. Verify signatures and sync subscription state when Stripe credentials are configured.',
  }, { status: 501 })
}
