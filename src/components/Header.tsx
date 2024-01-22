import Image from "next/image";

type Props = {
  children: React.ReactNode;
  backgroundImg?: string;
};
export default function Header({ children, backgroundImg }: Props) {
  return (
    <div className="relative">
      {backgroundImg ? (
        <div className="absolute -z-10 size-full overflow-hidden">
          <Image
            alt=""
            className="object-cover blur-[100px]"
            fill
            src={backgroundImg}
            unoptimized
          />
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </div>
  );
}
