import React, { useState, useEffect} from 'react';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';
import {Switch, Route } from 'react-router-dom';
import { ProtectedRoute, ProtectedRouteForLogin } from './pages/LoginPage/ProtectedRoute';
import AuthApi from './pages/LoginPage/AuthApi';
import Cookies from 'js-cookie';
import UploadVideoPage from './pages/UploadVideoPage/UploadVideoPage';
import LandingPageForVideo from './pages/LandingPageForVideo/LandingPageForVideo';
import DetailVideoPage from './pages/DetailVideoPage/DetailVideoPage';
import SubscriptionPageForVideo  from './pages/SubscriptionPageForVideo/SubscriptionPageForVideo';
import EditorPage from './pages/EditorPage/EditorPage';
import ScrollToTop from './components/Public/ScrollToTop';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    
    const readCookie = () => {
      const user = Cookies.get('user');
      if (user) {
        setIsAuth(true)
      }
    }
    readCookie();
  }, [])
 
  return (
    <div className="App">
     
        <AuthApi.Provider value={{ isAuth, setIsAuth}}>
          <ScrollToTop/>
          <Switch>
            <ProtectedRouteForLogin exact path='/login' component={LoginPage} isAuth={isAuth} />
            <ProtectedRoute exact path='/' component={MainPage} isAuth={isAuth} />
            <Route path='/post/:id' component={SinglePostPage}  />
            <Route exact path='/blog/editor' component={EditorPage}  />
            <Route path='/uploadVideo' component={UploadVideoPage}  />
            <Route exact path='/recommendVideo' component={LandingPageForVideo}  />
            <Route path='/recommendVideo/:id' component={DetailVideoPage}  />
            <Route path='/subscribedVideo' component={SubscriptionPageForVideo}  />
          </Switch>
      </AuthApi.Provider>
    
      
    </div>
  );
}

export default App;
