import React from 'react'
import style from './TopLabel.module.css';
import {Link} from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const TopLabel = (props) => {
    return (
        <div className={style.topLabel}>
            <h3>Blog Post</h3>
            <div className={style.direction}>
                <Link style={{textDecoration:'none', color:'#ccc'}} to='/' className={style.link}>Home</Link>
                <ArrowForwardIosIcon className={style.arrow} />
                <Link style={{textDecoration:'none'}} to='#' className={style.link}>{props.tags[0]}</Link>
               
            </div>
        </div>
    )
}

export default TopLabel
