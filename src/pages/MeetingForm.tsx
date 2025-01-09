import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from 'axios';
import { useNavigate } from 'react-router';

export enum STATUS {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
}

export interface meetingDTO {
  userId: string;
  date: string;
  time: string;
  duration: string;
  hostId: string;
  guestId: string;
  guestEmail: string;
  status?: STATUS;
  description: string;
  title: string;
}

interface MeetingFormProps {
  onSubmit: (meeting: meetingDTO) => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onSubmit }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [hostEmail, setHoststEmail] = React.useState('');
  const navigate = useNavigate()
  const minChars = 70;
  const maxChars = 100;

  const handleSubmit = () => {
    if (!date || !time || !duration || !title || !guestEmail) {
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return;
    }

    const meeting: meetingDTO = {
      userId: '', 
      date: new Date(date).toISOString(),
      time: time,
      duration,
      hostId: hostEmail, 
      guestId: guestEmail,
      guestEmail: guestEmail,
      status: STATUS.PENDING,
      description,
      title,
    };

    if (meeting.description.length <= maxChars && description.length >= minChars) {
      alert(`Description exceeds maximum character limit of ${maxChars}`);
      return
    }

    axios.post('http://localhost:3000/v1/meetings', meeting).then(() => {
      navigate('/')
      enqueueSnackbar('Meeting scheduled successfully!', { variant: 'success' });
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 4,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MeetingRoomIcon sx={{ mr: 2 }} />
        <Typography variant="h5" component="h2">
          Schedule a New Meeting
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <TextField
          id="title"
          label="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TextField
          id="guestEmail"
          label="Guest Email"
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TextField
          id="date"
          label="Date (YYYY-MM-DD)"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TextField
          id="time"
          label="Time (HH:mm)"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          id="duration"
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TextField
          id="hostEmail"
          label="Host Email"
          type="email"
          value={hostEmail}
          onChange={(e) => setHoststEmail(e.target.value)}
          sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px' }}
        />
      </Box>
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        helperText={`${description.length}/${maxChars} characters (minimum ${minChars} characters required)`}
        error={description.length < minChars} // Display error if below minimum
        sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '100%' }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#008080',
          color: '#fff',
          borderRadius: '4px',
          padding: '12px 24px',
          '&:hover': {
            backgroundColor: '#006666'
          },
          '&:focus': {
            outline: 'none',
          },
          transition: 'background-color 0.2s ease-in-out',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '1rem',
        }}
        onClick={handleSubmit}
      >
        Schedule Meeting
      </Button>
    </Box>
  );
};

export default MeetingForm;