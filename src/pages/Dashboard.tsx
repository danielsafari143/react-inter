import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import { styled } from '@mui/material/styles';
import { Outlet, useLocation, useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import { AppBar, Toolbar, Typography } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Dashboard: React.FC = () => {
    const [state, setState] = React.useState({
        left: false,
    });

    const location = useLocation()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user")!)

    const toggleDrawer = (anchor: string, open: boolean) => (
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent
    ) => {
        if (
            (event.type === 'keydown' &&
                (
                    (event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift'
                )
            ) ||
            event.type === 'backdropClick'
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: string) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, bgcolor: 'white', color: 'black' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
        >
            <List>
                {['Meetings', 'Create Event'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() =>  {index % 2 === 0 ? navigate('/', {state:{user}}): navigate('events', {state:{}})}}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <GroupsIcon /> : <EventIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <React.Fragment key={'left'}>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { xs: '100%', sm: 'calc(100% - 250px)' },
                    bgcolor: 'grey.100'
                }}
            >
                <AppBar position="static">
                    <Toolbar variant="regular" sx={{flex:'row', bgcolor:'teal' , justifyContent:'space-between'}}>
                        <Typography variant="h6" color="inherit" component="div">
                            Meetings
                        </Typography>
                        <DrawerHeader>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => setState({ ...state, left: true })}
                            >
                                <MenuIcon />
                            </IconButton>
                        </DrawerHeader>
                    </Toolbar>
                </AppBar>
                <Outlet context={user}/>
            </Box>
        </Box>
    );
};

export default Dashboard;