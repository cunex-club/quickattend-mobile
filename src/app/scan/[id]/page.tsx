"use client";

import { useParams } from "next/navigation";

function ScanPage() {
  const { id } = useParams();
  return <div>This is scan page {id}</div>;
}

export default ScanPage;
