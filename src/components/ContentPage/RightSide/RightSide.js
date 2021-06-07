import React, { useState, useEffect, useCallback } from 'react'
import style from './RightSide.module.css';
import SingleLatestPost from './SingleLatestpost/SingleLatestPost';
import Advertisement from './Advertisement/Advertisement';
import SearchFilter from './SearchFilter/SearchFilter';
import PopularTags from './PopularTags/PopularTags';
import axios from 'axios';
import {domain} from '../../domain';
const RightSide = () => {
    const [recentPosts, setRecentPosts] = useState([]);
 
    
    useEffect(()=>{
        const fetchRecentPost = ()=>{
            return axios.get(`${domain}/blog/getLatestPost`)
                .then(res=>{
                    if(res.data.success){
                        return {
                            posts:res.data.latestPosts
                        }
                    }
                })
        }
        const fetchData = async()=>{
            const data = await fetchRecentPost();
            setRecentPosts(data.posts)
        }
        fetchData();
    },[])
  
    return (
        <div className={style.rightSide}>
            <div className={style.top}><h3>Latest posts</h3></div>
            <ul className={style.items}>
                {recentPosts && recentPosts.map(post => <SingleLatestPost key={post.id} post={post} />)}
            </ul>
            <Advertisement />
            <SearchFilter />
            <PopularTags />
        </div>
    )


}

export default RightSide
