import React, { useState } from 'react'
import style from './CommentArea.module.css';
import CommentModel from '../CommentModel/CommentModel';
import dummyPic from '../CommentModel/logo192.png';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const CommentArea = () => {

    const [showBtns, setShowBtns] = useState(false);
    return (
        <div className={style.commentArea}>
            <h4>3 replies</h4>
            <div className={style.mainComment}>
                <div className={style.personalPic}><img src={dummyPic} /></div>
                <div className={style.enterArea}>
                    <TextareaAutosize  className={style.textarea} placeholder='Say something...' onClick={()=>setShowBtns(true)} />
                    {showBtns &&
                        <div class={style.cancelSubmit}>
                            <button onClick={()=>setShowBtns(false)}>Cancel</button>
                            <button>Submit</button>
                        </div>
                    }

                </div>
            </div>
            <CommentModel />
        </div>
    )
}

export default CommentArea
