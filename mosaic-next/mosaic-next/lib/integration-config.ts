export const integrationConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    priceId: process.env.STRIPE_PRICE_ID,
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
}

export function isIntegrationConfigured(name: keyof typeof integrationConfig) {
  return Object.values(integrationConfig[name]).every(Boolean)
}
