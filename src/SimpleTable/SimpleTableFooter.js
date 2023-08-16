import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function SimpleTableHeader(props) {
    const { tableState, totalCount, handlePageChange, handleChangePageSize } = props;

    return (
        <TablePagination
            rowsPerPageOptions={tableState.pageSizeOptions}
            component="div"
            count={totalCount}
            rowsPerPage={tableState.pageSize}
            page={tableState.pageIndex}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangePageSize}
        />
    );
}
