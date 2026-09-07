import type { ReactNode } from "react";

// standard page wrapper - full height, centred, with page padding
export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">{children}</div>
  );
}
