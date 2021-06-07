import React, { useState, useEffect, useCallback } from 'react'
import style from './SinglePostPage.module.css';
import NavForSinglePost from '../../components/Nav/NavForSinglePost';
import TopLabel from '../../components/SinglePostPage/TopLabel/TopLabel';
import SinglePost from '../../components/SinglePostPage/SinglePost/SinglePost';
import RightSide from '../../components/ContentPage/RightSide/RightSide';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/Public/LoadingSpinner';
import {domain} from '../../domain';
const SinglePostPage = (props) => {
 
    const [post, setPost] = useState('');
    const [filePath, setFilePath] = useState('');
    const [tags, setTags] = useState([]);
    const [writer, setWriter] = useState('');
    const [articleNum, setArticleNum] = useState('');
    const [nowIndex, setNowIndex] = useState('');
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [previousPostId, setPreviousPostId] = useState(0);
    const [nextPostId, setNextPostId] = useState(0);
    const loading = useSelector(state => state.loading.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'PAGE_UNLOADING',
                payload: false
            })
        }, 5000)
    }, [])

    const fetchingAllData = () => {
        let variables = {
            postId: props.match.params.id
        }
        return axios.post(`${domain}/blog/getSinglePage`, variables)
            .then(res => {
                if (res.data.success) {
                    return {
                        filePath: res.data.filePath,
                        post: res.data.result,
                        tags: res.data.tags,
                        writer: res.data.writer,
                        articleNum: res.data.articleNum,
                        nowIndex: res.data.nowIndex,
                        relatedPosts: res.data.relatedPosts,
                        previousIndexPostId: res.data.previousIndexPostId,
                        nextIndexPostId: res.data.nextIndexPostId
                    }
                }
            })
    }
    const fetchData = useCallback(()=>{
        const fetchingData = async () => {
            const data = await fetchingAllData();
            setFilePath(data.filePath)
            setPost(data.post)
            setTags(data.tags)
            setWriter(data.writer)
            setArticleNum(data.articleNum)
            setNowIndex(data.nowIndex)
            setRelatedPosts(data.relatedPosts)
            setPreviousPostId(data.previousIndexPostId)
            setNextPostId(data.nextIndexPostId)
            dispatch({
                type:'NOWINDEX_UPLOAD',
                payload:data.nowIndex
            })
        }
        fetchingData();
    },[post, filePath, tags, writer, articleNum, nowIndex, relatedPosts, previousPostId, nextPostId])



    useEffect(() => {

        fetchData();
}, [])

return (
    <>
    {loading ?<LoadingSpinner/> :null}
    <div className={style.SinglePostPage}>
        <NavForSinglePost />
        <div className={style.main}>
            <TopLabel tags={tags} />
            <div className={style.content}>
                <SinglePost post={post} filePath={filePath} tags={tags} writer={writer} articleNum={articleNum} nowIndex={nowIndex} relatedPosts={relatedPosts} previousPostId={previousPostId} nextPostId={nextPostId} />
                <RightSide />
            </div>
            <Footer/>
        </div>

    </div>
    </>
)
}

export default SinglePostPage
