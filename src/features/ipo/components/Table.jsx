import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function BasicTable({ header, data, handleNavigate }) {
  return (
    <TableContainer className="border">
      <Table aria-label="simple table">
        <TableHead className="bg-[#eee]">
          <TableRow>
            {header.map((col) => (
              <TableCell key={col.id} align="left">{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={() => handleNavigate(row.id)}
              key={row.id} // Ensure row.id is unique
              className="cursor-pointer"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {header.map((col) => {
                // Use a unique key for each cell
                const cellKey = `${row.id}-${col.id}`; // Combine row.id and col.id

                if (col.nestedData) {
                  if (col.id === "companyName") {
                    return (
                      <TableCell key={cellKey} className="!font-semibold" align="left">
                        <div className="flex gap-2">
                          <img src={row.avatar} className="rounded-[50%] object-contain border-2 w-[40px] h-[40px]" />
                          <div>
                            <div>{row[col.id]}</div>
                            <div className="font-normal text-lightText text-xs">
                              {row[col.subId]}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={cellKey} className="!font-semibold" align="left">
                      <div>{row[col.id]}</div>
                      <div className="font-normal text-[#838181] text-xs">
                        {row[col.subId]}
                      </div>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={cellKey} className="!font-semibold" align="left">
                    {row[col.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
