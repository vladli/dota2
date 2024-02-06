import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  header: string | React.ReactNode;
  value: string | number | React.ReactNode | null | undefined;
};
export default function HeaderValue({ className, header, value }: Props) {
  return (
    <section
      className={cn(
        "flex w-fit rounded-large border border-divider",
        className
      )}
    >
      <div className="rounded-l-large bg-content1 p-2">{header}</div>
      <div className="rounded-r-large bg-content2 p-2">{value}</div>
    </section>
  );
}
