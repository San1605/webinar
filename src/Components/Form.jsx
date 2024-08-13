import React, { useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import details from "../assets/details.svg";
import webinar from "../assets/webinar.svg";
import { webinarContext } from '../Context/GlobalContext';
import { formatTime12Hour, getDayFromDate, parseTime12Hour } from '../Utils/Config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const Form = ({ open, setOpen, webinarData = {} }) => {
      // Context for managing webinar list
    const { setWebinarList, setFilteredList, webinarList } = useContext(webinarContext);
    // State for handling the instructor's image
    const [instructorImage, setInstructorImage] = useState(webinarData.image || null);
   // Function to handle modal close
    const handleClose = () => setOpen(false);

    // State for storing form data
    const [webinarForm, setWebinarForm] = useState({
        id: webinarData.id || Math.random(),
        oratorName: webinarData.oratorName || "",
        oratorCompany: webinarData.oratorCompany || "",
        position: webinarData.position || "",
        topicName: webinarData.topicName || "",
        subtopicName: webinarData.subtopicName || "",
        image: webinarData.image || null,
        date: webinarData.date || "",
        day: webinarData.day || "",
        timeSlot: webinarData.timeSlot || "",
        color: webinarData.color || "#FFB023"
    });

    const [errors, setErrors] = useState({});

    // Function to validate form inputs
    const validate = () => {
        let tempErrors = {};
        if (!webinarForm.oratorName) tempErrors.oratorName = "Instructor Name is required";
        if (!webinarForm.position) tempErrors.position = "Instructor Role is required";
        if (!webinarForm.oratorCompany) tempErrors.oratorCompany = "Instructor Company is required";
        if (!webinarForm.topicName) tempErrors.topicName = "Topics are required";
        if (!webinarForm.subtopicName) tempErrors.subtopicName = "Webinar Title is required";
        if (!webinarForm.date) tempErrors.date = "Start Date is required";
        if (!webinarForm.timeSlot) tempErrors.timeSlot = "Time Slot is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

     // Function to handle form submission
    const handleSave = () => {
        if (validate()) {
             // Update webinar list with the new form data
            const updatedList = webinarList.map(item =>
                item.id === webinarForm.id ? webinarForm : item
            );
             // Add new webinar if it does not already exist
            if (!webinarData.id) {
                updatedList.push(webinarForm);
            }
            setWebinarList(updatedList);
            setFilteredList(updatedList);
            handleClose();
        }
    };

     // Dropzone configuration for handling image uploads
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const url = URL.createObjectURL(file);
            setInstructorImage(url);
            setWebinarForm({ ...webinarForm, image: url });
        },
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                    {webinarData.id ? 'Edit Webinar' : 'Create Webinar'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: "10px" }}>
                    <img src={details} alt="Details Icon" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Instructor Details</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3, mb: 1, flexDirection: { xs: 'column', sm: 'row', width: "100%" } }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'column', width: "70%" } }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">Instructor Name*</Typography>
                            <TextField
                                fullWidth
                                placeholder="Type the instructor name"
                                value={webinarForm.oratorName}
                                onChange={(e) => setWebinarForm({ ...webinarForm, oratorName: e.target.value })}
                                error={!!errors.oratorName}
                                helperText={errors.oratorName}
                                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                            />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body2">Instructor Role*</Typography>
                            <TextField
                                fullWidth
                                placeholder="Type the instructor role"
                                value={webinarForm.position}
                                onChange={(e) => setWebinarForm({ ...webinarForm, position: e.target.value })}
                                error={!!errors.position}
                                helperText={errors.position}
                                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                            />
                        </Box>
                    </Box>
                    <Box {...getRootProps()} sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 1,
                        height: 84,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: '100%', sm: 100 },
                        cursor: 'pointer',
                        objectFit: 'cover',
                        padding: 0
                    }}>
                        <input {...getInputProps()} />
                        {instructorImage ? (
                            <img src={instructorImage} alt="Instructor" style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <Typography>+</Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">Instructor Company*</Typography>
                        <TextField
                            fullWidth
                            placeholder="Type the instructor company"
                            value={webinarForm.oratorCompany}
                            onChange={(e) => setWebinarForm({ ...webinarForm, oratorCompany: e.target.value })}
                            error={!!errors.oratorCompany}
                            helperText={errors.oratorCompany}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">Topics*</Typography>
                        <TextField
                            fullWidth
                            placeholder="Type the topic"
                            value={webinarForm.topicName}
                            onChange={(e) => setWebinarForm({ ...webinarForm, topicName: e.target.value })}
                            error={!!errors.topicName}
                            helperText={errors.topicName}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: "10px" }}>
                    <img src={webinar} alt="Webinar Icon" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Webinar Details</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Webinar Title*</Typography>
                    <TextField
                        fullWidth
                        placeholder="Type the webinar title"
                        value={webinarForm.subtopicName}
                        onChange={(e) => setWebinarForm({ ...webinarForm, subtopicName: e.target.value })}
                        error={!!errors.subtopicName}
                        helperText={errors.subtopicName}
                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5', padding: "0px" } }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">Start Date*</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={webinarForm.date}
                            onChange={(e) => {
                                const newDate = e.target.value;
                                setWebinarForm({ ...webinarForm, date: newDate, day: getDayFromDate(newDate) });
                            }}
                            error={!!errors.date}
                            helperText={errors.date}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">Start Time*</Typography>
                        <TextField
                            fullWidth
                            type="time"
                            value={parseTime12Hour(webinarForm.timeSlot.split(" - ")[0])}
                            onChange={(e) => {
                                const newStartTime24 = e.target.value;
                                const newStartTime12 = formatTime12Hour(newStartTime24);
                                const endTime24 = parseTime12Hour(webinarForm.timeSlot.split(" - ")[1]);
                                setWebinarForm({
                                    ...webinarForm,
                                    timeSlot: `${newStartTime12} - ${formatTime12Hour(endTime24)}`
                                });
                            }}
                            error={!!errors.timeSlot}
                            helperText={errors.timeSlot && "Start Time is required"}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">End Time*</Typography>
                        <TextField
                            fullWidth
                            type="time"
                            value={parseTime12Hour(webinarForm.timeSlot.split(" - ")[1])}
                            onChange={(e) => {
                                const newEndTime24 = e.target.value;
                                const newEndTime12 = formatTime12Hour(newEndTime24);
                                const startTime24 = parseTime12Hour(webinarForm.timeSlot.split(" - ")[0]);
                                setWebinarForm({
                                    ...webinarForm,
                                    timeSlot: `${formatTime12Hour(startTime24)} - ${newEndTime12}`
                                });
                            }}
                            error={!!errors.timeSlot}
                            helperText={errors.timeSlot && "End Time is required"}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#0E51F1',
                            color: '#fff',
                            borderRadius: 2,
                            padding: '6px 16px',
                            fontSize: 15,
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#0B41C1'
                            }
                        }}
                        onClick={handleSave}
                    >
                        {webinarData.id ? 'Update Webinar' : 'Create Webinar'}
                    </Button>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#0E51F1",
                            fontSize: 15,
                            textTransform: "none",
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
};

export default Form;
