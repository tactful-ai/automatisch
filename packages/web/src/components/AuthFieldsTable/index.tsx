import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import type { field } from '@automatisch/types';
import {IconButton } from '@mui/material';


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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



type AuthTableFieldsProps = {
  rows: field[];
  removeField: (index: number) => void;
}

function AuthTableFields({ rows, removeField }: AuthTableFieldsProps) {



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Label</StyledTableCell>
            <StyledTableCell align="left">Key</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Required</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: field, index: number) => (
            row.key && row.label && (<StyledTableRow key={row.key}>
              <StyledTableCell component="th" scope="row">
                {row.label}
              </StyledTableCell>
              <StyledTableCell align="left">{row.key}</StyledTableCell>
              <StyledTableCell align="left">{row.type}</StyledTableCell>
              <StyledTableCell align="left">{row.required ? <span>&#x2705;</span> : <span>&#x1f6ab;</span>}</StyledTableCell>
              <StyledTableCell align="right">

                <IconButton onClick={() => removeField(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>

              </StyledTableCell>
            </StyledTableRow>)
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AuthTableFields;