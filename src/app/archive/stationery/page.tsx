import type { Metadata } from "next";
import { StationeryCupboard } from "./stationery-cupboard";

export const metadata: Metadata = {
  title: "Ziggy - The Optional Stationery Cupboard",
  description:
    "An optional cupboard of fictional Old Vic State stationery and Ziggy paper experiments — made for fun and practical play, not as an owner task or official business system.",
};

export default function StationeryPage() {
  return <StationeryCupboard />;
}
