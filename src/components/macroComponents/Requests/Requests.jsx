import React, {useState, useEffect} from 'react';
import s from './Requests.module.css'
import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DialogModal from "../../microComponents/DialogModal/DialogModal";
import {useDispatch, useSelector} from "react-redux";
import {getRequest, getRequests} from "../../../store/actions/request";
import Button from "@mui/material/Button";


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

const Requests = () => {
    const requests = useSelector(state => state.request.requests)
    const request = useSelector(state => state.request.request)
    const isFetching = useSelector(state => state.request.isFetching)
    const isActioned = useSelector(state => state.request.isActioned)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleClickOpen =  (id) => {
        setOpen(true);
        dispatch(getRequest(id))
    };

    const handleClose = () => {
        setOpen(false);
    };
    // useEffect следит за isActioned, когда происходит закрытие, отмена или удаление заявки то таблица заявок обновляется
    useEffect(()=>{
        dispatch(getRequests())
    }, [isActioned])

    const types = {
        '0': 'Продажа',
        '1': 'Покупка',
        '2': 'Аукцион',
    }

    return (
        <>
            {isFetching ? <div className={s.preloader}><img src="https://thumbs.gfycat.com/ImpressiveGenuineHen-max-1mb.gif" alt=""/></div> : <TableContainer component={Paper}>
                <Table  className={s.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Номер заявки</StyledTableCell>
                            <StyledTableCell>ФИО</StyledTableCell>
                            <StyledTableCell>номер телефона</StyledTableCell>
                            <StyledTableCell>Почта</StyledTableCell>
                            <StyledTableCell>Тип</StyledTableCell>
                            <StyledTableCell>Статус</StyledTableCell>
                            <StyledTableCell>Действия</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { requests.map(request =>
                            <StyledTableRow key={request.id}>
                                <StyledTableCell >№ {request.id}</StyledTableCell>
                                <StyledTableCell >{request.fio}</StyledTableCell>
                                <StyledTableCell >{request.phoneNumber}</StyledTableCell>
                                <StyledTableCell >{request.email}</StyledTableCell>
                                <StyledTableCell >{types[request.type]}</StyledTableCell>
                                <StyledTableCell >
                                    {request.status === 0 ?  <div className={`${s.green} ${s.status}`}>активная</div> : <div className={`${s.red} ${s.status}`}>закрытая</div>}
                                </StyledTableCell>
                                <StyledTableCell >
                                    <Button onClick={() => {handleClickOpen(request.id)}} size={'small'}>
                                        Детализация
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
                <DialogModal open={open} handleClose={handleClose} request={request}/>
            </TableContainer>}
        </>
    );
};

export default Requests;