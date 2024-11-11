import { MockPage } from "@/features/mock/MockPage";
import { Suspense } from "react";

export default function Mock() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MockPage />
    </Suspense>
  );
}
