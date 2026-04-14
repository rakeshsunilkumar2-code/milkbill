"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Inputs() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name") || "";
  const month = params.get("month") || "";
  const defaultMilk = parseFloat(params.get("defaultMilk") || "0");

  const [milkData, setMilkData] = useState<number[]>([]);

  useEffect(() => {
    if (month) {
      const [year, m] = month.split("-");
      const days = new Date(Number(year), Number(m), 0).getDate();

      setMilkData(Array(days).fill(defaultMilk));
    }
  }, [month, defaultMilk]);

  const handleChange = (index: number, value: string) => {
    const newData = [...milkData];
    newData[index] = parseFloat(value) || 0;
    setMilkData(newData);
  };

  const handleNext = () => {
    router.push(
      `/summary?name=${name}&month=${month}&data=${encodeURIComponent(
        JSON.stringify(milkData)
      )}`
    );
  };

  const getSuffix = (d: number) => {
    if (d % 10 === 1 && d !== 11) return "st";
    if (d % 10 === 2 && d !== 12) return "nd";
    if (d % 10 === 3 && d !== 13) return "rd";
    return "th";
  };

  const half = Math.ceil(milkData.length / 2);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Enter Daily Milk
      </h2>

      <div className="grid">

        {/* LEFT SIDE */}
        <div>
          {milkData.slice(0, half).map((val, i) => {
            const day = i + 1;

            return (
              <div className="card" key={i}>
                <label>
                  Day {day}
                  {getSuffix(day)}
                </label>

                <input
                  type="number"
                  value={val}
                  onChange={(e) =>
                    handleChange(i, e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div>
          {milkData.slice(half).map((val, i) => {
            const day = i + half + 1;

            return (
              <div className="card" key={i}>
                <label>
                  Day {day}
                  {getSuffix(day)}
                </label>

                <input
                  type="number"
                  value={val}
                  onChange={(e) =>
                    handleChange(i + half, e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>

      </div>

      <button className="nextBtn" onClick={handleNext}>
        Calculate Total
      </button>
    </div>
  );
}