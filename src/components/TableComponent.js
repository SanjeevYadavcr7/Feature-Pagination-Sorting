import React, { useState } from 'react'
import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    table:{
        '& thead tr th':{
            '&:first-child':{
                borderRadius: '30px 0px 0px 0px',
            },
            '&:last-child':{
                borderRadius: '0px 30px 0px 0px',
            },
        },
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody tr': {
            '&:nth-of-type(even)':{
                backgroundColor: theme.palette.action.hover,
            }
        },
        '& thead th span':{
            '&:hover':{
                color: theme.palette.action.hover,
            },
        }
    },
    headColor:{
        '&: active':{
            color: 'red',
            background: 'red'
        }
    }
}))

const TableComponent = (records, headCells) => {
    
    const classes = useStyles();
    const pages = [7,10,15];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblContainer = (props) => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = (props) => {

        const handleSortRequest = (headRowId) => {
            const isAsc = (orderBy === headRowId) && (order === 'asc');
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(headRowId);
        }

        return(
            <TableHead>
                <TableRow>
                    {
                        headCells.map((headRow) => (
                            <TableCell align='center' 
                            key={headRow.id} 
                            sortDirection={orderBy === headRow.id ? order : false}
                            >
                                <TableSortLabel
                                    className={classes.headColor}
                                    active={orderBy === headRow.id}
                                    direction={orderBy === headRow.id ? order : 'asc'}
                                    onClick={() => handleSortRequest(headRow.id)}
                                >
                                    {headRow.label}
                                </TableSortLabel>
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    
    const TblPagination = () => (
        <TablePagination 
            component='div'
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            count={records.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
        />
    )

    const getInDescOrder = (a, b, orderBy) => {
        if(a[orderBy] > b[orderBy]) return -1;
        if(a[orderBy] < b[orderBy]) return 1;
        return 0;
    }

    const customComparator = (order, orderBy) => {
        return order === 'desc' 
            ? (a,b) => getInDescOrder(a,b,orderBy)
            : (a,b) => -getInDescOrder(a,b,orderBy);
    }

    const sortRecords = (records, comparator) => {
        const tobeSortedRecords = records.map((record, i) => [record, i]);
        tobeSortedRecords.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1]-b[1];
        })

        return tobeSortedRecords.map((record) => record[0]);
    }

    const dataAfterPaging = () => {
        const sortedRecords = sortRecords(records, customComparator(order, orderBy));
        return sortedRecords.slice(page*rowsPerPage, (page+1)*rowsPerPage);
    }
    
    return {
        TblContainer,
        TblHead,
        TblPagination,
        dataAfterPaging
    }
}

export default TableComponent
