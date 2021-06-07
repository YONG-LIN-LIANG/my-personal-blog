import React, {useState, useEffect} from 'react'

const useRWD = () => {
    
    const [parallaxDevice, setParallaxDevice] = useState('mobile');
    const handleRWD = () => {
        
        if(window.innerWidth<=1318){
            setParallaxDevice('stopParallax');
        }else{
            setParallaxDevice('normal');
        }
    }
    useEffect(()=>{
        window.addEventListener('resize', handleRWD);
        handleRWD();
        return(()=>{
            window.removeEventListener('resize', handleRWD);
        })
    },[])
    return parallaxDevice;
        
    
}

export default useRWD
