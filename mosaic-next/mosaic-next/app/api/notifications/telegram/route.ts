export async function POST() {
  return Response.json({
    status: 'not_configured',
    message: 'Telegram reminder endpoint scaffolded. Add TELEGRAM_BOT_TOKEN and persist chat IDs before sending live reminders.',
  }, { status: 501 })
}
