"use client";

import { Button } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

type Props = {
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <div className="flex gap-4">
        <Button as={Link} color="primary" href="/">
          Main Page
        </Button>
        <Button isIconOnly onClick={() => reset()} variant="bordered">
          <RotateCcw />
        </Button>
      </div>
    </main>
  );
}
