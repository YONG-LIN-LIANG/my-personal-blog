import React, { useState } from 'react'
import style from './Nav.module.css';
import { menu } from './menuData';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBtn from '../CustomizedMenuBtn/MenuBtn';
import UserIcon from '../UserIcon/UserIcon';
const Nav = () => {
    const [toggleSearchBar, setToggleSearchBar] = useState(false);

    return (
        <div className={style.nav}>
            <div className={style.top}>
                <div className={style.left}>
                    <a href='/' style={{textDecoration:'none'}}>
                    <h2 style={{color:'#fff', cursor:'pointer'}}>STEVEN</h2>
                    </a>
                </div>

                <input type='checkbox' id='test' />
                <label htmlFor='test'><MenuBtn className={style.menuBtn} /></label>

                <div className={style.menuContainer}>
                    <nav className={style.right}>

                        <ul  className={style.menu}>
                            {
                                menu.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <a style={{textDecoration:'none'}} className={style.link} href={item.to}>
                                                {item.name}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div className={style.search}>
                            <div className={style.searchForIpadArea}>
                                <input type='text' placeholder='Search Here...' />
                                <SearchOutlinedIcon className={style.searchForIpad} />
                            </div>
                            <SearchOutlinedIcon className={style.searchForComp} onClick={() => setToggleSearchBar(true)} />
                            {toggleSearchBar &&
                                <>

                                    <div className={style.inputArea}>
                                        <input type='text' placeholder='Search Here...' />
                                        <button><i class="fas fa-search"></i></button>
                                        <button onClick={() => setToggleSearchBar(false)} ><i class="fas fa-times"></i></button>
                                    </div>
                                </>
                            }

                        </div>
                        <div className={style.socialmedia}>
                            <Link className={style.socialmediaLink} to='#'><i className="fab fa-twitter"></i></Link>
                            <Link className={style.socialmediaLink} to='#'><i className="fab fa-facebook-f"></i></Link>
                        </div>
                        <UserIcon />

                    </nav>
                </div>
            </div>


        </div>
    )
}

export default Nav
