import React, {useState} from 'react'
import style from './Nav.module.css';
import {menu} from './menuDataForVideoPage';
import {Link} from 'react-router-dom';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBtnForSinglePost from '../CustomizedMenuBtn/MenuBtnForSinglePost';
const Nav = () => {
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    return (
        <div className={style.nav}>
            <div className={style.top}>
                <Link style={{textDecoration:'none'}} to='/' className={style.left}>
                <h2 style={{color:'#888', cursor:'pointer'}}>STEVEN</h2>
                </Link>

                <input type='checkbox' id='test' />
                <label htmlFor='test'><MenuBtnForSinglePost className={style.menuBtnForSinglePost} /></label>

                <div className={style.menuContainer}>
                    <nav className={style.right}>

                        <ul className={style.menu}>
                            {
                                menu.map(item => {
                                    return (
                                        
                                            <Link key={item.id} style={{textDecoration:'none'}} className={style.singlePost} to={item.to}>
                                                <li>
                                                {item.name}
                                                </li>
                                            </Link>
                                        
                                    )
                                })
                            }
                        </ul>

                        <div className={style.search}>
                            <div className={style.searchForIpadArea}>
                                <input type='text' placeholder='Search Here...' />
                                <SearchOutlinedIcon className={style.searchForIpad} />
                            </div>
                            <SearchOutlinedIcon className={style.searchForSinglePost} onClick={() => setToggleSearchBar(true)} />
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
                        <div className={style.socialmediaForSinglePost}>
                            <Link className={style.socialmediaLink} to='#'><i className="fab fa-twitter"></i></Link>
                            <Link className={style.socialmediaLink} to='#'><i className="fab fa-facebook-f"></i></Link>

                        </div>

                    </nav>
                </div>
            </div>


        </div>
    )
}

export default Nav
