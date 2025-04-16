import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex size-full justify-center">
      <Spinner color="primary" label="Loading..." />
    </div>
  );
}
