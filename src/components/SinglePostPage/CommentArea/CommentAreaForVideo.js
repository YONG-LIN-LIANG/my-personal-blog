import React, { useState, useEffect } from 'react'
import style from './CommentArea.module.css';
import CommentModel from '../CommentModel/CommentModel';
import dummyPic from '../CommentModel/logo192.png';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';
import {domain} from '../../domain';
import ReplyComment from './ReplyComment';
const CommentAreaForVideo = (props) => {
   
    const [showBtns, setShowBtns] = useState(false);
    const [comment, setComment] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content:comment,
            writer:localStorage.getItem('loginUserId'),
            //video的id
            postId: props.postId,

        }
        axios.post(`${domain}/comment/saveComment`, variables)
            .then(res=>{
                if(res.data.success){
                    props.refreshFunction(res.data.data)
                    setComment('');
                    setShowBtns(false);
                    
                    //然後把新增的資料送到DetailVideoPage這個component做呈現

                }
            })
            

    }
    
    return (
        <div className={style.commentAreaForVideo}>
            <h4>{props.replyNum} replies</h4>
            
            <div className={style.mainComment}>
                <div className={style.personalPic}><img src={dummyPic} /></div>
                <div className={style.enterArea}>
                    <TextareaAutosize value={comment} onChange={(e)=>setComment(e.target.value)}  className={style.textarea} placeholder='Say something...' onClick={()=>setShowBtns(true)} />
                    {showBtns &&
                        <div class={style.cancelSubmit}>
                            <button onClick={()=>setShowBtns(false)}>Cancel</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    }

                </div>
            </div>
            {props.commentList && props.commentList.map(comment=>{
                return(
                    (!comment.responseTo && 
                    <>
                    
                    <CommentModel comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment parentCommentId={comment.id} commentList={props.commentList} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    </>
                    )
                    
                )
            })}
            
        </div>
    )
}

export default CommentAreaForVideo
