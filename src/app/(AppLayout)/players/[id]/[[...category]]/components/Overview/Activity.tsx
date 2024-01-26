"use client";
import { ResponsiveCalendar } from "@nivo/calendar";

import TableTitle from "./TableTitle";
type Props = {};

const data = [
  {
    value: 51,
    day: "2018-03-31",
  },
  {
    value: 331,
    day: "2015-07-15",
  },
  {
    value: 237,
    day: "2015-04-15",
  },
  {
    value: 333,
    day: "2015-12-05",
  },
  {
    value: 48,
    day: "2015-10-17",
  },
  {
    value: 53,
    day: "2017-07-08",
  },
  {
    value: 229,
    day: "2017-12-13",
  },
  {
    value: 257,
    day: "2017-01-20",
  },
  {
    value: 334,
    day: "2015-12-02",
  },
  {
    value: 91,
    day: "2015-11-09",
  },
  {
    value: 199,
    day: "2016-08-18",
  },
  {
    value: 288,
    day: "2018-07-13",
  },
  {
    value: 341,
    day: "2017-07-15",
  },
  {
    value: 370,
    day: "2015-05-09",
  },
  {
    value: 21,
    day: "2016-04-15",
  },
  {
    value: 374,
    day: "2015-09-04",
  },
  {
    value: 226,
    day: "2018-06-10",
  },
  {
    value: 389,
    day: "2016-01-04",
  },
  {
    value: 164,
    day: "2017-05-21",
  },
  {
    value: 170,
    day: "2016-01-25",
  },
  {
    value: 290,
    day: "2016-10-25",
  },
  {
    value: 79,
    day: "2016-03-04",
  },
  {
    value: 104,
    day: "2017-01-24",
  },
  {
    value: 337,
    day: "2015-06-07",
  },
  {
    value: 272,
    day: "2016-05-19",
  },
  {
    value: 267,
    day: "2017-11-20",
  },
  {
    value: 60,
    day: "2016-01-11",
  },
  {
    value: 348,
    day: "2017-11-15",
  },
  {
    value: 250,
    day: "2017-05-27",
  },
  {
    value: 377,
    day: "2018-04-04",
  },
  {
    value: 25,
    day: "2018-05-29",
  },
  {
    value: 122,
    day: "2015-09-25",
  },
  {
    value: 120,
    day: "2017-06-26",
  },
  {
    value: 316,
    day: "2018-01-04",
  },
  {
    value: 398,
    day: "2017-10-28",
  },
  {
    value: 396,
    day: "2017-08-02",
  },
  {
    value: 246,
    day: "2016-12-19",
  },
  {
    value: 283,
    day: "2015-09-12",
  },
  {
    value: 235,
    day: "2017-08-20",
  },
  {
    value: 371,
    day: "2017-02-22",
  },
  {
    value: 200,
    day: "2017-08-24",
  },
  {
    value: 379,
    day: "2018-07-08",
  },
  {
    value: 184,
    day: "2016-11-21",
  },
  {
    value: 86,
    day: "2017-12-20",
  },
  {
    value: 222,
    day: "2016-12-01",
  },
  {
    value: 192,
    day: "2017-05-25",
  },
  {
    value: 88,
    day: "2016-03-20",
  },
  {
    value: 179,
    day: "2015-09-24",
  },
  {
    value: 278,
    day: "2016-02-17",
  },
  {
    value: 178,
    day: "2015-04-09",
  },
  {
    value: 190,
    day: "2016-10-28",
  },
  {
    value: 136,
    day: "2018-05-15",
  },
  {
    value: 327,
    day: "2017-07-01",
  },
  {
    value: 36,
    day: "2015-12-22",
  },
  {
    value: 262,
    day: "2017-10-14",
  },
  {
    value: 220,
    day: "2017-11-12",
  },
  {
    value: 0,
    day: "2015-11-28",
  },
  {
    value: 393,
    day: "2015-06-02",
  },
  {
    value: 314,
    day: "2015-08-26",
  },
  {
    value: 369,
    day: "2018-01-30",
  },
  {
    value: 29,
    day: "2016-06-29",
  },
  {
    value: 232,
    day: "2017-01-07",
  },
  {
    value: 198,
    day: "2016-12-14",
  },
  {
    value: 388,
    day: "2018-02-16",
  },
  {
    value: 154,
    day: "2016-02-20",
  },
  {
    value: 63,
    day: "2015-04-06",
  },
  {
    value: 158,
    day: "2018-03-07",
  },
  {
    value: 2,
    day: "2017-06-03",
  },
  {
    value: 11,
    day: "2017-07-30",
  },
  {
    value: 181,
    day: "2018-07-10",
  },
  {
    value: 290,
    day: "2018-07-12",
  },
  {
    value: 298,
    day: "2017-01-31",
  },
  {
    value: 333,
    day: "2016-11-29",
  },
  {
    value: 288,
    day: "2017-11-07",
  },
  {
    value: 183,
    day: "2018-05-13",
  },
  {
    value: 195,
    day: "2015-11-14",
  },
  {
    value: 133,
    day: "2016-12-05",
  },
  {
    value: 89,
    day: "2016-12-02",
  },
  {
    value: 29,
    day: "2016-08-11",
  },
  {
    value: 190,
    day: "2016-02-23",
  },
  {
    value: 174,
    day: "2016-07-11",
  },
  {
    value: 173,
    day: "2015-06-04",
  },
  {
    value: 323,
    day: "2017-04-07",
  },
  {
    value: 122,
    day: "2017-09-27",
  },
  {
    value: 97,
    day: "2018-04-25",
  },
  {
    value: 325,
    day: "2018-06-07",
  },
  {
    value: 148,
    day: "2017-11-14",
  },
  {
    value: 364,
    day: "2015-07-02",
  },
  {
    value: 78,
    day: "2015-12-15",
  },
  {
    value: 293,
    day: "2017-08-13",
  },
  {
    value: 303,
    day: "2015-06-14",
  },
  {
    value: 385,
    day: "2017-02-16",
  },
  {
    value: 129,
    day: "2018-06-19",
  },
  {
    value: 73,
    day: "2016-09-03",
  },
  {
    value: 355,
    day: "2016-06-16",
  },
  {
    value: 27,
    day: "2016-03-14",
  },
  {
    value: 397,
    day: "2015-10-25",
  },
  {
    value: 207,
    day: "2017-03-10",
  },
  {
    value: 315,
    day: "2017-04-20",
  },
  {
    value: 162,
    day: "2017-11-24",
  },
  {
    value: 196,
    day: "2016-07-28",
  },
  {
    value: 219,
    day: "2017-06-27",
  },
  {
    value: 234,
    day: "2015-08-25",
  },
  {
    value: 59,
    day: "2017-07-20",
  },
  {
    value: 152,
    day: "2018-07-19",
  },
  {
    value: 384,
    day: "2018-02-06",
  },
  {
    value: 269,
    day: "2018-05-21",
  },
  {
    value: 168,
    day: "2017-03-24",
  },
  {
    value: 379,
    day: "2015-12-11",
  },
  {
    value: 143,
    day: "2016-12-11",
  },
  {
    value: 379,
    day: "2015-10-21",
  },
  {
    value: 84,
    day: "2017-11-25",
  },
  {
    value: 335,
    day: "2017-08-19",
  },
  {
    value: 60,
    day: "2015-08-31",
  },
  {
    value: 132,
    day: "2015-08-21",
  },
  {
    value: 161,
    day: "2016-04-26",
  },
  {
    value: 42,
    day: "2017-03-16",
  },
  {
    value: 267,
    day: "2018-02-09",
  },
  {
    value: 121,
    day: "2016-08-20",
  },
  {
    value: 0,
    day: "2015-05-16",
  },
  {
    value: 21,
    day: "2018-05-14",
  },
  {
    value: 73,
    day: "2015-07-19",
  },
  {
    value: 278,
    day: "2015-04-27",
  },
  {
    value: 314,
    day: "2016-02-24",
  },
  {
    value: 189,
    day: "2017-08-01",
  },
  {
    value: 396,
    day: "2017-06-25",
  },
  {
    value: 276,
    day: "2017-05-09",
  },
  {
    value: 390,
    day: "2018-02-07",
  },
  {
    value: 136,
    day: "2018-02-15",
  },
  {
    value: 385,
    day: "2015-04-21",
  },
  {
    value: 113,
    day: "2015-05-10",
  },
  {
    value: 162,
    day: "2018-07-28",
  },
  {
    value: 192,
    day: "2018-02-22",
  },
  {
    value: 343,
    day: "2017-11-18",
  },
  {
    value: 36,
    day: "2017-10-15",
  },
  {
    value: 116,
    day: "2015-11-02",
  },
  {
    value: 36,
    day: "2016-07-27",
  },
  {
    value: 32,
    day: "2017-05-20",
  },
  {
    value: 258,
    day: "2018-02-18",
  },
  {
    value: 122,
    day: "2016-01-24",
  },
  {
    value: 383,
    day: "2017-04-25",
  },
  {
    value: 73,
    day: "2017-07-21",
  },
  {
    value: 259,
    day: "2017-05-17",
  },
  {
    value: 44,
    day: "2017-05-12",
  },
  {
    value: 131,
    day: "2016-11-25",
  },
  {
    value: 234,
    day: "2018-05-10",
  },
  {
    value: 367,
    day: "2017-06-18",
  },
  {
    value: 229,
    day: "2016-09-15",
  },
  {
    value: 224,
    day: "2016-03-19",
  },
  {
    value: 75,
    day: "2017-10-20",
  },
  {
    value: 84,
    day: "2016-04-17",
  },
  {
    value: 135,
    day: "2016-08-08",
  },
  {
    value: 83,
    day: "2018-01-29",
  },
  {
    value: 219,
    day: "2017-12-06",
  },
  {
    value: 80,
    day: "2016-12-13",
  },
  {
    value: 143,
    day: "2017-01-19",
  },
  {
    value: 6,
    day: "2017-08-15",
  },
  {
    value: 75,
    day: "2016-09-24",
  },
  {
    value: 280,
    day: "2017-01-25",
  },
  {
    value: 395,
    day: "2016-06-22",
  },
  {
    value: 192,
    day: "2018-04-03",
  },
  {
    value: 300,
    day: "2018-01-12",
  },
  {
    value: 283,
    day: "2017-07-23",
  },
  {
    value: 131,
    day: "2017-01-27",
  },
  {
    value: 395,
    day: "2017-04-28",
  },
  {
    value: 166,
    day: "2016-02-02",
  },
  {
    value: 138,
    day: "2017-03-18",
  },
  {
    value: 350,
    day: "2018-05-09",
  },
  {
    value: 64,
    day: "2016-09-08",
  },
  {
    value: 102,
    day: "2018-05-23",
  },
  {
    value: 211,
    day: "2017-12-17",
  },
  {
    value: 150,
    day: "2015-04-30",
  },
  {
    value: 270,
    day: "2017-07-19",
  },
  {
    value: 63,
    day: "2017-03-21",
  },
  {
    value: 280,
    day: "2016-12-17",
  },
  {
    value: 91,
    day: "2016-09-21",
  },
  {
    value: 115,
    day: "2016-10-14",
  },
  {
    value: 128,
    day: "2017-10-31",
  },
  {
    value: 398,
    day: "2018-06-29",
  },
  {
    value: 103,
    day: "2016-03-13",
  },
  {
    value: 168,
    day: "2015-09-20",
  },
  {
    value: 386,
    day: "2016-12-06",
  },
  {
    value: 258,
    day: "2016-10-03",
  },
  {
    value: 79,
    day: "2018-07-20",
  },
  {
    value: 387,
    day: "2017-04-17",
  },
  {
    value: 351,
    day: "2018-08-10",
  },
  {
    value: 377,
    day: "2017-02-19",
  },
  {
    value: 285,
    day: "2016-11-05",
  },
  {
    value: 383,
    day: "2016-11-24",
  },
  {
    value: 144,
    day: "2016-09-01",
  },
  {
    value: 13,
    day: "2018-06-11",
  },
  {
    value: 345,
    day: "2018-07-25",
  },
  {
    value: 1,
    day: "2016-11-13",
  },
  {
    value: 28,
    day: "2016-05-22",
  },
  {
    value: 342,
    day: "2015-09-21",
  },
  {
    value: 247,
    day: "2018-03-24",
  },
  {
    value: 104,
    day: "2015-07-17",
  },
  {
    value: 393,
    day: "2016-12-08",
  },
  {
    value: 257,
    day: "2016-08-24",
  },
  {
    value: 243,
    day: "2017-12-27",
  },
  {
    value: 339,
    day: "2016-04-07",
  },
  {
    value: 296,
    day: "2018-06-26",
  },
  {
    value: 216,
    day: "2015-10-22",
  },
  {
    value: 278,
    day: "2017-12-10",
  },
  {
    value: 160,
    day: "2015-08-30",
  },
  {
    value: 327,
    day: "2018-04-01",
  },
  {
    value: 2,
    day: "2017-03-29",
  },
  {
    value: 86,
    day: "2017-01-15",
  },
  {
    value: 252,
    day: "2017-01-03",
  },
  {
    value: 170,
    day: "2015-05-06",
  },
  {
    value: 40,
    day: "2015-05-02",
  },
  {
    value: 350,
    day: "2016-04-09",
  },
  {
    value: 390,
    day: "2017-08-07",
  },
  {
    value: 78,
    day: "2017-11-16",
  },
  {
    value: 42,
    day: "2016-03-18",
  },
  {
    value: 1,
    day: "2015-08-23",
  },
  {
    value: 287,
    day: "2018-05-04",
  },
  {
    value: 154,
    day: "2016-03-12",
  },
  {
    value: 307,
    day: "2015-05-25",
  },
  {
    value: 295,
    day: "2016-08-09",
  },
  {
    value: 399,
    day: "2015-12-20",
  },
  {
    value: 365,
    day: "2017-08-10",
  },
  {
    value: 81,
    day: "2017-02-13",
  },
  {
    value: 95,
    day: "2016-01-03",
  },
  {
    value: 12,
    day: "2015-05-31",
  },
  {
    value: 47,
    day: "2015-10-28",
  },
  {
    value: 111,
    day: "2015-08-17",
  },
  {
    value: 307,
    day: "2016-08-25",
  },
  {
    value: 285,
    day: "2016-07-13",
  },
  {
    value: 240,
    day: "2017-12-29",
  },
  {
    value: 304,
    day: "2015-06-28",
  },
  {
    value: 373,
    day: "2018-02-13",
  },
  {
    value: 5,
    day: "2015-05-24",
  },
  {
    value: 308,
    day: "2015-07-29",
  },
  {
    value: 201,
    day: "2015-04-02",
  },
  {
    value: 51,
    day: "2016-10-17",
  },
  {
    value: 257,
    day: "2016-08-07",
  },
  {
    value: 194,
    day: "2016-12-24",
  },
  {
    value: 207,
    day: "2018-01-08",
  },
  {
    value: 247,
    day: "2017-10-12",
  },
  {
    value: 43,
    day: "2018-04-19",
  },
  {
    value: 373,
    day: "2017-11-04",
  },
  {
    value: 11,
    day: "2016-09-10",
  },
  {
    value: 353,
    day: "2018-07-02",
  },
  {
    value: 295,
    day: "2015-10-27",
  },
  {
    value: 255,
    day: "2015-11-06",
  },
  {
    value: 282,
    day: "2017-02-09",
  },
  {
    value: 215,
    day: "2016-04-29",
  },
  {
    value: 11,
    day: "2015-12-12",
  },
  {
    value: 117,
    day: "2015-05-12",
  },
  {
    value: 119,
    day: "2017-09-21",
  },
  {
    value: 342,
    day: "2016-01-22",
  },
  {
    value: 69,
    day: "2018-01-07",
  },
  {
    value: 395,
    day: "2015-10-06",
  },
  {
    value: 21,
    day: "2016-11-30",
  },
  {
    value: 37,
    day: "2016-01-21",
  },
  {
    value: 58,
    day: "2017-10-22",
  },
  {
    value: 253,
    day: "2018-01-21",
  },
  {
    value: 69,
    day: "2015-11-27",
  },
  {
    value: 282,
    day: "2016-05-18",
  },
  {
    value: 269,
    day: "2016-06-28",
  },
];

export default function Activity({}: Props) {
  return (
    <div className="flex grow flex-col gap-2 rounded-large bg-content1 p-4">
      <TableTitle>DotaPlus Top Heroes</TableTitle>
      <div className="flex size-96 flex-wrap justify-around gap-2">
        <ResponsiveCalendar
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          data={data}
          dayBorderColor="#ffffff"
          dayBorderWidth={2}
          emptyColor="#eeeeee"
          from="2015-03-01"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          monthBorderColor="#ffffff"
          to="2016-07-12"
          yearSpacing={40}
        />
      </div>
    </div>
  );
}
