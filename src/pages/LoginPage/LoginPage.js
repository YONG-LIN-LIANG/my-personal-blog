import React, { useState} from 'react'
import style from './LoginPage.module.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import domain from '../../domain';
import Cookies from 'js-cookie';
import AuthApi from '../LoginPage/AuthApi';
import {randomNum} from '../../components/Public/calculation';
const LoginPage = () => {
    const history = useHistory();

    const [authState, setAuthState] = useState('login');
    const [usernameForRegister, setUsernameForRegister] = useState('');
    const [passwordForRegister, setPasswordForRegister] = useState('');
    const [usernameForLogin, setUsernameForLogin] = useState('');
    const [passwordForLogin, setPasswordForLogin] = useState('');

    const [regState, setRegState] = useState('');
    const [logInState, setLogInState] = useState('')


    const showRegisterPage = () => {
        setAuthState('register')
    }

    const showLoginPage = () => {
        setAuthState('login')
        setRegState('');
    }
    const handleRegisterSubmit = (e) => {
        
        e.preventDefault();
        const randomId = randomNum();
        const data = { usernameForRegister, passwordForRegister, id:randomId }
        if (usernameForRegister && passwordForRegister) {
            axios.post(`${domain}/user/register`, data)
                .then((res) => {
                    if (res.data.err) {
                        setRegState(res.data.err);
                        setTimeout(() => {
                            setRegState('');
                        }, 4000)
                        console.log(res.data.err)
                    }
                    else {
                        setRegState(res.data.message);
                        console.log(res)
                        setTimeout(() => {
                            setAuthState('login');
                            setRegState('');
                            setUsernameForRegister('');
                            setPasswordForRegister('');

                        }, 2000)
                    }
                    setUsernameForRegister('');
                    setPasswordForRegister('');
                })
        }
        else {
            setRegState('Please fill in all infomations');
            setTimeout(() => {
                setRegState('');
            }, 4000)
        }
    }

    const Auth = React.useContext(AuthApi);
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const data = { usernameForLogin, passwordForLogin }
        if (usernameForLogin && passwordForLogin) {
            axios.post(`${domain}/user/login`,
                data)
                .then((res) => {
                    if (res.data.err) {
                        setLogInState(res.data.err);
                    }

                    if (res.data[0]) {
                        setLogInState('Welcome ' + res.data[0].username + ' :)');
                        localStorage.setItem('loginUser', res.data[0].username);
                        localStorage.setItem('loginUserId', res.data[0].id);
                        setTimeout(() => {
                            Auth.setIsAuth(true);
                            //在這邊設定cookie為何，只要一登入就會設定cookie，可以再開發者工具查看
                            //檢查網路cookie顯示cookie為 user=loginTrue
                            Cookies.set('user', 'loginTrue');
                            setLogInState('');
                            setUsernameForLogin('');
                            setPasswordForLogin('');
                            history.push('/');
                        }, 2000)
                    }
                    if (res.data.message) {
                        setLogInState(res.data.message)
                        setTimeout(() => {
                            setLogInState('');
                        }, 4000)
                    }

                })
        }
        else {
            setRegState('Please fill in all infomations')
        }
    }
    return (
        <section>
            <div className={style.color}></div>
            <div className={style.color}></div>
            <div className={style.color}></div>
            <div className={style.box}>
                <div className={style.square} ></div>
                <div className={style.square} ></div>
                <div className={style.square} ></div>
                <div className={style.square} ></div>
                <div className={style.square} ></div>
                <div className={style.container}>
                    {
                        authState == 'login'
                            ? (
                                <div className={style.form}>
                                    <h2>Login Form</h2>
                                    <form>
                                        <div className={style.inputBox}>
                                            <input type='text' placeholder='Username' value={usernameForLogin} onChange={(e) => setUsernameForLogin(e.target.value)} />
                                            <span className={style.helperTxt} data-error='wrong' data-success='right'></span>
                                        </div>
                                        <div className={style.inputBox}>
                                            <input type='password' placeholder='Password' value={passwordForLogin} onChange={(e) => setPasswordForLogin(e.target.value)} />
                                          <span className={style.helperTxt} data-error='wrong' data-success='right'></span>
                                        </div>
                                        {
                                            logInState && <span className={style.logInState}>{logInState}</span>
                                        }
                                        <div className={style.inputBox}>
                                            <input type='submit' value='Login' onClick={handleLoginSubmit} />
                                        </div>
                                        {/* <p className={style.forget}>Forgot Password ? <Link to='#'>Click Here</Link></p> */}
                                        <p className={style.forget}>Don't have an account ? <Link to='#' onClick={showRegisterPage}>Sign Up!</Link></p>
                                    </form>
                                </div>
                            )
                            : (
                                <div className={style.form}>
                                    <h2>Register Form</h2>
                                    <form>
                                        <div className={style.inputBox}>
                                            <input type='text' placeholder='Username' value={usernameForRegister} onChange={(e) => setUsernameForRegister(e.target.value)} />
                                            <span className={style.helperTxt} data-error='wrong' data-success='right'></span>
                                        </div>
                                        <div className={style.inputBox}>
                                            <input type='password' placeholder='Password' value={passwordForRegister} onChange={(e) => setPasswordForRegister(e.target.value)} />
                                            <span className={style.helperTxt} data-error='wrong' data-success='right'></span>
                                        </div>
                                        {
                                            regState && <span className={style.regState}>{regState}</span>
                                        }

                                        <div className={style.inputBox}>
                                            <input type='submit' value='sign up' onClick={handleRegisterSubmit} />
                                        </div>
                                        <p className={style.forget}>Already have an account ? <Link to='#' onClick={showLoginPage}>Click Here</Link></p>

                                    </form>
                                </div>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default LoginPage
