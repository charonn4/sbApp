import React, {useEffect, useState} from 'react';
import s from './Registry.module.css'
import {useFormik} from "formik";
import * as Yup from "yup"
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {getRegister} from "../../../store/actions/user";
import {phoneRegExp} from "../RequestCreator/RequestCreator";
import {toast} from "react-toastify";

// toast notify библиотека для алертинга
export const notifyRegistry = () =>  toast.success('Вы успешно зарегестрировались', {
    autoClose: 1500,
})

const Registry = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const isRegister = useSelector(state => state.user.isRegister)
    const isError = useSelector(state => state.user.isError)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (isRegister){
            // если успешно то перенаправляет, таймаут для имитации поставил
            setTimeout(() => {
                return navigate("/authorization");
            },500)
        }else if(isError){
            // если isError становится true то перенаправляет 404
            return navigate("/404");
        }
    },[isRegister, isError])

    // валидация с помощью библиотеки formik и yup + компоненты от mui material
    const formik = useFormik({
        initialValues:{
            phoneNumber: '',
            name: '',
            password: ''
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().matches(phoneRegExp, 'Введите корректное значение номера').max(11, 'Не может быть больше чем 11 символов').required('Обязательное поле'),
            name: Yup.string().max(20, 'Не может быть больше чем 20 символов').required('Обязательное поле'),
            password: Yup.string().max(20, 'Не может быть больше чем 20 символов').required('Обязательное поле')
        }),
        // сабмит делаем асинхронной функцией чтобы алерт на первый раз также срабатывал
        onSubmit: async (values) => {
            setDisabled(true)
            await dispatch(getRegister(values))
            setDisabled(false)
        }
    })

    return (
        <div className={s.box}>
            <div className={s.boxInner}>
                <div className={s.header}>
                    <h2>Регистрация</h2>
                </div>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <div className={s.container}>
                        <TextField error={!!(formik.touched.name && formik.errors.name)} name='name'
                                   helperText={(formik.touched.name && formik.errors.name) && formik.errors.name}
                                   value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   label='Введите имя' type="text" variant={'standard'} size={'small'}/>
                    </div>

                    <div className={s.container}>
                        <TextField error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)} name='phoneNumber'
                                   helperText={(formik.touched.phoneNumber && formik.errors.phoneNumber) && formik.errors.phoneNumber}
                                   value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   label='Введите номер телефона' type="text" variant={'standard'} size={'small'}/>
                    </div>
                    <div className={s.container}>
                        <TextField error={!!(formik.touched.password && formik.errors.password)} name='password'
                                   helperText={(formik.touched.password && formik.errors.password) && formik.errors.password}
                                   value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   label='Введите пароль' type="password" variant={'standard'} size={'small'}/>
                    </div>
                    <div className={s.footer}>
                        <Button disabled={disabled} size={'small'} variant={'text'} type='submit'>Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registry;