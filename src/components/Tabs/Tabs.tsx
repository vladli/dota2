import { Tabs as NextTabs, TabsProps } from "@heroui/react";

type Props = {
  children: React.ReactNode;
  className?: string;
} & TabsProps;
export default function Tabs({ children, className, ...rest }: Props) {
  return (
    <NextTabs
      className={className}
      classNames={{
        base: "overflow-x-auto block",
        tabList: "bg-content1/40 border border-divider",
        cursor: "group-data-[selected=true]:bg-content2",
        tab: "max-w-fit",
      }}
      {...rest}
    >
      {children}
    </NextTabs>
  );
}
