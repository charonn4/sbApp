import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import s from "../NavBar/NavBar.module.css";
import {Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogout, setRegister} from "../../../store/reducers/userReducer";



const Header = styled(MuiAppBar)`
  z-index: 1300;
  background: white;
  height: 64px;
`

const Heading = styled(Typography)`
  color: #757272;
  font-size: 22px;
  line-height: 24px;
  padding-left: 8px;
`
const BoxContainer = styled(Box)`
  display: flex;
  align-items: center;
`
const HeaderButton = styled(ListItemButton)`
  border-radius: 8px;
`

const AppbarHeader = ({handleDrawer}) => {
    // если авторизация уже прошла не показываем кнопки регистрация и авторизация
    const isAuthorized = useSelector (state => state.user.isAuthorized)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutLocal = () => {
        // чтобы локально сбрасывал state что мы зарегестрированы или же авторизованы
        dispatch(setLogout(false))
        dispatch(setRegister(false))
        navigate("/authorization")
    }
    return (
        <Header>
            <Toolbar sx={{
                justifyContent: 'space-between'
            }}>
                <BoxContainer>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        sx={{
                            marginRight: 2
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Heading>TestTaskDotnet</Heading>
                </BoxContainer>
                {
                    isAuthorized ?
                        <button onClick={logoutLocal} className={s.link} >
                            <HeaderButton
                                sx={{
                                    px: 1.9,
                                }}>
                                <ListItemText sx={{margin: 0}} primary={'Выйти'} />
                            </HeaderButton>
                        </button>
                        :
                    <BoxContainer>
                        <Link className={s.link} to={'/authorization'} >
                            <HeaderButton
                                sx={{
                                    px: 1.9,
                                }}>
                                <ListItemText sx={{margin: 0}} primary={'Войти'} />
                            </HeaderButton>
                        </Link>
                        <Link className={s.link} to={'/registration'} >
                            <HeaderButton
                                sx={{
                                    px: 1.9,
                                }}>
                                <ListItemText sx={{margin: 0}} primary={'Регистрация'}  />
                            </HeaderButton>
                        </Link>
                    </BoxContainer>
                }
            </Toolbar>

        </Header>
    );
};

export default AppbarHeader;