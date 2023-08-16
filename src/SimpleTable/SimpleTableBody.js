import * as React from "react";
import TableBody from "@mui/material/TableBody";
import SimpleTableRow from "./SimpleTableRow";

export default function SimpleTableBody(props) {
    const { rows = [], headers, tableState, handleExpandRow, handleSelectRow } = props;

    return (
        <TableBody>
            {rows.map((row, index) => (
                <SimpleTableRow
                    tableState={tableState}
                    key={index}
                    row={row}
                    rowIndex={index}
                    headers={headers}
                    handleExpandRow={handleExpandRow}
                    handleSelectRow={handleSelectRow}
                />
            ))}
        </TableBody>
    );
}
