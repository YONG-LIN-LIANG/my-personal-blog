import React, { useState, useEffect } from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';
import domain from '../../domain';
const LikeDislike = (props) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeNum, setLikeNum] = useState(0);
    const [dislikeNum, setDislikeNum] = useState(0);

    useEffect(() => {
        const variables = {
            commentId: props.commentId,
            userId: localStorage.getItem('loginUserId')
        }
        axios.post(`${domain}/likeDislike/getLike`, variables)
            .then(res => {
                if (res.data.success) {
                    setLikeNum(res.data.like)
                }
            })
        axios.post(`${domain}/likeDislike/getDislike`, variables)
            .then(res => {
                if (res.data.success) {
                    // console.log('comment dislike:'+res.data.dislike)
                    setDislikeNum(res.data.dislike)
                }
            })
        axios.post(`${domain}/likeDislike/getStatus`, variables)
            .then(res => {
                if (res.data.success) {
                    if (res.data.changeLike) {
                        setLiked(true)
                    }
                    if (res.data.changeDislike) {
                        setDisliked(true)
                    }
                }
            })
    }, [])


    const handleLike = () => {

        if (liked === false) {
            setLiked(true)
            setDisliked(false)
        }
        if (liked === true) {
            setLiked(false)
        }
        const variables = {
            commentId: props.commentId,
            userId: localStorage.getItem('loginUserId'),
            liked: liked,
            disliked: disliked,
            message: 'thumbUpClicked'
        }
        axios.post(`${domain}/likeDislike/track`, variables)
            .then(res => {
                if (res.data.success) {
                    if (res.data.message == 'addThumbUp') {
                        setLikeNum(prev => prev + 1)
                    }
                    if (res.data.message == 'addUpAndMinus') {
                        setLikeNum(prev => prev + 1)
                        setDislikeNum(prev => prev - 1)
                    }
                    if (res.data.message == 'deleteThumbUp') {
                        setLikeNum(prev => prev - 1)
                    }

                }
            })

    }
    const handleDislike = () => {

        if (disliked === false) {
            setDisliked(true);
            setLiked(false)
        }
        if (disliked === true) {
            setDisliked(false);
        }
        const variables = {
            commentId: props.commentId,
            userId: localStorage.getItem('loginUserId'),
            liked: liked,
            disliked: disliked,
            message: 'thumbDownClicked'
        }
        axios.post(`${domain}/likeDislike/track`, variables)
            .then(res => {
                if (res.data.success) {
                    if (res.data.message == 'addThumbDown') {
                        setDislikeNum(prev => prev + 1)
                    }
                    if (res.data.message == 'addUpAndMinus') {
                        setDislikeNum(prev => prev + 1)
                        setLikeNum(prev => prev - 1)
                    }
                    if (res.data.message == 'deleteThumbDown') {
                        setDislikeNum(prev => prev - 1)

                    }

                }
            })
    }

    return (
        <div style={{ display: 'flex', marginRight: '10px' }}>
            <div onClick={handleLike} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {liked ? (
                    <ThumbUpAltIcon style={{ color: 'green', transform: 'scale(.8)' }} />
                ) : (

                        <ThumbUpAltOutlinedIcon style={{ color: '#888', transform: 'scale(.8)' }} />
                    )
                }
                <span style={
                    liked ? (
                        { marginLeft: '3px', color: 'green' }
                    ) : (
                            { marginLeft: '3px', color: '#888' }
                        )
                }>{likeNum}</span>
            </div>
            <div onClick={handleDislike} style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {disliked ? (
                    <ThumbDownIcon style={{ color: '#dc143c', transform: 'scale(.8)' }} />
                ) : (
                        <ThumbDownAltOutlinedIcon style={{ color: '#888', transform: 'scale(.8)' }} />
                    )
                }
                <span style={
                    disliked ? (
                        { marginLeft: '3px', color: '#dc143c' }
                    ) : (
                            { marginLeft: '3px', color: '#888' }
                        )
                }>{dislikeNum}</span>
            </div>
        </div>
    )
}

export default LikeDislike
