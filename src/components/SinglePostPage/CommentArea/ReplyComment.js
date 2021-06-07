import React, { useState, useEffect } from 'react'
import CommentModel from '../CommentModel/CommentModel';

const ReplyComment = (props) => {
    const [childCommentNum, setChildCommentNum] = useState(0);
    const [openReply, setOpenReply] = useState(false);
    useEffect(() => {
        let commentNum = 0;
        props.commentList.map(comment => {
            if (comment.responseTo == props.parentCommentId) {
                commentNum++
            }
            setChildCommentNum(commentNum);
        })
    })


    // 設定一個會重複使用的區塊，因為只要按reply就會再出現以下的component
    const renderReplyComment = (parentCommentId) => {
        return (
            props.commentList.map(comment => {
                return (
                    <>
                        {comment.responseTo === parentCommentId &&

                            <div style={{ marginLeft: '50px', width: '80%' }}>
                                <CommentModel comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                <ReplyComment commentList={props.commentList} parentCommentId={comment.id} postId={props.postId} refreshFunction={props.refreshFunction} />
                            </div>
                        }
                    </>

                )
            })
        )


    }

    return (
        <div>
            {/* 一開始顯示view more 隱藏回復區，按下view more才顯示回復區 */}

            {childCommentNum > 0 &&
                <p style={{ cursor: 'pointer', fontSize: '14px', margin: '5px 0 5px 50px', color: 'gray', textAlign: 'start' }} onClick={() => setOpenReply(!openReply)}>
                    {openReply ? (
                        `Hide all comments`
                    ) : (
                            `View ${childCommentNum} more comment(s)`
                        )}


                </p>
            }

            {openReply && renderReplyComment(props.parentCommentId)}

        </div>
    )
}

export default ReplyComment
