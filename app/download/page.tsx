"use client";

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

// box-shadow: 5px 5px 15px 5px rgba(16, 237, 123, 0.753);