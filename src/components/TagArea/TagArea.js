import React, { useState, useEffect, useCallback } from 'react'
import style from './TagArea.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {handlePinnedTag } from '../Public/calculation';
import domain from '../../domain';
const TagArea = () => {
    const [tags, setTags] = useState(['All']);
    const [pinnedTag, setPinnedTag] = useState('All')
    const posts = useSelector(state => state.blog.posts);
    const dispatch = useDispatch();


    const fetchTags = () => {
        return axios.get(`${domain}/blog/getAllTags`)
            .then(res => {
                if (res.data.success) {
                    return {
                        tags: res.data.allTags
                    }

                }
            })
    }
    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const data = await fetchTags();
            setTags(tags.concat(data.tags))
            dispatch({
                type: 'TAGS_UPLOAD',
                payload: data.tags
            })

        }
        fetchingData();
    }, [])


    useEffect(() => {

        fetchData();

    }, [])
    useEffect(() => {
        if (posts.length > 0) {
            pinnedTag === 'All'
                ? dispatch({
                    type: 'PINNEDTAGPOSTS_UPLOAD',
                    payload: posts
                }) : (

                    dispatch({
                        type: 'PINNEDTAGPOSTS_UPLOAD',
                        payload: handlePinnedTag(posts, pinnedTag)
                    })

                )
        }
    }, [posts, pinnedTag])


    const handleClick = (tag) => {
        setPinnedTag(tag)
    }
    return (
        <div className={style.tagArea}>
            {
                tags.map((tag, index) => {
                    return (
                        <span key={index} 
                            style={pinnedTag === tag ? ({
                                fontWeight: '600',
                                background: '#47c9e5',
                                color: '#fff'
                            }) : (null)}

                            onClick={()=>handleClick(tag)}
                        >{tag}</span>
                    )
                })
            }
        </div>
    )
}

export default TagArea
