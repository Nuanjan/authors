import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonContainer from './ButtonContainer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const tableStyle= {
    margin: "0 auto"
}
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

const AuthorList = ({authorList, setAuthorList}) => {
  const navigate = useNavigate()
   const onClickEdit = (author) => {
     
     navigate("edit/"+author._id,{state:author})
   }
   const removeFromAuthorList = authorId => {
    axios.delete('http://localhost:8000/' + authorId)
    .then(res => setAuthorList(authorList.filter(author => author._id !== authorId)))
    
}
    return (
        <TableContainer>
        <a href={"/new"}>Add an Author</a>
        <p>We have quotes by:</p>
            <Table sx={{ minWidth: 700, width: "70%",align:"center"}} style={tableStyle} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell style={{fontSize:"1.5rem"}}>Author</StyledTableCell>
                    <StyledTableCell align="center" style={{fontSize:"1.5rem"}}>Actions Available</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {authorList.map((author) => (
                    <StyledTableRow key={author._id}>
                    <StyledTableCell component="th" scope="row">
                        {author.name}
                    </StyledTableCell>
                    <StyledTableCell style={{display: "flex", justifyContent: "space-evenly"}}>
                        <ButtonContainer  color={"warning"} text={"Edit"} type={"button"} onClickHandler={() => onClickEdit(author)}/>
                        <ButtonContainer color={"error"} text={"delete"} type={"button"} onClickHandler={() => removeFromAuthorList(author._id)}/>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
    );
};

export default AuthorList;