import React, {useEffect, useRef} from "react";
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import {useDispatch, useSelector} from "react-redux";
import {getChatsForManager, loginUser} from "../../shared/api/apis.js";
import {Cookies} from "react-cookie";
import {clientChatByClientId} from "../../shared/api/apiClient/apiClient.js";

export default function LoginForm() {
    const cookie = new Cookies();
    const toast = useRef(null);
    const user = cookie.get("user");
    const dispatch = useDispatch();

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.login });
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            login : ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.password.trim() || !data.login.trim()) {
                errors.password = 'Требуется пароль';
                errors.login = 'Требуется логин';
            }

            return errors;
        },
        onSubmit: (data) => {
            const {login,password} = formik.values;

            dispatch(loginUser({password, login}))
                .unwrap()
                .then(r => {
                    if(r.role === "manager"){
                        dispatch(getChatsForManager({access_token : r.access_token, chatCategory: "ordinary",chatStatus: "isOpenNotBusy"}))
                    }else {
                        dispatch(clientChatByClientId({access_token : r.access_token, clientId : r.id}))
                    }
                    return r;
                })

            // dispatch(authorize({user}))
            data && show();
            formik.resetForm();
            // window.location.href = '/';

            // Обновление текущей страницы
            // window.location.reload();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <Toast ref={toast} />


                <label htmlFor="login">Login</label>

                <InputText
                    id="in_login"
                    type="login"
                    value={formik.values.login}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('login') })}
                    onChange={(e) => {
                        formik.setFieldValue('login', e.target.value);
                    }}
                />
                <label htmlFor="password">Password</label>
                <Password

                    inputId="in_password"
                    name="password"
                    className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                    value={formik.values.password}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                    toggleMask
                />
                {getFormErrorMessage('password')}
                <div>
                    <Button label="Войти" type="submit" icon="pi pi-user" />
                </div>
            </form>
        </div>
    )
}