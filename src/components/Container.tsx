import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function Container({ className, children }: Props) {
  return (
    <div className={cn("rounded-large p-4 bg-content1", className)}>
      {children}
    </div>
  );
}
