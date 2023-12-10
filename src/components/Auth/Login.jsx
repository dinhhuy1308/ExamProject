import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserLogin } from '../../redux/reducer/userReducer';
import { FaSpinner } from "react-icons/fa6";
import { saveLocalStogare } from '../../utils/LocalStorage';
import { ACCESS_TOKEN } from '../../contants';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // validate

        setIsLoading(true);
        // submit
        let data = await postLogin(email, password);
        if(data && data.EC === 0) {
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
            saveLocalStogare(ACCESS_TOKEN, data.DT.access_token);

            dispatch(getUserLogin(data));
        }

        if(data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    return (
        <div className='login-container container'>
            <div className="header">
                <span>Don't have an account yet?</span>
                <button className='btn btn-success btn-sign' onClick={()=>navigate('/register')}>Sign up</button>
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
                    <button disabled={isLoading} className="btn btn-success btn-submit" onClick={()=>handleLogin()}>
                        {isLoading  && <FaSpinner className='loaderIcon' />} 
                        <span>Login</span>
                    </button>
                </div>
                <div className="text-center">
                    <span className='back'  onClick={()=>navigate('/')}> &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
};

export default Login;