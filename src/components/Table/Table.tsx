import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  defaultSorting?: SortingState;
};
export default function Table<T>({ data, columns, defaultSorting }: Props<T>) {
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
  });
  return (
    <table className="w-full text-left">
      <thead className="whitespace-nowrap bg-content1 text-tiny uppercase text-foreground-500">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="px-4 py-3"
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
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
        {table.getRowModel().rows.map((row) => (
          <tr
            className="border-b border-content2"
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                className="px-4 py-2"
                key={cell.id}
                style={{ width: `${cell.column.getSize()}px` }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
