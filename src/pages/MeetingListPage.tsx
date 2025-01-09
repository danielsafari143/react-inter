import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import EmailIcon from '@mui/icons-material/Email';
import DurationIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { CANCELLED } from 'dns';

export enum STATUS {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
}

export interface meetingDTO {
  id: string;
  userId: string;
  date: string;
  time: string;
  timezone: string;
  duration: string;
  hostId: string;
  guestId: string;
  guestEmail: string;
  status?: STATUS;
  description: string;
  title: string;
}

export const MeetingDetails = () => {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [userData, setUserData] = React.useState();
  const location = useLocation();
  const navigate = useNavigate();


  React.useEffect(() => {
    axios.get(`http://localhost:3000/v1/meetings/${location.state.id}`).then((data) => {
      setUserData(data.data.data)
      const event = data.data.data as unknown as meetingDTO
      setDate(event.date);
      setTime(event.timezone)
      setDescription(event.description)
      setTitle(event.title)
      setGuestEmail(event.guestEmail)
      setStatus(event.status!)
      setDuration(event.duration)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const { enqueueSnackbar } = useSnackbar();

  const handleEdit = () => {
    navigate('/edit', { state: { data: userData } })
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/v1/meetings/${location.state.id}`).then(() => {
      navigate('/')
    }).catch((error) => {
      console.error(error)
    })
    enqueueSnackbar('Delete meeting functionality not yet implemented.', { variant: 'info' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 4
      }}
    >
      <Typography variant="body1" component="article" sx={{ textAlign: 'center', mb: 4 }}>
        {description || 'No description provided.'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {title || 'No title provided.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <LockOpenIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {status ? `Status: ${status}` : 'Meeting Status: Unknown'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <CalendarTodayIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Date: {date}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <WatchLaterIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Time: {time}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <EmailIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Guest Email: {guestEmail}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <DurationIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Duration: {duration} minutes
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ ml: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={async () => {
                await axios.patch(`http://localhost:3000/v1/meetings/${location.state.id}`, { status: STATUS.ACCEPTED })
                .then(()=> setStatus(STATUS.ACCEPTED))
              }}
            >
              Accepted
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={async () => {
                await axios.patch(`http://localhost:3000/v1/meetings/${location.state.id}`, { status: STATUS.CANCELED })
                .then(()=> setStatus(STATUS.CANCELED))
              }}
            >
              Canceled
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
