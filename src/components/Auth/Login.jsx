import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // validate


        // submit
        let data = await postLogin(email, password);
        if(data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        }

        if(data && +data.EC !== 0) {
            toast.error(data.EM);
        }
        console.log(data.DT)
    }

    return (
        <div className='login-container container'>
            <div className="header">
                <span>Don't have an account yet?</span>
                <button className='btn btn-success btn-sign'>Sign up</button>
            </div>
            <div className="title col-4 mx-auto">
                Đình Huy
            </div>
            <div className="welcome col-4 mx-auto">
                Hello who's is this
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type='text' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <span className='forgot-password'>Forgot Password</span>
                <div>
                    <div className="btn btn-success btn-submit" onClick={()=>handleLogin()}>Login</div>
                </div>
                <div className="text-center">
                    <span className='back'  onClick={()=>navigate('/')}> &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
};

export default Login;