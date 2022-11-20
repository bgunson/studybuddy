import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const username = "StuddyBuddy264";

const userpoints = 2743;

const languages = ["English", "Urdu", "Arabic"]
const favoriteSubjects = ["Geometry", "Biology", "Literature"]


const card = (
    <React.Fragment>
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
            <CardHeader title={username}>
                <Typography variant="h5" component="div">
                    {username}
                </Typography>
            </CardHeader>
            <Avatar
                alt="user profile"
                src="https://thispersondoesnotexist.com/image"
                // sx={{ width: 256, height: 256}}
                style={{ width: 256, height: 256 }}
            />
            {/* <Typography sx={{ mb: 1.5,}} color="text.secondary">
        {languages}
      </Typography>
      <Typography variant="body2">
        Languages Spoken:
        <br />
        {languages}
      </Typography> */}
            <div style={{ display:'flex', flexDirection:'column', margin: 20 }}>
                <div
                    style={{
                        marginLeft: 65,
                        marginBottom: 20
                    }}
                >
                    Languages:
                </div>
                <Stack direction="row" spacing={2}>
                    <Item>{languages[0]}</Item>
                    <Item>{languages[1]}</Item>
                    <Item>{languages[2]}</Item>
                </Stack>

                <div
                    style={{
                        marginLeft: 45,
                        marginBottom: 20,
                        marginTop: 20
                    }}
                >
                    Favorite Subjects:
                </div>

                <Stack style={{ marginTop: 20 }} direction="row" spacing={2}>
                    <Item>{favoriteSubjects[0]}</Item>
                    <Item>{favoriteSubjects[1]}</Item>
                    <Item>{favoriteSubjects[2]}</Item>
                </Stack>
            </div>
        </CardContent>
        <CardActions>
            <Button size="small">Share Profile</Button>
        </CardActions>
    </React.Fragment>
);

export function ProfileCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}