import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

type Props = {};
export default function TabAbility({}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>a</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>d</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
