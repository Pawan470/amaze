import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center text-center">
      <div>
        <h2>Not Page Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}
