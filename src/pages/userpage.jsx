import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Authprovider from '../componentes/authprovider';
import { useNavigate } from 'react-router-dom';




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UserProfile() {
    const [user, setUser] = useState([])
    const [expanded, setExpanded] = useState(false);
    const [userState, setUserState] = useState("")
    const navigate = useNavigate();


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    async function handleUserLoggedIn(user) {
        setUser(user)
        setUserState("user")
    }
    async function handleUserNotRegister(user) {
        setUser(user)
        setUserState('notConfirmed')
    }
    async function handleUserNotLoggedIn() {
        navigate('/login')
    }

    if (userState === "user" || userState === "notConfirmed") {
        return (
            <>
                <div className="main">
                    {user ?
                        <Card sx={{ width: '70vw', bgcolor: 'rgba(0, 0, 0, 0.651)', marginY: '5rem', height: { xl: '30vw' }, }}>
                            <CardHeader sx={{ color: 'whiteSmoke' }}
                                avatar={
                                    <Avatar sx={{ bgcolor: 'black', }} aria-label="recipe">
                                        {user.displayName.charAt(0)}
                                    </Avatar>
                                }
                                title={user.displayName}
                            />
                            <CardMedia
                                component="img"
                                width='20%'
                                image={user.photoURL}
                                alt="User Profile Picture"
                            />
                            <CardContent>
                                <Typography variant="body2" color="white">
                                    This is my profil info.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    color="primary"
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Typography variant='h6' sx={{ color: 'whitesmoke' }}>My Likes</Typography>
                                <CardContent>
                                    <Typography paragraph sx={{ color: 'whitesmoke' }}>
                                        Here is gonna appear my likes collections.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                        :
                        <CardContent sx={{ height: '100vh' }}>
                            <Typography variant='h3' sx={{ color: 'whitesmoke', bgcolor: 'rgba(0, 0, 0, 0.651)', width: '80vw', textAlign: 'center', borderRadius: '20px', marginTop: '5rem' }}>
                                You need to sign in to see your profile.
                            </Typography>
                        </CardContent>
                    }
                </div>
            </>
        );
    }
    return <Authprovider onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegister={handleUserNotRegister}
        onUserNotLoggedIn={handleUserNotLoggedIn}>
    </Authprovider>
}
