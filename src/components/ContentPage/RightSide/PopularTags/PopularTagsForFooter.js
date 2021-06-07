import React,{useState, useEffect} from 'react'
import style from './PopularTagsForFooter.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {domain} from '../../domain';
const PopularTags = () => {
    const [tags, setTags] = useState([]);
    useEffect(()=>{
        const fetchTags = ()=>{
            return axios.get(`${domain}/blog/getAllTags`)
                .then(res=>{
                    if(res.data.success){
                        return {
                            tags:res.data.allTags
                        }
                    }
                })
        }
        const fetchData = async()=>{
            const data = await fetchTags();
            setTags(data.tags)
        }
        fetchData();
    },[])
    return (
        <div className={style.popularTags}>
            <div className={style.title}>Tags</div>
            <div className={style.tags}>
            {tags && 
                tags.map((tag, index)=>{
                    return <Link key={index} style={{textDecoration:'none'}} className={style.link} to='#'><span>{tag}</span></Link>
                })
            }
            </div>

        </div>
    )
}

export default PopularTags
