import React, {useState, useEffect, useCallback} from 'react'
import style from './Footer.module.css';
import logo from '../Nav/logo.jpeg';
import { Link } from 'react-router-dom';
import SingleLatestForFooter from '../ContentPage/RightSide/SingleLatestpost/SingleLatestForFooter';
import PopularTagsForFooter from '../ContentPage/RightSide/PopularTags/PopularTagsForFooter';
import {useSelector} from 'react-redux';
import AuthApi from '../../pages/LoginPage/AuthApi';
import {domain} from '../../domain';
import axios from 'axios';
const Footer = () => {
    const [recentPosts, setRecentPosts] = useState([]);
  
    const fetchRecentPost = ()=>{
        return axios.get(`${domain}/blog/getLatestPostForFooter`)
            .then(res=>{
                if(res.data.success){
                    return {
                        posts:res.data.latestPosts
                    }
                }
            })
    }
    const fetchingData = useCallback(()=>{
        const fetchData = async()=>{
            const data = await fetchRecentPost();
            setRecentPosts(data.posts)
            
        }
        fetchData();
    },[])
    useEffect(()=>{
        fetchingData()
    },[])
  

    return (
        <div className={style.footer}>
            <div>
                <div className={style.left}>
                    <div className={style.logo}><h3>STEVEN</h3></div>
                    <p className={style.content}>Pellentesque placerat tincidunt urna, vitae feugiat magna vestibulum non. Mauris ut sagittis est. Pellentesque a felis est. Duis in risus metus. Cras felis ante, sodales eget pretium eu, hendrerit at metus. Maecenas aliquam dictum sapien id ornare.</p>
                    <span className={style.socialMedia}>
                        <Link className={style.link} to='#'><i className="fab fa-twitter"></i></Link>
                        <Link className={style.link} to='#'><i className="fab fa-facebook-f"></i></Link>
                    </span>
                </div>
                <div className={style.center}>
                    <div className={style.top}><h3>Recent posts</h3></div>
                    <ul className={style.items}>
                        {recentPosts && recentPosts.map(post => <SingleLatestForFooter key={post.id} post={post} />)}
                    </ul>
                </div>
                <div className={style.right}>
                    <PopularTagsForFooter />
                </div>
            </div>
            <div className={style.copyright}>
                <p style={{display:'inline-block', lineHeight:'60px'}}>&copy; 2021 Blog created by&nbsp; </p><p style={{ display:'inline-block', lineHeight:'60px'}} className={style.author}>Steven</p>
            </div>
        </div>
    )
}

export default Footer
