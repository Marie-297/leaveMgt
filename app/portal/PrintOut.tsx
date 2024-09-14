"use client"
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { formatDistance, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Leave, LeaveStatus } from "@prisma/client";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  leaves: Leave[];
};

const PrintOut = ({ leaves }: Props) => {
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedSort, setSelectedSort] = useState<string>("Sort By");

  // Sorting function
  const sortLeaves = (leaves: Leave[], column: string, order: "asc" | "desc") => {
    return [...leaves].sort((a, b) => {
      let valueA = a[column as keyof Leave];
      let valueB = b[column as keyof Leave];

      if (valueA === null || valueA === undefined) valueA = "";
      if (valueB === null || valueB === undefined) valueB = "";
      // Convert non-string values for comparison
      if (column === "createdAt" || column === "updatedAt" || column === "startDate" || column === "endDate") {
        valueA = new Date(valueA as string).getTime();
        valueB = new Date(valueB as string).getTime();
      }

      if (order === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };
  

  // Toggling sort order
  const toggleSortOrder = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedLeaves = sortLeaves(leaves, sortColumn, sortOrder);
  const handleSortOptionClick = (column: string, label: string) => {
    toggleSortOrder(column);
    setSelectedSort(label);
  };
  const handleDefaultOptionClick = () => {
    setSortColumn("createdAt");
    setSortOrder("asc");
    setSelectedSort("Sort By");
  };
  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300">
          <Button
            variant="outline"
            role="combobox"
          >
            Sort By
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] p-0">
            <DropdownMenuItem onClick={handleDefaultOptionClick}>
            Default {sortColumn === "createdAt" && sortOrder === "asc" && "▲"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortOptionClick("status", "Status")}
            >
              Leave Status {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortOptionClick("type", "Type")}
            >
              Leave Type {sortColumn === "type" && (sortOrder === "asc" ? "▲" : "▼")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortOptionClick("startDate", "Date")}
            >
              Date {sortColumn === "startDate" && (sortOrder === "asc" ? "▲" : "▼")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortOptionClick("department", "Department")}
            >
              Department {sortColumn === "department" && (sortOrder === "asc" ? "▲" : "▼")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h3 className="font-bold">{selectedSort}</h3>
      </div>
      <Table id="printout-table">
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Requested On</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {sortedLeaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell className="font-medium">{leave.userName}</TableCell>
              <TableCell className="font-medium">{leave.department}</TableCell>
              <TableCell className="font-medium">{leave.type}</TableCell>
              <TableCell className="flex font-medium">
                <span>{dayjs(leave.startDate).format("DD/MM/YYYY")} </span> {" "}
              </TableCell>
              <TableCell>{leave.days}</TableCell>
              <TableCell className="font-medium">
                <Badge    className={ `
                ${leave.status === LeaveStatus.APPROVED && "bg-green-900"} 
                ${leave.status === LeaveStatus.PENDING && "bg-amber-300"} 
                ${leave.status === LeaveStatus.REJECTED && "bg-red-900"} 
                `  } style={{ padding: '4px 8px',marginBottom: '5px', fontSize: '12px' }}> {leave.status}</Badge>{" "} 
              </TableCell>
              <TableCell className="font-medium">{leave.moderator}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PrintOut;
