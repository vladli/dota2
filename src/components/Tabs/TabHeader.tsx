type Props = {
  text: string;
  icon: any;
};
export default function TabHeader({ text, icon: Icon }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Icon size={18} />
      <span>{text}</span>
    </div>
  );
}
