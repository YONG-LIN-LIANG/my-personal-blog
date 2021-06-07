import React from 'react'
import style from './CardForVideo.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {videoDuration} from '../Public/calculation';
const useStyles = makeStyles((theme) => ({
    left: {
        '& > *': {
            marginRight: '15px'
        },
    },
}));

export function ImageAvatars() {
    const classes = useStyles();

    return (
        <div className={classes.left}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
    );
}
const CardForVideo = (props) => {
    const { video } = props;
    return (
        <div className={style.container}>
            <Link to={`/recommendVideo/${video.id}`}>
                <div className={style.img}>
                    <img src={`http://localhost:5000/${video.thumbnail}`} />
                    <span className={style.duration}>{videoDuration(video.duration)}</span>
                </div>
            </Link>

            <div className={style.intro}>
                <ImageAvatars />
                <div className={style.right}>
                    <Link style={{ textDecoration:'none', color:'#000'}} to={`/recommendVideo/${video.id}`}>
                        <h5>{video.title}</h5>
                    </Link>
                    <Link className={style.profileLink} to='#'>
                        <h5>{video.writer}</h5>
                    </Link>

                    <span>{video.views} views</span>
                    <span>{moment(video.createdAt).format('MMM Do YY')}</span>
                </div>
            </div>
        </div>
    )
}

export default CardForVideo
