import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar, AvatarGroup, Box, Chip } from '@mui/material';
import {useNavigate} from 'react-router'

export default function CardMeeting({ time, date, description, title, id }: { time: string, date: string, description: string, title: string, id:string }) {
    const navigate = useNavigate()

    return (
        <Card
            sx={{
                maxWidth: 320,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 5px 15px 0 rgba(0, 0, 0, 0.1)'
                }
            }}
        >
            <CardActionArea>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VideocamIcon color={'success'} sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                            {title}
                        </Typography>
                    </Box>
                    <Chip
                        sx={{
                            backgroundColor: '#008080', // Teal color
                            height: 'auto',
                            padding: 0.2,
                            fontSize: '80%',
                            opacity: 0.5,
                            color: 'white',
                            marginTop: 1
                        }}
                        label={time}
                        onClick={() => { }}
                    />
                    <Typography
                        fontFamily={'Roboto, sans-serif'}
                        variant="body2"
                        sx={{
                            mt: 2,
                            color: '#008080', 
                            fontSize: '0.875rem' 
                        }}
                    >
                        {
                            description
                        }
                    </Typography>
                    <AvatarGroup sx={{ mt: 1 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                    <Button
                        sx={{
                            mt: 1,
                            backgroundColor: '#008080', // Teal color
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#006666' // Darker teal on hover
                            }
                        }}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            navigate('details', {state:{id}})
                        }}
                    >
                        Join
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}