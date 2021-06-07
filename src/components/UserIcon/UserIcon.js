import React, { useState } from 'react'
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import dummyPic from './logo192.png';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import AuthApi from '../../pages/LoginPage/AuthApi';
import './UserIcon.css';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: '20px',
        cursor: 'pointer',
        position:'relative',
        zIndex:'1',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
//彈跳視窗
function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const Auth = React.useContext(AuthApi);
    const handleLogOut = () => {
        Auth.setIsAuth(false)
        Cookies.remove('user');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('loginUserId');
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div className='userIcon'>
            <div>
                <StyledBadge
                    className={classes.root}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar alt="Remy Sharp" src={dummyPic} />
                </StyledBadge>


                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <Link to='/login' ><MenuItem onClick={handleLogOut}>Logout</MenuItem></Link>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
//彈跳視窗

//大頭貼區塊
const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: '-1.2px',
            left: '-1.3px',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const UserIcon = () => {

    return (
        <>
            <MenuListComposition />
        </>
    )
}
export default UserIcon
