import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { AccessTime, WatchLater, CalendarToday } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

interface MeetingFormProps {
  onSubmit: (meeting: { date: string; time: string; duration: string }) => void;
}

const EditForm: React.FC<MeetingFormProps> = ({ onSubmit }) => {
  const location = useLocation()
  const dateYY = location.state.data.date.slice(0, 10);
  const [date, setDate] = React.useState(dateYY);
  const [time, setTime] = React.useState(location.state.data.time);
  const [duration, setDuration] = React.useState(location.state.data.duration);
  const theme = useTheme();
  const navigate = useNavigate()


  const handleSubmit = async () => {
    const data = location.state.data
    data.date = new Date(date).toISOString();
    data.time = time;
    data.duration = duration;

    await axios.put(`http://localhost:3000/v1/meetings/${data.id}`, data).then(() => {
      navigate('/details', { state: { id: data.id } })
    }).catch((e) => {
      console.log(e)
    })
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="primary">
          <CalendarToday />
        </IconButton>
        <TextField
          id="date"
          label="Date (YYYY-MM-DD)"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px', flex: 1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="primary">
          <WatchLater />
        </IconButton>
        <TextField
          id="time"
          label="Time (HH:mm)"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px', flex: 1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="primary">
          <AccessTime />
        </IconButton>
        <TextField
          id="duration"
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: '#fff', borderRadius: '4px', flex: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        endIcon={<EditIcon />}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
          borderRadius: '4px',
          padding: '12px 24px',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
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
        Edit Meeting
      </Button>
    </Box>
  );
};

export default EditForm;