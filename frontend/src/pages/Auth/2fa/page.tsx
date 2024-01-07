'use client'
import React, {useState, useEffect} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter, useParams} from "next/navigation";
import { verify2faStatus, Form2fa, login2fa } from '../../../service/apiService';
import Home from '../../Home/Home';
import TwoAuth from '../TwoAuth';

const TwoFa = ({}) => {
    const Code2fa:any = useParams()["2fa"];
    const { register, handleSubmit, formState: { errors } } = useForm<Form2fa>();
    const { push } = useRouter();
    const [redirect, setRedirect] = useState<boolean>(false)

    useEffect(() => {
        if (Code2fa != '') {
            let hash = '';
            if (Code2fa[0] == '2')
                hash = Code2fa.slice(4);
            else
                hash = Code2fa[1];

            verify2faStatus({hash: hash}).then((res) => {
                if (!res?.data)
                    push('/home/')
                else
                    setRedirect(true);
            })
        }
    },[Code2fa]);

    const onSubmitForm: SubmitHandler<Form2fa> = data => {
        data.Code2fa = Code2fa;
        login2fa(data).then((rep) => {
            if (rep?.status == 201)
                push('/home/');
        })
    }
    return (
        <>
          {!redirect ? (
            <Home />
          ) : (
            <TwoAuth />
          )}
        </>
      );
}

export default TwoFa;