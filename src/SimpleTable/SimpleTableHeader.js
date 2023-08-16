import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import SimpleTableSortHeader from "./SimpleTableSortHeader";

export default function SimpleTableHeader(props) {
    const { headers, tableState, handleSort, toggleSelectAll } = props;
    const formattedSortDirection = tableState.sortDirection.toLowerCase();
    const selectAll = tableState.selectAll;

    const handleSortClick = (headerIndex) => {
        const isSorted = tableState.sortHeader[headerIndex];
        const nextSort = tableState.sortDirection === "ASC" ? "DESC" : "ASC";

        if (isSorted) {
            handleSort(headerIndex, nextSort);
        } else {
            handleSort(headerIndex, "DESC");
        }
    };

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: tableState.headerBGColor }}>
                {tableState.canSelect ? (
                    <TableCell padding="checkbox">
                        <Checkbox checked={selectAll} onClick={toggleSelectAll} indeterminate color="primary" />
                    </TableCell>
                ) : null}
                {tableState.canExpand ? <TableCell padding="none"></TableCell> : null}
                {headers.map((header, index) => {
                    if (header.skipRenderHeader) return null;
                    return (
                        <TableCell {...tableState.headerCellStyling} key={index}>
                            {header.canSort ? (
                                <SimpleTableSortHeader
                                    active={tableState.sortHeader[index]}
                                    direction={formattedSortDirection}
                                    handleSort={handleSortClick}
                                    header={header}
                                    headerIndex={index}
                                >
                                    {header.label}
                                </SimpleTableSortHeader>
                            ) : (
                                header.label
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
