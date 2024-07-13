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

export default function CustomizedTables({ data, setIdRequest, setShowModal }) {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center gap-5 mt-2'>
            <TableContainer component={Paper} className=''>
                <Table sx={{ minWidth: 1500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>Tên học sinh</StyledTableCell>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Thời gian nộp bài</StyledTableCell>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Trạng thái</StyledTableCell>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Số điểm</StyledTableCell>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }} >Hành động</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                    {row.userName}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                    {row.createdAt && moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                    {row.status}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                    {row.point}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                    <div className='flex gap-5 justify-center'>
                                        <div className='hover:text-blue-500 font-normal text-base cursor-pointer'>Xem code</div>
                                        <div className='hover:text-blue-500 font-normal text-base cursor-pointer'
                                            onClick={() => {
                                                setIdRequest(row.setIdRequest);
                                                setShowModal(true)
                                            }}
                                        >Chấm điểm</div>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
