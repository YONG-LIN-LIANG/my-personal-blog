import style from './SinglePost.module.css';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
// import CommentArea from '../CommentArea/CommentArea';
import moment from 'moment';
import {handleTags, handleFilePath} from '../../Public/calculation';
import { Link } from 'react-router-dom';

const SinglePost = (props) => {
    return (
        <div className={style.singlePost}>

            <div className={style.imgArea}>
                <img src={`http://localhost:5000/${props.filePath}`} />
            </div>
            {props.post[0] && <h3 className={style.title}>{props.post[0].title}</h3>}

            <div className={style.postDetail}>

                <div className={style.left}>
                    <span>{props.writer ? `by ${props.writer}` : 'Loading...'}</span>

                    {props.post[0] && <span>{moment(props.post[0].createdAt).format('MMMM DD, YYYY')}</span>}

                </div>

                <div className={style.right}>
                    <div className={style.tags}>
                        {props.tags && props.tags.map((tag,index) => <a key={index} style={{ textDecoration: 'none' }} className={style.tagLink}><span>{tag}</span></a>)}


                    </div>
                    <button className={style.comment}>
                        <ChatOutlinedIcon className={style.commentIcon} />
                        <span>2</span>
                    </button>
                </div>

            </div>

            {props.post[0] && <div className={style.content} dangerouslySetInnerHTML={{ __html: props.post[0].content }} />}

            <div className={style.movement}>
                <div className={style.likeShare}>
                    <button className={style.like}>
                        <ThumbUpAltOutlinedIcon className={style.likeIcon} />
                        <span>2</span>
                    </button>
                    <button className={style.share}>
                        <ShareOutlinedIcon />
                        <span>SHARE</span>
                    </button>
                </div>
                {props.articleNum && props.nowIndex &&
                    <div className={style.lastNext}>
                        <button className={style.switchBtn}><Link to={`/post/${props.previousPostId}`}><ArrowBackOutlinedIcon className={style.switchBtnIcon} /></Link></button>
                        <span className={style.nowPage}>{props.nowIndex}</span>
                        <span className={style.seperate}>/</span>
                        <span className={style.maximumPage}>{props.articleNum}</span>
                        <button className={style.switchBtn}><Link to={`/post/${props.nextPostId}`}><ArrowForwardOutlinedIcon className={style.switchBtnIcon} /></Link></button>

                    </div>
                }

            </div>
            {props.relatedPosts.length>0 && 
                <div className={style.relatedPosts}>
                <h3>Related Posts</h3>
                <div className={style.collection}>
                    {
                        props.relatedPosts.map((data,index) => {
                            return (
                                <div key={index} className={style.single}>
                                    <Link to={`/post/${data.id}`} className={style.singleTop}><img src={`http://localhost:5000/${handleFilePath(data.coverFilePath)}`} /></Link>
                                    <h3>{data.title}</h3>
                                    <div className={style.singleBottom}>
                                        <div className={style.singleTag}>
                                            <LocalOfferOutlinedIcon className={style.singleTagIcon} />
                                            <div className={style.singleTagContainer}>
                                                {
                                                    handleTags(data.tags).map((tag, index) => {
                                                     
                                                        return (<Link key={index} className={style.relatedPostTagLink} style={{ textDecoration: 'none' }} to='#'><span>{tag}</span></Link>)
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <button className={style.comment}>
                                            <ChatOutlinedIcon className={style.commentIcon} />
                                            <span>2</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            }
            
            {/* 放commentArea */}
            {/* <CommentArea/> */}
        </div>
    )





}

export default SinglePost
