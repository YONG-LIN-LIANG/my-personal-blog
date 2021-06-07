import React, { useState, useEffect } from 'react'
import style from './DetailVideoPage.module.css';
import NavForSinglePost from '../../components/Nav/NavForSinglePost';
import axios from 'axios';
import VideoModel from '../../components/VideoModel/VideoModel';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import CommentAreaForVideo from '../../components/SinglePostPage/CommentArea/CommentAreaForVideo';
import Subscribe from '../../components/Public/Subscribe';
import SideVideo from '../../components/SideVideo/SideVideo';
import { set } from 'js-cookie';
import {domain} from '../../domain';
import LikeDislikeForVideo from '../../components/LikeDislike/LikeDislikeForVideo';
const useStyles = makeStyles((theme) => ({
    avatar: {
        paddingRight: '20px',
    },
}));

export function ImageAvatars() {
    const classes = useStyles();

    return (
        <div className={classes.avatar}>
            <Avatar style={{ width: '50px', height: '50px' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
    );
}
const DetailVideoPage = (props) => {

    const [videoInfo, setVideoInfo] = useState([]);
    const [id, setId] = useState('')
    const loginUserId = localStorage.getItem('loginUserId');
    const [commentList, setCommentList] = useState([]);
    const [replyNum, setReplyNum] = useState(0);
    const updateComment = (newComment) => {
        // setCommentList(commentList.concat(newComment));
        setCommentList(commentList.concat(newComment))
        setReplyNum(prev=>prev+1);
    }
    

    useEffect(() => {
        const id = props.match.params.id;
        setId(id)
        axios.post(`${domain}/video/singleVideo`, { id: id })
            .then(res => {
                if (res.data.success) {
                    setVideoInfo(res.data.result[0])
                }
                else {
                    alert('Fail to get video detail');
                }
            })
        axios.post(`${domain}/comment/getComment`,{videoId: id})
            .then(res=>{
                if(res.data.success){
                        setReplyNum(res.data.comments.length)
                        setCommentList(res.data.comments.reverse());
                }
            })

    }, [])

    if (videoInfo.writer) {
        return (
            <div className={style.container}>
                <NavForSinglePost />
                <div className={style.content}>
                    <div className={style.leftSide}>
                        <VideoModel video={videoInfo.filePath} />
                        <div className={style.detailAndComment}>
                            <div className={style.titleAndViewsAndDate}>
                                <h3>{videoInfo.title}</h3>
                                <span>Views:{videoInfo.views}次。{moment(videoInfo.createdAt).format('YYYY年MM月DD日')}</span>
                            </div>
                            <div className={style.authorAndDescription}>
                                <div className={style.author}>
                                    <ImageAvatars />
                                    <div className={style.nameAndSubscribers}>
                                        <h4>{videoInfo.writer}</h4>
                                        <span>24.5萬 位訂閱者</span>
                                    </div>

                                    {videoInfo.userId == loginUserId ? (
                                        ''
                                    )
                                        : (
                                            <div className={style.likeSubscribe}>
                                                <LikeDislikeForVideo videoId={id} />
                                                <Subscribe userTo={videoInfo.userId} userFrom={loginUserId} />
                                            </div>
                                        )

                                    }


                                </div>
                                <div className={style.description}>
                                    {videoInfo.description}
                                </div>
                            </div>
                            <CommentAreaForVideo replyNum={replyNum} commentList={commentList} postId={videoInfo.id} refreshFunction={updateComment}/>
                        </div>
                    </div>

                    <SideVideo id={id} />


                </div>
                
            </div>

        )
    }
    else {
        return <div>Loading page...</div>
    }

}

export default DetailVideoPage
