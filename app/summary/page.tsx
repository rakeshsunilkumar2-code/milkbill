"use client";

import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Summary() {
  const params = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const name = params.get("name") || "";
  const month = params.get("month") || "";
  const data: number[] = JSON.parse(
    decodeURIComponent(params.get("data") || "[]")
  );

  const totalMilk = data.reduce((a, b) => a + b, 0);
  const totalAmount = totalMilk * 70;

  const half = Math.ceil(data.length / 2);

  const download = async () => {
    if (!ref.current) return;

    const qr = document.getElementById("qrImage") as HTMLImageElement;

    if (qr && !qr.complete) {
      await new Promise((res) => {
        qr.onload = res;
        qr.onerror = res;
      });
    }

    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "milk_bill.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  };

  return (
    <div className="container">
      <div ref={ref} style={{ background: "white", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Milk Bill</h2>

        <p><strong>Name:</strong> {name}</p>
        <p><strong>Month:</strong> {month}</p>

        <hr />

        <div className="row">
          <div className="col">
            {data.slice(0, half).map((d, i) => (
              <p key={i}>Day {i + 1}: {d} L</p>
            ))}
          </div>

          <div className="col">
            {data.slice(half).map((d, i) => (
              <p key={i}>Day {i + half + 1}: {d} L</p>
            ))}
          </div>
        </div>

        <hr />

        <p>Total Milk: {totalMilk.toFixed(2)} L</p>
        <p>Rate: ₹70/L</p>
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

        <h3 style={{ textAlign: "center" }}>
          {name.toUpperCase()} HAS TO PAY ₹{totalAmount.toFixed(2)}
        </h3>

        <div style={{ textAlign: "center" }}>
          <h4>Scan to Pay</h4>
          <img
            id="qrImage"
            src="/qr.png"
            alt="QR"
            style={{ width: "150px" }}
          />
        </div>
      </div>

      <button onClick={download}>
        Download JPG
      </button>
    </div>
  );
}