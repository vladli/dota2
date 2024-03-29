import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  defaultSorting?: SortingState;
  showCount?: boolean;
};
export default function Table<T extends object>({
  data,
  columns,
  defaultSorting,
  showCount = false,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting || []);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableSortingRemoval: false,
    sortDescFirst: true,
  });
  const getLeftStickyPos = (index: number) => {
    if (!index) return 0;

    const prevColumnsTotalWidth = columns
      .slice(0, index)
      .reduce((curr, column) => {
        return curr + (column.size || 150);
      }, 0);
    return prevColumnsTotalWidth;
  };
  return (
    <div className="overflow-x-auto rounded-large border border-divider bg-black scrollbar-thin scrollbar-thumb-content2">
      <table className="w-full text-left">
        <thead className="whitespace-nowrap bg-content1 text-tiny uppercase text-foreground-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {showCount && (
                <th
                  className="px-4 py-3 text-center"
                  style={{ width: `5px` }}
                >
                  #
                </th>
              )}

              {headerGroup.headers.map((header, i) => (
                <th
                  className={cn("px-4 py-3", {
                    "sticky bg-content1 z-10":
                      header.column.columnDef.meta?.isSticky,
                  })}
                  colSpan={header.colSpan}
                  key={header.id}
                  style={{
                    minWidth: `${header.column.columnDef.minSize}px`,
                    maxWidth: `${header.column.columnDef.maxSize}px`,
                    width: `${header.getSize()}px`,
                    left: getLeftStickyPos(i),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex gap-1 items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() &&
                        !header.column.getIsSorted() && (
                          <ArrowDownUp size={16} />
                        )}
                      {{
                        asc: <ArrowUpWideNarrow size={16} />,
                        desc: <ArrowDownWideNarrow size={16} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              className={cn("border-content2", {
                "border-b": index !== table.getRowModel().rows.length - 1,
              })}
              key={row.id}
            >
              {showCount && (
                <td
                  className="px-4 py-3 text-center"
                  style={{
                    width: `5px`,
                    maxWidth: `5px`,
                  }}
                >
                  {index + 1}
                </td>
              )}

              {row.getVisibleCells().map((cell, i) => (
                <td
                  className={cn("px-4 py-2", {
                    "sticky bg-black z-10":
                      cell.column.columnDef.meta?.isSticky,
                  })}
                  key={cell.id}
                  style={{
                    minWidth: `${cell.column.columnDef.minSize}px`,
                    maxWidth: `${cell.column.columnDef.maxSize}px`,
                    width: `${cell.column.getSize()}px`,
                    left: getLeftStickyPos(i),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
