"use client";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { icons } from "lucide-react";

import SVGTooltip from "@/components/SVGTooltip";
import { GetMatchByIdQuery } from "@/graphql/mathch";

type Props = { data: GetMatchByIdQuery };

type Coordinates = {
  x: number;
  y: number;
  name: string;
  isMiddle?: boolean;
};

function attachStatusToCoordinates(coordinates: Coordinates[], status: number) {
  const binaryStatus = (status >>> 0).toString(2);
  return coordinates.map((coord, index) => {
    return {
      x: coord.x,
      y: coord.y,
      name: coord.name,
      isMiddle: coord.isMiddle,
      status: binaryStatus.charAt(binaryStatus.length - 1 - index) === "1",
    };
  });
}

const radiantBarracks: Coordinates[] = [
  { x: 18, y: 181, name: "Radiant Top Ranged Barracks" },
  { x: 26, y: 181, name: "Radiant Top Melee Barracks" },
  { x: 46, y: 187, name: "Radiant Middle Ranged Barracks", isMiddle: true },
  { x: 52, y: 192, name: "Radiant Middle Melee Barracks", isMiddle: true },
  { x: 58, y: 212, name: "Radiant Bottom Ranged Barracks" },
  { x: 58, y: 220, name: "Radiant Bottom Melee Barracks" },
];

const radiantTowers: Coordinates[] = [
  { x: 25, y: 93, name: "Radiant Top T1" },
  { x: 25, y: 135, name: "Radiant Top T2" },
  { x: 21, y: 174, name: "Radiant Top T3" },
  { x: 98, y: 143, name: "Radiant Middle T1", isMiddle: true },
  { x: 71, y: 164, name: "Radiant Middle T2", isMiddle: true },
  { x: 51, y: 184, name: "Radiant Middle T3", isMiddle: true },
  { x: 197, y: 214, name: "Radiant Bottom T1" },
  { x: 116, y: 217, name: "Radiant Bottom T2" },
  { x: 62, y: 215, name: "Radiant Bottom T3" },
  { x: 34, y: 195, name: "Radiant T4", isMiddle: true },
  { x: 40, y: 201, name: "Radiant T4", isMiddle: true },
];

const direBarracks: Coordinates[] = [
  { x: 183, y: 31, name: "Dire Top Ranged Barracks" },
  { x: 183, y: 39, name: "Dire Top Melee Barracks" },
  { x: 189, y: 58, name: "Dire Middle Ranged Barracks", isMiddle: true },
  { x: 195, y: 64, name: "Dire Middle Melee Barracks", isMiddle: true },
  { x: 215, y: 71, name: "Dire Bottom Ranged Barracks" },
  { x: 224, y: 71, name: "Dire Bottom Melee Barracks" },
];

const direTowers: Coordinates[] = [
  { x: 50, y: 29, name: "Dire Top T1" },
  { x: 120, y: 29, name: "Dire Top T2" },
  { x: 176, y: 33, name: "Dire Top T3" },
  { x: 130, y: 111, name: "Dire Middle T1", isMiddle: true },
  { x: 160, y: 89, name: "Dire Middle T2", isMiddle: true },
  { x: 187, y: 64, name: "Dire Middle T3", isMiddle: true },
  { x: 218, y: 156, name: "Dire Bottom T1" },
  { x: 220, y: 116, name: "Dire Bottom T2" },
  { x: 218, y: 76, name: "Dire Bottom T3" },
  { x: 196, y: 48, name: "Dire T4", isMiddle: true },
  { x: 202, y: 53, name: "Dire T4", isMiddle: true },
];

const radiantColor = "#16a34a";
const direColor = "#ef4444";
const destroyedColor = "#666";
const strokeColor = "#000";

export default function MatchMap({ data }: Props) {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const radiantBarracksStatus = attachStatusToCoordinates(
    radiantBarracks,
    data.match?.barracksStatusRadiant
  );
  const radiantTowerStatus = attachStatusToCoordinates(
    radiantTowers,
    data.match?.towerStatusRadiant!
  );
  const direBarracksStatus = attachStatusToCoordinates(
    direBarracks,
    data.match?.barracksStatusDire
  );
  const direTowerStatus = attachStatusToCoordinates(
    direTowers,
    data.match?.towerStatusDire!
  );
  const showTooltip = (event: MouseEvent<any>, content: string) => {
    if (isTooltipVisible) return;
    setTimeout(() => {
      setTooltipContent(content);
      setTooltipVisible(true);
      setPosition({ x: event.pageX, y: event.pageY });
    }, 200);
  };
  const hideTooltip = () => {
    setTooltipVisible(false);
  };
  return (
    <section className="my-auto bg-content1 ">
      <div onClick={hideTooltip}>
        {isTooltipVisible ? (
          <SVGTooltip
            content={tooltipContent}
            position={position}
          />
        ) : null}
        <svg
          height={300}
          viewBox="0 0 255 255"
          width={300}
        >
          <rect
            fill="hsla(0,0%,100%,0.03)"
            height={255}
            width={255}
          />
          <g opacity={0.4}>
            <image
              height={255}
              href="/img/other/minimap.png"
              width={255}
            />
          </g>
          {radiantBarracksStatus.map(({ x, y, status, name, isMiddle }, i) => (
            <Icon
              fill={status ? radiantColor : destroyedColor}
              key={i}
              name={!isMiddle ? "Square" : "Diamond"}
              onMouseLeave={hideTooltip}
              onMouseOver={(e) => showTooltip(e, name)}
              x={x}
              y={y}
            />
          ))}
          {direBarracksStatus.map(({ x, y, status, name, isMiddle }, i) => (
            <Icon
              fill={status ? direColor : destroyedColor}
              key={i}
              name={!isMiddle ? "Square" : "Diamond"}
              onMouseLeave={hideTooltip}
              onMouseOver={(e) => showTooltip(e, name)}
              x={x}
              y={y}
            />
          ))}
          {radiantTowerStatus.map(({ x, y, status, name, isMiddle }, i) => (
            <Icon
              fill={status ? radiantColor : destroyedColor}
              key={i}
              name={!isMiddle ? "Square" : "Diamond"}
              onMouseLeave={hideTooltip}
              onMouseOver={(e) => showTooltip(e, name)}
              size={10}
              x={x}
              y={y}
            />
          ))}
          {direTowerStatus.map(({ x, y, status, name, isMiddle }, i) => (
            <Icon
              fill={status ? direColor : destroyedColor}
              key={i}
              name={!isMiddle ? "Square" : "Diamond"}
              onMouseLeave={hideTooltip}
              onMouseOver={(e) => showTooltip(e, name)}
              size={10}
              x={x}
              y={y}
            />
          ))}
          <Icon
            color={data.match?.didRadiantWin ? radiantColor : destroyedColor}
            fill={data.match?.didRadiantWin ? radiantColor : destroyedColor}
            name="Pyramid"
            onMouseLeave={hideTooltip}
            onMouseOver={(e) => showTooltip(e, "Radiant Ancient")}
            size={16}
            x={25}
            y={202}
          />
          <Icon
            color={!data.match?.didRadiantWin ? direColor : destroyedColor}
            fill={!data.match?.didRadiantWin ? direColor : destroyedColor}
            name="Pyramid"
            onMouseLeave={hideTooltip}
            onMouseOver={(e) => showTooltip(e, "Dire Ancient")}
            size={16}
            x={204}
            y={38}
          />
        </svg>
      </div>
    </section>
  );
}

type IconProps = {
  name: string;
  color?: string;
  size?: number;
  fill?: string;
  x: number;
  y: number;
  onMouseOver: MouseEventHandler<any>;
  [key: string]: any;
};
const Icon = ({
  name,
  color,
  size,
  fill,
  x,
  y,
  onMouseOver,
  ...rest
}: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return (
    <LucideIcon
      color={color || strokeColor}
      fill={fill}
      onMouseOver={onMouseOver}
      size={size || 8}
      x={x}
      y={y}
      {...rest}
    />
  );
};
