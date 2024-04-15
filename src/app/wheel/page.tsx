import React, { Suspense } from "react";
import App from "../../components/App";
import LoadingWheel from "@/components/LoadingWheel";

export default function Page() {
  return (
    <Suspense fallback={<LoadingWheel />}>
      <App />
    </Suspense>
  );
}
