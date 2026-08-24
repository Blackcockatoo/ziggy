import type { Metadata } from "next";
import { RecordRoom } from "./record-room";

export const metadata: Metadata = {
  title: "ZIGGIE — The Gentleman Behind the Curtain",
  description:
    "A hidden working album room: thirteen songs, thirteen sleeves, lyrics, marginalia and the Old Vic State turning quietly behind the curtain.",
  robots: { index: false, follow: false },
};

export default function RecordRoomPage() {
  return <RecordRoom />;
}
