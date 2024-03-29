type Props = {
  children: React.ReactNode;
};

export default function TableTitle({ children }: Props) {
  return <h3 className="mb-1 p-2 font-medium">{children}</h3>;
}
