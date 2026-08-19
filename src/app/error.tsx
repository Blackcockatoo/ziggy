"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="utility-page">
      <p className="eyebrow">The machine rattled</p>
      <h1>Something went wrong behind the counter.</h1>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
