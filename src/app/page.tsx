"use client";

import { Suspense } from "react";
import PageInner from "./PageInner";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <PageInner />
    </Suspense>
  );
}
