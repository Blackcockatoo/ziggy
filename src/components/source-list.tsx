import type { Source } from "@/content/types";

/**
 * Renders the citations behind one evidence record.
 *
 * Sources without a URL are real too — a shoebox of receipts is a source. They
 * render as plain text rather than as a dead link.
 */
export function SourceList({
  sourceIds,
  sources,
  label = "Sources",
}: {
  sourceIds?: string[];
  sources: Source[];
  label?: string;
}) {
  if (!sourceIds?.length) return null;

  const byId = new Map(sources.map((source) => [source.id, source]));
  const resolved = sourceIds
    .map((id) => byId.get(id))
    .filter((source): source is Source => Boolean(source));

  if (resolved.length === 0) return null;

  return (
    <ul className="source-links" aria-label={label}>
      {resolved.map((source) => (
        <li key={source.id}>
          {source.url ? (
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.publisher}: {source.label}
            </a>
          ) : (
            <span>
              {source.publisher}: {source.label}
            </span>
          )}
          {source.retrievedOn ? (
            <span className="source-links__retrieved"> · retrieved {source.retrievedOn}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
