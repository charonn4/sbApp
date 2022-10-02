import axios from "axios";
import {setIsActioned, setIsFetching, setRequest, setRequests} from "../reducers/requestReducer";
import {notifyRequest} from "../../components/macroComponents/RequestCreator/RequestCreator";
import {notifyActions} from "../../components/microComponents/DialogModal/DialogModal";


export const getRequests = () => {
    return async (dispatch) => {
        // setIsFetching для прелоудера
        dispatch(setIsFetching(true))
        const response = await axios.get('http://localhost:5136/Request/GetAllRequests')
        // диспатчим data который приходит выше в стейт
        dispatch(setRequests(response.data))
    }
}

export const addRequest = (body) => {
    return async () => {
        try {
            // результаты формы приходят как переменнаяя body, их отправляем как form data post запросом
            const response = await axios({
                method: "post",
                url: "http://localhost:5136/Request/AddRequest",
                data: body,
                headers: { "Content-Type": "multipart/form-data" },
            })
            if(response.data === true){
                // алерт если успешно прошел запрос
                notifyRequest()
            }
        }
        catch (e){
            // алерт если запрос не прошел
            notifyRequest(false)
        }
    }
}

export const getRequest = (id) => {
    return async (dispatch) => {
        // id который приходит как query параметр
        const response = await axios.get(`http://localhost:5136/Request/GetRequest?Id=${id}`)
        // диспатчим data в стейт
        dispatch(setRequest(response.data))
    }
}

// для удаления заявки
export const removeRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5136/Request/RemoveRequest",
                data: {id: id},
                headers: { "Content-Type": "multipart/form-data" },
            })
            if(response.data === true){
                notifyActions(true, 'Заявка успешно удалена.')
                dispatch(setIsActioned(true))
            }
        }
        catch (e){
            notifyActions(false, 'Ошибка при удалении заявки.')
        }
    }
}

// для закрытия заявки
export const closeRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5136/Request/CloseRequest",
                data: {id: id},
                headers: { "Content-Type": "multipart/form-data" },
            })
            if(response.data === true){
                notifyActions(true, 'Заявка успешно закрыта.')
                dispatch(setIsActioned(true))
            }
        }
        catch (e){
            notifyActions(false, 'Ошибка при закрытии заявки.')
        }
    }
}

// cancelRequest не работает хотя в ответе приходит true
export const cancelRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5136/Request/CancelRequest",
                data: {id: id},
                headers: { "Content-Type": "multipart/form-data" },
            })
            if(response.data === true){
                notifyActions(true, 'Заявка снова активна.')
                dispatch(setIsActioned(true))
            }
        }
        catch (e){
            notifyActions(false, 'Ошибка при отмене заявки.')
        }
    }
}


