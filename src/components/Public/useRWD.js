import React, {useState, useEffect} from 'react'

const useRWD = () => {
    const [device, setDevice] = useState('mobile');
    const handleRWD = () => {
        
        if(window.innerWidth>830){
            setDevice('Ipad&PC');
        }else{
            setDevice('mobile');
        }
    }
    useEffect(()=>{
        window.addEventListener('resize', handleRWD);
        handleRWD();
        return(()=>{
            window.removeEventListener('resize', handleRWD);
        })
    },[])
    return device;
        
    
}

export default useRWD
