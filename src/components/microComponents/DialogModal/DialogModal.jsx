import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "@emotion/styled";
import {cancelRequest, closeRequest, removeRequest} from "../../../store/actions/request";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";


// toast notify библиотека для алертинга
export const notifyActions = (success = true, text) => success ? toast.success(text, {
    autoClose: 1500,
}) : toast.error(text, {
    autoClose: 1500,
})

const DialogModal = ({open, handleClose, request}) => {
    const dispatch = useDispatch()
    const BlockContainer = styled('div')`
      display: flex;
      align-items: center;
      gap: 4px;
`
    const types = {
        '0': 'Продажа',
        '1': 'Покупка',
        '2': 'Аукцион',
    }

    // диспатчим удаление заявки, обновляется таблица и модалка закрывается
    const removeRequestClick = () => {
        dispatch(removeRequest(request.id))
        handleClose()
    }
    // диспатчим закрытие заявки, обновляется таблица и модалка закрывается
    const closeRequestClick = () => {
        dispatch(closeRequest(request.id))
        handleClose()
    }
    // диспатчим отмену заявки, обновляется таблица и модалка закрывается
    const cancelRequestClick = () => {
        dispatch(cancelRequest(request.id))
        handleClose()
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle sx={{width:'400px'}}>
                   Детализация
                </DialogTitle>
                <DialogContent>
                    <BlockContainer>
                        <div>Номер телефона:</div>
                        <div>{request.phoneNumber}</div>
                    </BlockContainer>
                    <BlockContainer>
                        <div>Почта:</div>
                        <div>{request.email}</div>
                    </BlockContainer>
                    <BlockContainer>
                        <div>ФИО:</div>
                        <div>{request.fio}</div>
                    </BlockContainer>
                    <BlockContainer>
                        <div>Номер заявки:</div>
                        <div>{request.id}</div>
                    </BlockContainer>
                    <BlockContainer>
                        <div>Тип статуса:</div>
                        <div>{types[request.type]}</div>
                    </BlockContainer>
                    <BlockContainer>
                        <div>Текущий статус:</div>
                        {/*в зависмости что приходит показываем текст*/}
                        <div>{ request.status === 0 ?  'активная' : 'закрытая'}</div>
                    </BlockContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={removeRequestClick}>Удалить</Button>
                    {/*в зависимости от статуса происходит или закрытие заявки или отмена заявки*/}
                    <Button onClick={request.status === 0 ? closeRequestClick : cancelRequestClick}>
                        {request.status === 0 ? 'Завершить' : 'Отменить' }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default DialogModal
