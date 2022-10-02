import React, {useRef, useState} from 'react';
import s from './RequestCreator.module.css'
import {useFormik} from "formik";
import {addRequest} from "../../../store/actions/request";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import {toast} from "react-toastify";

// toast notify библиотека для алертинга
export const notifyRequest = (success = true) => success ? toast.success('Заявка успешно создана', {
    autoClose: 1500,
}) : toast.error('Что-то пошло не так', {
    autoClose: 1500,
})
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const RequestCreator = () => {
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()
    const ref = useRef(null)

    // валидация с помощью библиотеки formik и yup + компоненты от mui material
    const formik = useFormik({
        initialValues:{
            phoneNumber: '',
            fio: '',
            email: '',
            type: ''
        },
        validationSchema:Yup.object({
            phoneNumber: Yup.string().matches(phoneRegExp, 'Введите корректное значение номера').max(11, 'Не может быть больше чем 11 символов').required('Обязательное поле'),
            fio: Yup.string().max(20, 'Не может быть больше чем 20 символов').required('Обязательное поле'),
            email: Yup.string().email('Некорректная почта').max(30, 'Не может быть больше чем 30 символов').required('Обязательное поле')
        }),
        // вешаем дизейбл на кнопку при первом клике чтоб запросы  не спамить запросы
        onSubmit: async  (values) => {
            setDisabled(true)
            await dispatch(addRequest(values))
            setDisabled(false)
            // сброс формы
            formik.resetForm()
            ref.current.click()
        }
    })

    return (
        <div>
            <Typography variant={'h4'} gutterBottom>Создание новой заявки</Typography>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.container}>
                    <TextField error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)} variant="standard"
                               helperText={(formik.touched.phoneNumber && formik.errors.phoneNumber) && formik.errors.phoneNumber}
                               name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange}
                               label='Номер телефона' type="text" onBlur={formik.handleBlur}/>
                </div>

                <div className={s.container}>
                    <TextField error={!!(formik.touched.fio && formik.errors.fio)} variant="standard" onBlur={formik.handleBlur}
                               helperText={(formik.touched.fio && formik.errors.fio) && formik.errors.fio}
                               name='fio' value={formik.values.fio} onChange={formik.handleChange} label='Ф.И.О.' type="text"/>
                </div>

                <div className={s.container}>
                    <TextField error={!!(formik.touched.email && formik.errors.email)} variant="standard" name='email'
                               helperText={(formik.touched.email && formik.errors.email) && formik.errors.email}
                               value={formik.values.email} onChange={formik.handleChange}
                               label='Электронная почта' type="text" onBlur={formik.handleBlur}/>
                </div>

                <div>
                    <FormControl>
                        <FormLabel>Тип запроса</FormLabel>
                        <RadioGroup sx={{flexDirection: 'row', gap: 1}} defaultValue="0" name="type">
                            <FormControlLabel value="0" control={<Radio size={'small'} onChange={formik.handleChange} ref={ref}/>} label="Продажа" />
                            <FormControlLabel value="1" control={<Radio size={'small'} onChange={formik.handleChange}/>} label="Покупка" />
                            <FormControlLabel value="2" control={<Radio size={'small'} onChange={formik.handleChange} />} label="Аукцион" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={s.footer}>
                    <Button disabled={disabled} type='submit'>Добавить заявку</Button>
                </div>
            </form>
        </div>
    );
};

export default RequestCreator;