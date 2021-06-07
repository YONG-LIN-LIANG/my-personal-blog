import React, { useState, useEffect } from 'react';
import style from './SideVideo.module.css';
import axios from 'axios';
import { videoDuration, tillNow } from '../Public/calculation';
import domain from '../../domain';
import {Link} from 'react-router-dom';
const SideVideo = (props) => {
    const [recommendList, setRecommendList] = useState([]);
    const id = props.id;
    useEffect(() => {
        
        axios.get(`${domain}/video/getData`)
            .then(res => {
                if (res.data.success) {
                    const final = res.data.result.filter(data => {
                        return (
                            data.id.toString() !== id
                        )
                    })
                    setRecommendList(final);

                }
                else {
                    alert('Fail to get recommend video list')
                }
            })
    }, [id])

    return (
        <div className={style.rightSide}>
            {
                recommendList && recommendList.map(video => {
                    return (
                        <div className={style.singleRightVideo}>
                            <div className={style.left}>
                                <Link to={`/recommendVideo/${video.id}`}>
                                    {/* 圖片要另外放雲端 */}
                                    <img src={`http://localhost:5000/${video.thumbnail}`} />
                                    <span>{videoDuration(video.duration)}</span>
                                </Link>
                            </div>
                            <div className={style.right}>
                                <Link style={{ textDecoration: 'none', color: '#000' }} to={`/recommendVideo/${video.id}`}>
                                    <h4>{video.title}</h4>
                                    <h5>{video.writer}</h5>
                                    <h5>觀看次數:{video.views}。{tillNow(video.createdAt)}</h5>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )


}

export default SideVideo
