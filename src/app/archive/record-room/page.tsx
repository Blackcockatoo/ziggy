import type { Metadata } from "next";
import { RecordRoom } from "./record-room";

export const metadata: Metadata = {
  title: "ZIGGIE — The Optional Record Room",
  description:
    "A hidden, optional album room: thirteen songs, thirteen sleeves, lyrics, marginalia and the Old Vic State turning quietly behind the curtain. Curiosity only; nothing here needs approval or action.",
  robots: { index: false, follow: false },
};

export default function RecordRoomPage() {
  return <RecordRoom />;
}
