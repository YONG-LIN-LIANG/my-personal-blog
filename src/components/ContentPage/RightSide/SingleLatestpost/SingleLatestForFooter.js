import React, {useState, useEffect} from 'react';
import style from './SingleLatestForFooter.module.css';
import { Link } from 'react-router-dom';
import dummyPic from './dummy4.jpg';
import {handleTags} from '../../../Public/calculation';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width:'70px',
      height:'70px'
    },
  },
}));
export function ImageAvatars() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
    );
  }
const SingleLatestPost = (props) => {
    const [tags, setTags] = useState([]);
    useEffect(()=>{
        let finalTag = handleTags(props.post.tags)
        setTags(finalTag)
    },[])
    return (
        <li>
            <div className={style.imgArea}>
                <ImageAvatars/>
                <Link style={{textDecoration:'none'}} to='#'><span><i className="fas fa-link"></i></span></Link>
            </div>

            <div className={style.tagsTitle}>
                <div className={style.tags}>
                    {tags && tags.map((tag, index)=><Link key={index} className={style.tagLink} style={{textDecoration:'none'}}  to='#' ><span>{tag}</span></Link>)}
                    
                   
                </div>
                <div className={style.title}>
                    <Link style={{textDecoration:'none'}} to={`/post/${props.post.id}`}><h3>{props.post.title}</h3></Link>
                </div>
            </div>
        </li>
    )
}

export default SingleLatestPost
