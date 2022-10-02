import React from 'react';
import s from './NavBar.module.css'
import {Link, NavLink} from "react-router-dom";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const NavBar = ({open}) => {
    const itemList = [
        {id: 1, name: 'Создать заявку', icon: <NoteAddIcon/>, url: '/create'},
        {id: 2, name: 'Мои заявки', icon: <SnippetFolderIcon/>, url: '/requests'},
        {id: 3, name: 'История заявок', icon: <WorkHistoryIcon/>, url: '/history'}
    ]
    return (
        <List>
            {itemList.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                    <Link className={s.link} to={item.url} >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
        </List>
        // <div className={s.nav}>
        //     <div>
        //         <NavLink to={'/create'} className={navData => navData.isActive ? s.active : s.item}>Создание заявок</NavLink>
        //     </div>
        //     <div>
        //         <NavLink to={'/authorization'} className={navData => navData.isActive ? s.active : s.item}>Авторизация</NavLink>
        //     </div>
        //     <div>
        //         <NavLink to={'/registration'} className={navData => navData.isActive ? s.active : s.item}>Регистрация</NavLink>
        //     </div>
        //     <div>
        //         <NavLink to={'/requests'} className={navData => navData.isActive ? s.active : s.item}>Мои заявки</NavLink>
        //     </div>
        // </div>
    );
};

export default NavBar;