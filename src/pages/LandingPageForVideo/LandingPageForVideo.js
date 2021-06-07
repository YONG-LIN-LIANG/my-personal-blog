import React, {useState, useEffect} from 'react'
import style from './LandingPageForVideo.module.css';
import NavForVideoPage from '../../components/Nav/NavForVideoPage';
import CardForVideo from '../../components/Card/CardForVideo';
import axios from 'axios';
import {domain} from '../../domain';
const LandingPageForVideo = () => {
    const [videoList, setVideoList] = useState([])
    useEffect(()=>{
        axios.get(`${domain}/video/getData`)
            .then(res=>{
                if(res.data.success){
                    //利用js的Array.reverse()去反轉陣列，這樣就會把最新的po文擺在最前面
                    setVideoList(res.data.result.reverse());
                }
                else{
                    alert('Fail to get videos');
                }
            })
    },[])
    return (
        <div className={style.container}>
            <NavForVideoPage />
            <div className={style.content}>
                <h2>Recommend</h2>
                <div className={style.videoArea}>
                    {
                        videoList && videoList.map((video)=>{
                            return(
                                <CardForVideo key={video.id} video={video} />
                            )
                            
                        })
                    }
                    
                    
                </div>
            </div>

        </div>
    )
}

export default LandingPageForVideo
