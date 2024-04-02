import { CircularProgress } from "@nextui-org/react";

export default function LoadingPage() {
  return (
    <div className="flex h-[calc(100dvh-4rem)] items-center justify-center">
      <CircularProgress
        classNames={{
          svg: "w-24 h-24 drop-shadow-md",
          value: "text-3xl font-semibold text-white",
        }}
        label="Loading..."
      />
    </div>
  );
}
