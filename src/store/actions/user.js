import axios from "axios";
import {setAuthorized, setIsError, setRegister} from "../reducers/userReducer";
import {notifyAuthorize} from "../../components/macroComponents/Authorization/Authorization";
import {notifyRegistry} from "../../components/macroComponents/Registry/Registry";

export const getAuthorize = (phoneNumber,password) => {
    return async (dispatch) => {
        try {
            // номер телефона и пароль которые приходят передаем как query параметры
            const response = await axios.get(`http://localhost:5136/User/Login?PhoneNumber=${phoneNumber}&Password=${password}`)
            if(response.data === true){
                dispatch(setAuthorized(true))
                // алерт в зависимости от результата авторизации
                notifyAuthorize()
            }else{
                notifyAuthorize(false)
            }
        }
        catch(error){
            dispatch(setIsError(true))
        }
    }
}

export const getRegister = (body) => {
    return async (dispatch) => {
        try {
            // результаты формы приходят как переменная body, их отправляем как form data post запросом
            const response = await axios({
                method: "post",
                url: "http://localhost:5136/User/RegisterNewUser",
                data: body,
                headers: { "Content-Type": "multipart/form-data" },
            })
            // если успешно зарегались => алерт и диспатчим состояние isRegister
            if(response.data === 'Вы успешно зарегистрировались'){
                notifyRegistry()
                dispatch(setRegister(true))
            }
        }
        catch(error){
            // при ошибке чтобы перенаправляло на 404 page
            dispatch(setIsError(true))
        }
    }
}