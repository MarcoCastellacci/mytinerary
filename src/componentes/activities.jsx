import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { getActivitiesByItinerary } from '../firebase/firebase';

export default function Activity(props) {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        async function getData() {
            const resActivities = await getActivitiesByItinerary(props.activities)
            if (resActivities === null) {
                setActivities([])
            } else {
                setActivities([resActivities])
            }
        }
        getData()
    }, [props])
    console.log(activities);

    if (activities.length > 1) {
        return (
            <>
                <Card sx={{ width: '80vw', marginLeft: '2.5rem', marginY: '2rem', bgcolor: 'rgba(255, 255, 255, 0.306)', color: 'whitesmoke', }}>
                    {activities.map((activity, index) =>
                        <CardActionArea key={index}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={activity.image}
                                alt="picture"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {activity.name}
                                </Typography>
                                <Typography variant="body2">
                                    {activity.info}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    )}
                </Card>
            </>
        );
    }
    return (
        <>
            <Card sx={{ width: '80vw', marginLeft: '2.5rem', marginY: '2rem', bgcolor: 'rgba(255, 255, 255, 0.306)', color: 'whitesmoke', }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={activities[0].image}
                        alt="picture"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {activities[0].name}
                        </Typography>
                        <Typography variant="body2">
                            {activities[0].info}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}
