import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscribe = (props) => {
    const [subscriber, setSubscriber] = useState(0);
    const [subscribeStatus, setSubscribeStatus] = useState(false);
    const userTo = parseInt(props.userTo);
    const userFrom = parseInt(props.userFrom);
    const subscribeNumberVariables = {
        userTo:userTo,
        userFrom:userFrom
    }
    useEffect(()=>{
        axios.post('http://localhost:5000/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(res=>{
                if(res.data.success){
                    setSubscriber(res.data.subscriberNum)
                }
                else{
                    alert('something wrong');
                }
            })

        axios.post('http://localhost:5000/subscribe/subscribeStatus', subscribeNumberVariables)
            .then(res=>{
                if(res.data.success){
                    setSubscribeStatus(res.data.subscribe);
                  
                }
                else{
                    console.log(res.data)
                }
            })
        
    },[])

    const handleBtn = () => {
        if(subscribeStatus){
            //if already subscribed
            axios.post('http://localhost:5000/subscribe/unSubscribe', subscribeNumberVariables)
                .then(res=>{
                    if(res.data.success){
                        console.log(res.data.success)
                        setSubscribeStatus(false)
                    }
                    else{
                        alert('fail to subscribe');
                    }
                   
                })
        }
        else{
            //if havent subscribed yet
            axios.post('http://localhost:5000/subscribe/subscribe', subscribeNumberVariables)
                .then(res=>{
                    if(res.data.success){
                        console.log(res.data.success)
                        setSubscribeStatus(true)
                    }
                    else{
                        alert('fail to subscribe');
                    }
                    
                })
        }
    }

    const style = subscribeStatus ? (
        {
            background:'#ccc',
            color:'#888',
            padding: '10px 20px',
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            marginLeft: '10px'
        }
    )
        : ({
            
            background: 'crimson',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            marginLeft: '10px'
        })
    return (
        <div>
            <button 
            style={style} 
            onClick={handleBtn}>
            {
                subscribeStatus ?(
                    'SUBSCRIBED'
                )
                :(
                    'SUBSCRIBE'
                )
            }
            </button>



        </div>
    )
}

export default Subscribe
