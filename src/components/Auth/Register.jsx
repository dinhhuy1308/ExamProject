import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRegister } from '../../services/apiServices';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isShowPassword, setIsShowPassWord] = useState(false);

    const navigate = useNavigate();

    // const validateEmail = (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   };

    const handleRegister = async () => {
        // const isValidEmail = validateEmail(email);
        // if(!isValidEmail) {
        //     toast.error('Invalid email');
        //     return;
        // }

        // if(!password) {
        //     toast.error('Invalid password');
        //     return;
        // }

        
        let data = await postRegister(email, password, username);
        if(data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }

        if(data && +data.EC !== 0) {
            toast.error(data.EM);
        }
        console.log(data)
    }

    return (
        <div className='login-container container'>
            <div className="header">
                <span>Don't have an account yet?</span>
                <button className='btn btn-success btn-sign' onClick={()=>navigate('/login')}>Login</button>
            </div>
            <div className="title col-4 mx-auto">
                Đình Huy
            </div>
            <div className="welcome col-4 mx-auto text-center" >
                Start your journey?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label htmlFor="">Email (*)</label>
                    <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group pass-group">
                    <label htmlFor="">Password (*)</label>
                    <input type={isShowPassword ? 'text' : 'password'} className='form-control ' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isShowPassword ? <span className='icon-eyes' onClick={()=>setIsShowPassWord(false)}><FaEye /></span> : <span className='icon-eyes' onClick={()=>setIsShowPassWord(true)}><FaEyeSlash  /></span>}
                    
                </div>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <span className='forgot-password'>Forgot Password</span>
                <div>
                    <div className="btn btn-success btn-submit" onClick={() => handleRegister()}>Register</div>
                </div>
                <div className="text-center">
                    <span className='back' onClick={() => navigate('/')}> &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );

};

export default Register;