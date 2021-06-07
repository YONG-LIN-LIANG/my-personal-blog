import React from 'react'
import './VideoModel.css';
const VideoModel = (props) => {
    return (
        <div className='videoContainer'>
            <div className='c-video'>
                <video className='video' src={`http://localhost:5000/${props.video}`} controls></video>
                {/* <div className='controls'>
                    <div className='orangeBar'>
                        <div className='orangeJuice'></div>
                    </div>
                    <div className='buttons'>
                        <button id='play-pause'></button>
                    </div>

                </div> */}
            </div>
        </div>
    )
}

export default VideoModel
