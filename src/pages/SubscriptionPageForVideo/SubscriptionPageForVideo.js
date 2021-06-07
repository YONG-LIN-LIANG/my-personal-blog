import React, {useState, useEffect} from 'react'
import style from '../LandingPageForVideo/LandingPageForVideo.module.css';
import NavForSinglePage from '../../components/Nav/NavForSinglePost';
import CardForVideo from '../../components/Card/CardForVideo';
import axios from 'axios';
import domain from '../../domain';
const SubscriptionPageForVideo = () => {
    const [videoList, setVideoList] = useState([])
    const userFrom = parseInt(localStorage.getItem('loginUserId'));
    useEffect(()=>{
        axios.post(`${domain}/video/subscribedVideo`, {userFrom:userFrom})
            .then(res=>{
                if(res.data.success){
                    //利用js的Array.reverse()去反轉陣列，這樣就會把最新的po文擺在最前面
                    console.log(res.data.videos[0])
                    setVideoList(res.data.videos[0].reverse());
                }
                else{
                    alert('Fail to get videos');
                }
            })
    },[])
    return (
        <div className={style.container}>
            <NavForSinglePage />
            <div className={style.content}>
                <h2>Subscribed Videos</h2>
                <div className={style.videoArea}>
                    {
                        videoList && videoList.map((video, index)=>{
                            return(
                                <CardForVideo video={video} />
                            )
                            
                        })
                    }
                    
                    
                </div>
            </div>

        </div>
    )
}

export default SubscriptionPageForVideo
