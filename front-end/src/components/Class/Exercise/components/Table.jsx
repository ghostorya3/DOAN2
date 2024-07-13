import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { MdOutlineArrowCircleUp } from "react-icons/md";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

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

export default function CustomizedTables({ data, isTeacher, page }) {
  const navigate = useNavigate();

  const time = (hannop) => {
    if (moment().isBefore(moment(hannop)))
      return 'Còn hạn'
    else return 'hết hạn'
  }
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <TableContainer component={Paper} className='mt-5'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>Tên bài tập</StyledTableCell>
              <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Thời gian tạo</StyledTableCell>
              <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Thời gian hết hạn</StyledTableCell>
              <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Trạng thái</StyledTableCell>
              <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>{moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</StyledTableCell>
                <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>{moment(row.hannop).format('MMMM Do YYYY, h:mm:ss a')}</StyledTableCell>
                <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>{isTeacher ? time(row.hannop) : row.status}</StyledTableCell>
                <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>
                  {
                    isTeacher ? (<div className='flex gap-4 justify-center'>
                      <PlaylistAddCheckIcon fontSize='large' className='cursor-pointer text-green-500'
                      onClick={() => navigate(`/ListStudentDoExcercise/${row._id}`)}
                      ></PlaylistAddCheckIcon>
                      <EditIcon className='cursor-pointer text-yellow-500 mt-1'></EditIcon>
                      <DeleteSharpIcon className='cursor-pointer text-red-500 mt-1' ></DeleteSharpIcon>
                    </div>) : (<>
                      {row.status === 'Chưa nộp' && <div className='cursor-pointer flex justify-center text-green-500 items-center'>
                        <MdOutlineArrowCircleUp className='cursor-pointer text-xl'></MdOutlineArrowCircleUp>
                        <div className='text-xl font-medium' onClick={() => navigate(`/Excercise/${row._id}`)}>Làm bài</div>
                      </div>}
                    </>)
                  }

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <Stack spacing={2}>
        <Pagination count={page} color="primary" />
      </Stack>
    </div>

  );
}
