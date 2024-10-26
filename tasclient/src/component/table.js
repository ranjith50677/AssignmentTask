
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(firstname, lastname, email) {
  return { firstname, lastname, email };
}

const CustomizedTables = ({ tabledata }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = Array.isArray(tabledata?.users)
  ? tabledata.users.filter(row =>
      row.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : []; // Return an empty array if tabledata.users is not defined

const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TextField
        label="Search"
        variant="outlined"
        sx={{width:"150px",marginLeft:" 10px",height:"50%"}}
        margin="normal"
        onChange={handleSearchChange}
      />
      <TableContainer>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NO</StyledTableCell>
              <StyledTableCell align="center">FirstName</StyledTableCell>
              <StyledTableCell align="center">LastName</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              {/* <StyledTableCell align="right">Edit & Update</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, key) => (
              <StyledTableRow key={row.email}>
                <StyledTableCell component="th" scope="row">
                  {page * rowsPerPage + key + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.firstname}</StyledTableCell>
                <StyledTableCell align="center">{row.lastname}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                {/* <StyledTableCell align="right">
                  <div style={{ cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <EditIcon />
                  </div>
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomizedTables;
