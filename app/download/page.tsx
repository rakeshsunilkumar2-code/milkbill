"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function Download() {
  const params = useSearchParams();
  const img = params.get("img");

  return (
    <div
      style={{
        textAlign: "center",
        background: "white",
        height: "100vh",
      }}
    >
      <h2>Downloaded Image</h2>
      {img && <img src={img} style={{ maxWidth: "100%" }} />}
    </div>
  );
}