import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import s from "./Authorization.module.css";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorize} from "../../../store/actions/user";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {phoneRegExp} from "../RequestCreator/RequestCreator";

// toast notify библиотека для алертинга
export const notifyAuthorize = (success = true) => success ? toast.success('Вы успешно авторизовались', {
    autoClose: 1500,
}) : toast.error('Неправильный номер или пароль', {
    autoClose: 1500,
})

const Authorization = () => {
    let navigate = useNavigate();
    const isAuthorized = useSelector(state => state.user.isAuthorized)
    const isError = useSelector(state => state.user.isError)
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (isAuthorized) {
            // если успешно то перенаправляет, таймаут для имитации поставил
            setTimeout(()=>{
                return navigate("/requests");
            }, 500)
        } else if (isError) {
            // если isError становится true то перенаправляет 404
            return navigate("/404");
        }
    },[isAuthorized, isError])

    // валидация с помощью библиотеки formik и yup + компоненты от mui material
    const formik = useFormik({
        initialValues:{
            phoneNumber: '',
            password: ''
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().matches(phoneRegExp, 'Введите корректное значение номера').max(11, 'Не может быть больше чем 11 символов').required('Обязательное поле'),
            password: Yup.string().max(20, 'Не может быть больше чем 20 символов').required('Обязательное поле')
        }),
        // сабмит делаем асинхронной функцией чтобы алерт на первый раз также срабатывал
        onSubmit: async (values) => {
            setDisabled(true)
            // values (номер телефона и пароль) берем с формика и передаем ее в функцию авторизации
            await dispatch(getAuthorize(values.phoneNumber, values.password))
            setDisabled(false)
        }
    })

    return (
        <div className={s.box}>
            <div className={s.boxInner}>
                <div className={s.header}>
                    <h2>Авторизация</h2>
                </div>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <div className={s.container}>
                        <TextField error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                   helperText={(formik.touched.phoneNumber && formik.errors.phoneNumber) && formik.errors.phoneNumber}
                                   variant={'standard'} size={'small'}
                                   name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange}
                                   onBlur={formik.handleBlur} label='Введите номер телефона' type="text"/>
                    </div>

                    <div className={s.container}>
                        <TextField error={!!(formik.touched.password && formik.errors.password)}
                                   helperText={(formik.touched.password && formik.errors.password) && formik.errors.password}
                                   variant={'standard'} size={'small'} name='password' value={formik.values.password}
                                   onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   label='Введите пароль' type="password"/>
                    </div>
                    <div className={s.footer}>
                        <Button disabled={disabled} size={'small'} variant={'text'} type='submit'>Войти</Button>
                        <Button size={'small'} variant={'text'}>Забыли пароль</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authorization;