import * as React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import SortIcon from "@mui/icons-material/Sort";
import { makeStyles } from '@mui/styles';

export default function SimpleTableSortHeader(props) {
    const classes = useStyles();
    const { active, headerIndex, direction, handleSort } = props;

    return (
        <>
            {active ? (
                <TableSortLabel active={active} direction={direction} onClick={() => handleSort(headerIndex)}>
                    {props.children}
                </TableSortLabel>
            ) : (
                <Button
                    className={classes.headerBtn}
                    onClick={() => handleSort(headerIndex)}
                    endIcon={<SortIcon className={classes.sortIcon} />}
                >
                    {props.children}
                </Button>
            )}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    headerText: {
        fontFamily: "Lato",
        color: "#434343",
        fontSize: "1rem",
        fontWeight: 500
    },
    sortIcon: {
        color: "#757575"
    },
    headerBtn: {
        "fontSize": "1rem",
        "color": "#434343",
        "fontFamily": "Lato",
        "fontWeight": 500,
        "textTransform": "none",
        "paddingLeft": 0,
        "lineHeight": "1.5rem",
        "&:hover": {
            backgroundColor: "#FFFFFF"
        }
    }
}));
