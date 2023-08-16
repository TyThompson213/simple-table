import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import SimpleTableHeader from "./SimpleTableHeader";
import SimpleTableBody from "./SimpleTableBody";
import SimpleTableFooter from "./SimpleTableFooter";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function SimpleTable(props) {
    const baseTableState = {
        rowExpanded: {},
        rowSelected: {},
        selectAll: false,
        canExpand: false,
        expandedRowComponent: null,
        expandRowCellComponent: null,
        canSelect: false,
        sortDirection: "ASC",
        sortHeader: {},
        sortHeaderAccessor: "",
        pageIndex: 0,
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 50, 100],
        noDataMessage: "No data found",
        headerBGColor: "#F0F0F0",
        showPagination: true,
        deselectedRows: [],
        containerComponent: Paper
    };

    const {
        headers,
        rows,
        initialTableState = {},
        totalCount,
        handlePaginate,
        handleSelect,
    } = props;

    const [tableState, setTableState] = useState({ ...baseTableState, ...initialTableState });
    const hasData = rows.length;

    useEffect(() => {
        setTableState({ ...tableState, ...props.updateTableState });
    }, [props.updateTableState]);

    const updatePagination = (update = {}) => {
        handlePaginate(update);
    };

    const handlePageChange = (e, pageIndex) => {
        setTableState({ ...tableState, pageIndex });
        updatePagination({ ...tableState, pageIndex });
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value;

        setTableState({ ...tableState, pageSize });
        updatePagination({ ...tableState, pageSize });
    };

    const handleExpandRow = (rowIndex) => {
        const rowExpandedState = { ...tableState.rowExpanded };
        const isExpanded = rowExpandedState[rowIndex];

        if (isExpanded) {
            delete rowExpandedState[rowIndex];
        } else {
            rowExpandedState[rowIndex] = true;
        }

        setTableState({ ...tableState, rowExpanded: rowExpandedState });
    };

    const setSelectState = (rowsSelected, selectAll) => {
        setTableState({ ...tableState, rowSelected: rowsSelected, selectAll });
    };

    const updateSelect = (selectedRows, selectAll, deselected_bene_ids) => {
        handleSelect(selectedRows, selectAll, setSelectState, deselected_bene_ids);
    };

    const toggleSelectAll = () => {
        const currentSelectAll = tableState.selectAll;

        setTableState({ ...tableState, rowSelected: {}, selectAll: !currentSelectAll, deselectedRows: [] });
        updateSelect({}, !currentSelectAll, []);
    };

    const handleSelectRow = (rowIndex) => {
        const rowSelectedState = { ...tableState.rowSelected };
        const isSelected = rowSelectedState[rowIndex];
        const isSelectAll = tableState.selectAll;

        if (isSelectAll) {
            const rowsSelected = rows.reduce((selected, r, rI) => {
                const clickedIsDeselected = rowIndex === rI && tableState.deselectedRows.includes(r.id)
                const otherIsNotDeselected = rowIndex !== rI && !tableState.deselectedRows.includes(r.id)
                if (otherIsNotDeselected || clickedIsDeselected) {
                    selected[rI] = true;
                }
                return selected;
            }, {});

            let deselected_bene_ids = tableState.deselectedRows
            if(!rowsSelected[rowIndex]) {
                deselected_bene_ids = [...deselected_bene_ids, rows[rowIndex].id]
            }else{
                deselected_bene_ids = tableState.deselectedRows.filter(id => id !== rows[rowIndex].id)
            }
            
            
            setTableState({ ...tableState, rowSelected: rowsSelected, selectAll: isSelectAll, deselectedRows: deselected_bene_ids });
            updateSelect(rowsSelected, isSelectAll, deselected_bene_ids);
        } else {
            if (isSelected) {
                delete rowSelectedState[rowIndex];
                setTableState({ ...tableState, rowSelected: rowSelectedState });
                updateSelect(rowSelectedState, tableState.selectAll);
            } else {
                rowSelectedState[rowIndex] = true;
                setTableState({ ...tableState, rowSelected: rowSelectedState });
                updateSelect(rowSelectedState, tableState.selectAll);
            }
        }
    };

    const handleSort = (headerIndex, direction) => {
        setTableState({
            ...tableState,
            sortHeaderAccessor: headers[headerIndex].accessor,
            sortDirection: direction,
            sortHeader: { [headerIndex]: true }
        });
        updatePagination({
            ...tableState,
            sortHeaderAccessor: headers[headerIndex].accessor,
            sortDirection: direction,
            sortHeader: { [headerIndex]: true }
        });
    };

    return (
        <>
            <TableContainer component={tableState.containerComponent}>
                <Table size="small">
                    <SimpleTableHeader
                        toggleSelectAll={toggleSelectAll}
                        handleSort={handleSort}
                        tableState={tableState}
                        headers={headers}
                    />

                    {hasData ? (
                        <SimpleTableBody
                            handleSelectRow={handleSelectRow}
                            tableState={tableState}
                            rows={rows}
                            headers={headers}
                            handleExpandRow={handleExpandRow}
                        />
                    ) : null}
                </Table>

                {!hasData ? (
                    <Grid style={{ marginTop: "1rem", marginBottom: "1rem" }} justify="center" container>
                        <Grid item>
                            <Typography>{tableState.noDataMessage}</Typography>
                        </Grid>
                    </Grid>
                ) : null}
            </TableContainer>

            {tableState.showPagination ? (
                <SimpleTableFooter
                    handlePageChange={handlePageChange}
                    handleChangePageSize={handleChangePageSize}
                    tableState={tableState}
                    totalCount={totalCount}
                />
            ) : null}
        </>
    );
}
