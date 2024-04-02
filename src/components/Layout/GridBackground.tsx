type Props = {
  children: React.ReactNode;
};

export default function GridBackground({ children }: Props) {
  return (
    <div className="w-full bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
