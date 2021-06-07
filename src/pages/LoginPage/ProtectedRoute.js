import React from 'react'
import { Route, Redirect } from 'react-router-dom';
//isAuth用來確認使用著是否有登入，有登入的話ˋ就能進入下面的Route
//component的prop是表示這個protected route要給哪個component使用
//...rest是抓取剩下的props
export const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
    //每個Route都會render，用render function會需要props
    return (
        <Route {...rest} render={(props) => {
            //判斷使用者是否已認證(isAuth)
            if (isAuth) {
                //如果isAuth為true通常會使用在表示使用者已登入，就能進入Component
                return <Component />
            }
            else {
                return (
                    //如果為false的話，這裡設定把他導到'/login'這個路徑，這個範例為登入畫面，state: { from: props.location }}}為從哪裡試圖想進入component的位址
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }

        }} />
    )


}
export const ProtectedRouteForLogin = ({ isAuth: isAuth, component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => {
   
            if (!isAuth) {
          
                return <Component />
            }
            else {
                return (
            
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }

        }} />
    )


}


