import React from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import profile from "../assets/profiles.png";

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

    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const handleError = (e) => {
        e.target.src = profile;
    };

    return (
        <Card sx={{ 
            width: '100%', 
            maxWidth: '380px', 
            borderRadius: 4, 
            boxShadow: 3, 
            overflow: 'visible',
            margin: 'auto'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: color || '#6C63FF',
                    padding: { xs: 1.5, sm: 2 },
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {oratorName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {position}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {oratorCompany}
                    </Typography>
                </Box>
                <Avatar
                    src={image}
                    onError={handleError}
                    alt={oratorName}
                    sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 50, sm: 70 },
                        borderRadius: "16px"
                    }}
                />
            </Box>
            <CardContent sx={{ pt: 2, pb: 1 }}>
                <Typography variant="body2" color="primary" sx={{ mb: 0.5, color: color, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {topicName}
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                    {subtopicName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {`${day} • ${formattedDate}, ${timeSlot}`}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                <Button 
                    size="small" 
                    color="error" 
                    sx={{ 
                        mr: 1, 
                        color: '#D14040', 
                        fontWeight: 600, 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                        borderRadius: "16px", 
                        padding: '4px', 
                        background: "#F9E8E8", 
                        textTransform: 'none' 
                    }} 
                    onClick={deleteCard}
                >
                    Delete
                </Button>
                <Button 
                    size="small" 
                    color="primary" 
                    sx={{ 
                        color: '#0E51F1', 
                        fontWeight: 600, 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                        textTransform: 'none' 
                    }} 
                    onClick={editCard}
                >
                    Edit
                </Button>
            </Box>
        </Card>
    );
}

export default WebinarCard;