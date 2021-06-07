import React, { useState, useEffect } from 'react'
import style from './MainPage.module.css';
import bannerPic from './banner3.jpg';
import AllPost from '../../components/ContentPage/AllPost/AllPost';
import RightSide from '../../components/ContentPage/RightSide/RightSide';
import TagArea from '../../components/TagArea/TagArea';
import Nav from '../../components/Nav/Nav';
import { withRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/Public/LoadingSpinner';
import useParallax from '../../components/Public/useParallax';
const MainPage = () => {
    const parallaxDevice = useParallax();
    const loading = useSelector(state => state.loading.loading);
    const [imgMove, setImgMove] = useState(0);
    const [textMove, setTextMove] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'PAGE_UNLOADING',
                payload: false
            })
        }, 5000)
    }, [])

    const setParallax = () => {
        let value = window.scrollY;
            setImgMove(-value * 0.7)
            setTextMove(value * 0.7)
    }

    useEffect(() => {
        if (parallaxDevice === 'normal') {
            window.addEventListener('scroll', setParallax)
            setParallax()
            return (() => {
                window.removeEventListener('scroll', setParallax)
            })
        }
        
        

    }, [parallaxDevice])
    return (
        <>
            {loading ? <LoadingSpinner /> : null}
            <div className={style.container}>

                <div className={style.banner}>
                    
                    <img style={{ top: `${imgMove}px` }} src={bannerPic} />
                    <h2 style={{ top: `${textMove}px`, fontSize:'5vw' }}>HOME</h2>
                    
                    <Nav />
                </div>
                <TagArea />

                <div className={style.mainContent}>
                    <AllPost />
                    <RightSide />
                </div>
                <Footer />

            </div>
        </>
    )


}

export default withRouter(MainPage)
