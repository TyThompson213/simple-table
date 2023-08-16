import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ExpandCell(props) {
    const { tableState, rowIndex, handleExpandRow, row } = props;
    const isRowExpanded = tableState.rowExpanded[rowIndex];
    const ExpandRowCellComponent = tableState.expandRowCellComponent;

    if (ExpandRowCellComponent) {
        return (
            <ExpandRowCellComponent
                row={row}
                isRowExpanded={isRowExpanded}
                handleExpandRow={() => handleExpandRow(rowIndex)}
            />
        );
    }

    return (
        <>
            {isRowExpanded ? (
                <IconButton onClick={() => handleExpandRow(rowIndex)}>
                    <ExpandLessIcon />
                </IconButton>
            ) : (
                <IconButton onClick={() => handleExpandRow(rowIndex)}>
                    <ExpandMoreIcon />
                </IconButton>
            )}
        </>
    );
}
