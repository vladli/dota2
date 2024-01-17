import { Image } from "@nextui-org/react";

type Props = {
  rank: number;
  width?: number;
};
export default function RankImage({ rank, width = 40 }: Props) {
  const rankBadge = rank?.toString()[0];
  const rankStar = rank?.toString()[1];
  if (!rank || Number(rankStar) > 5)
    return (
      <Image
        alt="rankStar"
        draggable={false}
        src={`/img/ranks/0.png`}
        width={width}
      />
    );
  return (
    <>
      {+rankStar !== 0 ? (
        <Image
          alt="rankStar"
          className="absolute -top-1"
          draggable={false}
          src={`/img/ranks/rank_star_${rankStar}.png`}
          width={width}
        />
      ) : null}
      <Image
        alt="rank"
        draggable={false}
        src={`/img/ranks/${rankBadge}.png`}
        width={width}
      />
    </>
  );
}
