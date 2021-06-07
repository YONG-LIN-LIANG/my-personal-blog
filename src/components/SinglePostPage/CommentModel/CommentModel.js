import React, {useState, useEffect} from 'react'
import style from './CommentModel.module.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import dummyPic from './logo192.png';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';
import {tillNow} from '../../Public/calculation';
import LikeDislikeForComment from '../../LikeDislike/LikeDislikeForComment';
import {domain} from '../../domain';
const CommentModel = (props) => {
    const [showReply, setShowReply] = useState(false);
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const toggleReplyArea = () =>{
        setShowReply(!showReply)
    }

    
    const handleSubmit = () => {
        const variables ={
            writerId: localStorage.getItem('loginUserId'),
            content:comment,
            responseTo:props.comment.id,
            postId:props.postId
        }
        axios.post(`${domain}/comment/saveReply`, variables)
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.data)
                    props.refreshFunction(res.data.data)
                    setComment('');
                    setShowReply(false)
                }
            })
    }
  
    useEffect(()=>{
        axios.post(`${domain}/comment/getUser`, {writerId:props.comment.writer})
            .then(res=>{
                if(res.data.success){
                    setUser(res.data.user);
                }
            })
    },[])
    if (user){
        return (
        
            <div className={style.commentModel}>
                <div className={style.left}><img src={dummyPic}/></div>
                <div className={style.right}>
                    <div className={style.top}>
                        <h5>{user[0].username}</h5>
                        <span>{tillNow(props.comment.createdAt)}</span>
                    </div>
                    <h5 className={style.center}>{props.comment.content}</h5>
                    <div className={style.bottom}>
                        <LikeDislikeForComment commentId={props.comment.id}/>
                        <button onClick={toggleReplyArea}>Reply</button>
                    </div>
                    
                        {showReply && 
                            <div className={style.handleReplyer}>
                                <div className={style.replyer}><img src={dummyPic}/></div>
                                
                                <div className={style.enterArea}>
                                <TextareaAutosize value={comment} onChange={(e)=>setComment(e.target.value)} className={style.textarea} placeholder='Say something...' />
                                <div class={style.cancelSubmit}>
                                    <button onClick={()=>setShowReply(false)}>Cancel</button>
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                                </div>
                                
                            </div>
                        }
    
                        
                </div>
            </div>
        )
    }
    else{

        return ''
    }
    
}

export default CommentModel
