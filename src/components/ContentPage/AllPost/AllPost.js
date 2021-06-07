import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../Card/Card';
import style from './AllPost.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useRWD from '../../Public/useRWD';
import domain from '../../../domain';
const AllPost = () => {
    const device = useRWD();
    const [oddArticle, setOddArticle] = useState([]);
    const [evenArticle, setEvenArticle] = useState([]);
    const dispatch = useDispatch();
    const pinnedTagPosts = useSelector(state => state.blog.pinnedTagPosts);
    const fetchPosts = () => {
        return axios.get(`${domain}/blog/getPost`)
            .then(res => {
                if (res.data.success) {
                    return {
                        allPosts: res.data.allPost,
                        oddArticle: res.data.oddArticle,
                        evenArticle: res.data.evenArticle
                    }
                }
            })
    }

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const data = await fetchPosts();
            dispatch({
                type: 'POST_UPLOAD',
                payload: data.allPosts
            })
        }
        fetchingData();
    }, [document.body.clientWidth])


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        let filteredOddArticle = pinnedTagPosts.filter((item, index) => index % 2 === 0);
        let filteredEvenArticle = pinnedTagPosts.filter((item, index) => index % 2 !== 0);

        setOddArticle(filteredOddArticle);
        setEvenArticle(filteredEvenArticle);

    }, [pinnedTagPosts])




    if (device==='Ipad&PC') {
        
        return (

            <div className={style.allPost}>
                {pinnedTagPosts.length > 0 ? (
                    <>
                        <div className={style.area1}>
                            {pinnedTagPosts && oddArticle && evenArticle && pinnedTagPosts.length % 2 === 0 ? (
                                evenArticle.map(post => {
                                    return <Card key={post.id} post={post} />
                                })

                            ) : (
                                    oddArticle.map(post => {
                                        return <Card key={post.id} post={post} />
                                    })
                                )}
                        </div>
                        <div className={style.area2}>
                            {pinnedTagPosts && oddArticle && evenArticle && pinnedTagPosts.length % 2 !== 0 ? (
                                evenArticle.map(post => {
                                    return <Card key={post.id} post={post} />
                                })



                            ) : (
                                    oddArticle.map(post => {
                                        return <Card key={post.id} post={post} />
                                    })
                                )}
                        </div>
                    </>
                ) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ color: 'grey', fontWeight: '600' }}>You don't have any post yet.</h3><h3 style={{ color: 'grey', fontWeight: '600' }}>Starting creating one!</h3>
                        </div>
                    )

                }




            </div>
        )
    }
    else{
        if (device==='mobile') {
            return (
                <div className={style.allPost}>
                    {pinnedTagPosts.length > 0 ? (
                        <>
                            <div className={style.area3}>
                                {
                                    pinnedTagPosts && pinnedTagPosts.map((post)=>{
                                        return(
                                            <Card key={post.id} post={post}/>
                                        )
                                    })
                                }
                            </div>
                            
                        </>
                    ) : (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ color: 'grey', fontWeight: '600' }}>You don't have any post yet.</h3><h3 style={{ color: 'grey', fontWeight: '600' }}>Starting creating one!</h3>
                            </div>
                        )
    
                    }
    
    
    
    
                </div>
            )
        }
    }
    
}



export default AllPost
