import React,{ useState, useEffect} from 'react'
import ReactLoading from 'react-loading';
import './LoadingSpinner.css';
const LoadingSpinner = () => {
    const [color, setColor] = useState('#48c8e580');
    useEffect(()=>{
        setTimeout(()=>{
            setColor('#ffffff00')
        },2000)
    },[])
    return (
        <div className='spinner'>
        <ReactLoading type={'balls'} height={100} width={100} color={color} />
        </div>
    )
}

export default LoadingSpinner
