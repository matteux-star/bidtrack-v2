import Link from 'next/link'

export default function Logo() {
  return (
    <Link className="flex items-center gap-2" href="/">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white shadow-sm shadow-violet-600/20">
        B
      </span>
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
        BidTrack
      </span>
    </Link>
  )
}
