import Link from "next/link";

export default function NotFound() {
  return (
    <main className="utility-page">
      <p className="eyebrow">Wrong turn</p>
      <h1>This room is not in the exhibition.</h1>
      <Link href="/">Return to the front window</Link>
    </main>
  );
}
