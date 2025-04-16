"use client";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorCard() {
  const router = useRouter();
  return (
    <Card className="min-w-fit max-w-28 p-4">
      <CardHeader className="justify-center">
        <EyeOff />
      </CardHeader>
      <CardBody className="flex-col gap-4 font-medium">
        <p>This is a private profile</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </CardBody>
    </Card>
  );
}
