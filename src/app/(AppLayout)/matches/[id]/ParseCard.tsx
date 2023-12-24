"use client";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";

type Props = {
  matchId: number;
};

const PARSE_MATCH = gql`
  mutation ParseMatch($id: Long!) {
    retryMatchDownload(matchId: $id)
  }
`;

export default function ParseCard({ matchId }: Props) {
  const [parseMatch] = useMutation(PARSE_MATCH);
  const handleClick = () => {
    toast.success(
      `Match #${matchId} is being parsed. Check back in a few minutes.`
    );
    parseMatch({ variables: { id: matchId } });
  };
  return (
    <section className="mt-4 flex items-center justify-between rounded-medium bg-content1 p-4">
      <div className="flex items-center gap-4">
        <IoWarning
          className="text-danger"
          size="2.2rem"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Not parsed</h1>
          <span className="font-medium">
            This match is not parsed. To view full statistics, please parse it.
          </span>
        </div>
      </div>
      <Button
        color="primary"
        onClick={handleClick}
      >
        Parse
      </Button>
    </section>
  );
}
