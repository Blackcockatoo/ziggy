import type { Metadata } from "next";
import { StationeryCupboard } from "./stationery-cupboard";

export const metadata: Metadata = {
  title: "Ziggy - The Stationery Cupboard",
  description:
    "Browse and download the regal, practical Old Vic State stationery suite for Ziggy and The Monkey Shop, Frankston.",
};

export default function StationeryPage() {
  return <StationeryCupboard />;
}
