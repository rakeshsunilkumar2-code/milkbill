"use client";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-wrapper">
      {children}
    </div>
  );
}