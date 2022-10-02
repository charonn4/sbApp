import React from "react";
import './App.css';
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RequestCreator from "./components/macroComponents/RequestCreator/RequestCreator";
import Authorization from "./components/macroComponents/Authorization/Authorization";
import Registry from "./components/macroComponents/Registry/Registry";
import Requests from "./components/macroComponents/Requests/Requests";
import SidebarDrawer from "./components/macroComponents/SidebarDrawer/SidebarDrawer";
import History from "./components/macroComponents/History/History";
import ErrorPage from "./components/macroComponents/ErrorPage/ErrorPage";
import {ToastContainer} from "react-toastify";


// styled components + material ui
const MainContainer = styled(Box)`
      display: flex;
      width: 100%;
`


const App = () => {
    return (
            <MainContainer>
                {/*контент оборачиваем routing-ом*/}
                <BrowserRouter>
                    <SidebarDrawer/>
                    <div className='content'>
                        <Routes>
                            {/*если путь пустой то перенаправляет к авторизации*/}
                            <Route path={'/'} element={ <Navigate to="/authorization" />} />
                            <Route path={'/create'} element={<RequestCreator/>}></Route>
                            <Route path={'/authorization'} element={<Authorization/>}></Route>
                            <Route path={'/registration'} element={<Registry/>}></Route>
                            <Route path={'/requests'} element={<Requests/>}></Route>
                            <Route path={'/history'} element={<History/>}></Route>

                             {/*страница 404 */}
                            <Route path={'/404'} element={<ErrorPage/>}></Route>
                        </Routes>
                        {/*toast notify библиотека для алертинга*/}
                        <ToastContainer/>
                    </div>
                </BrowserRouter>
            </MainContainer>
    )
}


export default App;
