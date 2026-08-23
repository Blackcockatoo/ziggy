import type { Metadata } from "next";
import { ArchiveExperience } from "./archive-experience";

export const metadata: Metadata = {
  title: "Ziggy — The Working Archive",
  description:
    "A living Frankston archive: exhibition, evidence, visual language, object studies and the working conversation behind Ziggy.",
};

export default function ArchivePage() {
  return <ArchiveExperience />;
}
