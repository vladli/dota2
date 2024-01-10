import { AlertTriangle } from "lucide-react";

type Props = { text: string };
export default function Alert({ text }: Props) {
  return (
    <section className="my-4 flex items-center justify-between rounded-medium bg-content1 p-4">
      <div className="flex items-center gap-4 text-foreground-500">
        <AlertTriangle size={38} />
        <div className="flex flex-col">
          <span className="font-medium">{text}</span>
        </div>
      </div>
    </section>
  );
}
