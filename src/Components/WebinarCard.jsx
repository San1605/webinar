import React from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import profile from "../assets/profiles.png"
const WebinarCard = ({ webinar, deleteCard, editCard }) => {
    const {
        oratorName,
        oratorCompany,
        position,
        topicName,
        subtopicName,
        image,
        date,
        day,
        timeSlot,
        color
    } = webinar;
  // Format the date to a readable format
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

     // Fallback image for profile errors

    const handleError = (e) => {
        e.target.src = profile;
    };
    return (
        <Card sx={{ minWidth: 380, borderRadius: 4, boxShadow: 3, overflow: 'visible' }}>
             {/* Card header with orator details */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: color || '#6C63FF',
                    padding: 2,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {oratorName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                        {position}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                        {oratorCompany}
                    </Typography>
                </Box>
                <Avatar
                    src={image}
                    onError={handleError}
                    alt={oratorName}
                    sx={{
                        width: 80,
                        height: 70,
                        borderRadius: "16px"
                    }}
                />
            </Box>
            <CardContent sx={{ pt: 2, pb: 1 }}>
                <Typography variant="body2" color="primary" sx={{ mb: 0.5, color: color }}>
                    {topicName}
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, fontSize: "18px" }}>
                    {subtopicName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${day} • ${formattedDate}, ${timeSlot}`}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                <Button size="small" color="error" sx={{ mr: 1, color: '#D14040', fontWeight: 600, fontSize: "14px", borderRadius: "16px", padding: '4px', background: "#F9E8E8", textTransform: 'none' }} onClick={deleteCard}>
                    Delete
                </Button>
                <Button size="small" color="primary" sx={{ color: '#0E51F1', fontWeight: 600, fontSize: "14px", textTransform: 'none' }} onClick={editCard}>
                    Edit
                </Button>
            </Box>
        </Card>
    );
}

export default WebinarCard;