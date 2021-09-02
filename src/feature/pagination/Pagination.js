import React from 'react'
import { Container, makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import Header from '../../components/HeaderComponent';
import Table from '../../components/TableComponent';
import { employeeData, headCells } from './EmployeeData';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        maxWidth: '60vw',
        minHeight: '50vh',
        margin: '9% auto',
        borderRadius: '35px 35px 5px 5px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        [theme.breakpoints.down('md')]:{
            maxWidth: '90vw',
        },
        [theme.breakpoints.down('sm')]:{
            overflowX: 'auto'
        }
    }
}))

const Pagination = () => {

    const classes = useStyles();
    const { TblContainer, TblHead, TblPagination, dataAfterPaging } = Table(employeeData, headCells); 

    return (
        <Container maxWidth='xl' className={classes.root}>
            <Header text='Feature/Pagination' />
            <Paper className={classes.paper}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            dataAfterPaging().map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell align='center'>{employee.name}</TableCell>
                                    <TableCell align='center'>{employee.email}</TableCell>
                                    <TableCell align='center'>{employee.mobile}</TableCell>
                                    <TableCell align='center'>{employee.city}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        
        </Container>
    )
}

export default Pagination
