import { Progress } from "@heroui/react";

import Container from "@/components/Container";
import { GetPlayerActivityStatsQuery } from "@/graphql/player";
import dayjs from "@/lib/dayjs";

type Props = {
  data: GetPlayerActivityStatsQuery | null;
};
export default function HeaderCard({ data }: Props) {
  const player = data?.player;
  return (
    <div className="flex w-full gap-1 text-medium font-medium">
      <Container className="w-1/2">
        <div className="flex flex-col bg-content1 md:flex-row md:justify-between">
          <p>
            <span>{player?.matchCount}</span> matches
          </p>
          <p>
            First Match:{" "}
            {dayjs(player?.firstMatchDate * 1000).format("MMMM D, YYYY")}
          </p>
        </div>

        <Progress aria-label="Matches" value={100} />
      </Container>
      <Container className="w-1/2">
        Win Rate:{" "}
        {(((player?.winCount || 0) / (player?.matchCount || 0)) * 100).toFixed(
          1,
        )}
        %
        <Progress
          aria-label="Win Rate"
          color="success"
          value={((player?.winCount || 0) / (player?.matchCount || 0)) * 100}
        />
      </Container>
    </div>
  );
}
