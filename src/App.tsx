import './App.css';
import CardMeeting from './components/Card';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#008080',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const WelcomeMessage = ({email} : {email: string}) => {
  return (
    <StyledTypography variant="h6">
      Welcome {email} to Your Event Hub!
      <br />
      Explore and join exciting events happening today.
    </StyledTypography>
  );
};

function App() {
  const [events, setData] = React.useState({ 
    id:'',
    meetingsYoureAttending: [], 
    meetingsYoureHosting: [] 
  });
  const data = useOutletContext<{email: string, id: string}>(); 
  const navigate = useNavigate();
 
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/v1/users/${data.id? data.id: navigate('/login')}`)
      .then((data) => {
        setData({ 
          id:data.data.data.id,
          meetingsYoureAttending: data.data.data.guestMeetings, 
          meetingsYoureHosting: data.data.data.hostedMeetings 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        p: 4, 
        backgroundColor: '#f0f0f0', 
        borderRadius: 'md', 
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)', 
      }}> 
      <WelcomeMessage email={data.email}/>

      {events.meetingsYoureAttending.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Meetings You're Attending</Typography>
          <Divider />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {events.meetingsYoureAttending.map((e:any) => (
              <CardMeeting time={e.timezone} key={e.id} id={e.id} date={e.date} description={e.description} title={e.title} />
            ))}
          </Box>
        </Box>
      )}

      {/* Meetings You're Hosting */}
      {events.meetingsYoureHosting.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Meetings You're Hosting</Typography>
          <Divider />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {events.meetingsYoureHosting.map((e: any) => (
              <CardMeeting time={e.timezone} key={e.id} date={e.date} id={e.id} description={e.description} title={e.title} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;