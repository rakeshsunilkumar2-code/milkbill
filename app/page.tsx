"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [defaultMilk, setDefaultMilk] = useState("");

  const handleNext = () => {
    if (!name || !month || !defaultMilk) {
      alert("Fill all fields");
      return;
    }

    router.push(
      `/inputs?name=${name}&month=${month}&defaultMilk=${defaultMilk}`
    );
  };

  return (
    <div className="container">
      <h1>Milk Bill Generator</h1>

      <h3>Enter Name</h3>
      <input
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <h3>Select Month</h3>
      <input
        type="month"
        onChange={(e) => setMonth(e.target.value)}
      />


      <h3>Enter The Milk</h3>
      <input
        type="number"
        placeholder="Default Milk (Liters)"
        onChange={(e) => setDefaultMilk(e.target.value)}
      />


     
      <button onClick={handleNext}>
        Generate Milk Inputs
      </button>
    </div>
  );
}