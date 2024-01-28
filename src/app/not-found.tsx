import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3">
      <Image
        alt="404"
        height={400}
        src="/img/404.png"
        width={400}
      />
      <Button
        as={Link}
        href="/"
        variant="ghost"
      >
        Return Home
      </Button>
    </main>
  );
}
