export async function POST() {
  return Response.json({
    status: 'not_configured',
    message: 'Stripe Checkout is scaffolded. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID, then create a Checkout Session here.',
  }, { status: 501 })
}
