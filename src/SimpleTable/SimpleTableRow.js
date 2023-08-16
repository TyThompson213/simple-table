import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from '@mui/styles';
import SimpleExpandCell from "./SimpleExpandCell";

export default function SimpleTableRow(props) {
    const classes = useStyles();
    const { row, rowIndex, headers, tableState, handleExpandRow, handleSelectRow } = props;
    const isExpanded = tableState.rowExpanded[rowIndex];
    const ExpandedRowComponent = tableState.expandedRowComponent;
    const canExpandHeader = tableState.canExpand ? 1 : 0;
    const canSelectHeader = tableState.canSelect ? 1 : 0;
    const totalHeaderCount = headers.length + canExpandHeader + canSelectHeader;
    const isSelectAll = tableState.selectAll;
    const isRowSelected = tableState.rowSelected[rowIndex];
    const isSelected = (isSelectAll && !tableState.deselectedRows.includes(row.id)) || isRowSelected ? true : false;

    console.log('this is tableState', tableState)
    return (
        <>
            <TableRow>
                {tableState.canSelect ? (
                    <TableCell padding="checkbox">
                        <Checkbox onClick={() => handleSelectRow(rowIndex)} checked={isSelected} color="primary" />
                    </TableCell>
                ) : null}
                {tableState.canExpand ? (
                    <TableCell padding="none">
                        <SimpleExpandCell
                            row={row}
                            handleExpandRow={handleExpandRow}
                            tableState={tableState}
                            rowIndex={rowIndex}
                        />
                    </TableCell>
                ) : null}
                {headers.map((header, headerIndex) => {
                    if (header.hasOwnProperty("renderCell")) {
                        return (
                            <TableCell key={headerIndex} align={header.alignment}>
                                {header.renderCell(header, row, rowIndex, headerIndex)}
                            </TableCell>
                        );
                    } else {
                        return (
                            <TableCell key={headerIndex} className={classes.rowText} align={header.alignment}>
                                {row[header.accessor]}
                            </TableCell>
                        );
                    }
                })}
            </TableRow>
            {isExpanded ? (
                <TableRow>
                    <TableCell colSpan={totalHeaderCount}>
                        <ExpandedRowComponent row={row} />
                    </TableCell>
                </TableRow>
            ) : null}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    rowText: {
        fontFamily: "Lato",
        color: "#595959",
        fontSize: "1rem",
        fontWeight: 500
    }
}));
