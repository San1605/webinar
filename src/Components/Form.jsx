import React, { useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Modal, TextField, IconButton } from '@mui/material';
import details from "../assets/details.svg";
import webinar from "../assets/webinar.svg";
import { webinarContext } from '../Context/GlobalContext';
import { formatTime12Hour, getDayFromDate, parseTime12Hour } from '../Utils/Config';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 700 },
    maxHeight: '95vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    // px: 3,
    py: 1,
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
        id: webinarData.id || uuidv4(),
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
        const [startTime, endTime] = webinarForm.timeSlot.split(" - ");
        console.log(startTime, endTime)
        if (!endTime || endTime === "" || endTime?.includes("NaN")) {
            tempErrors.endTime = "End Time is required";
        }
        if (!startTime || startTime === "" || startTime?.includes("NaN")) {
            tempErrors.startTime = "Start Time is required";
        } else {
            const startDateTime = new Date(`${webinarForm.date} ${parseTime12Hour(startTime)}`);
            if (startDateTime < new Date()) {
                tempErrors.startTime = "Start time cannot be in the past";
            }
        }

        if (!endTime || endTime === "" || endTime?.includes("NaN")) {
            tempErrors.endTime = "End Time is required";
        } else if (startTime) {
            const startDateTime = new Date(`${webinarForm.date} ${parseTime12Hour(startTime)}`);
            const endDateTime = new Date(`${webinarForm.date} ${parseTime12Hour(endTime)}`);
            if (endDateTime <= startDateTime) {
                tempErrors.endTime = "End time must be after start time";
            }
        }
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
            <Box className="formBox" sx={style}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    pb: 0.5,
                    px: 3,
                    borderBottom: "1px solid #E3E7EC"
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600, fontSize: "18px" }}>
                        {webinarData.id ? 'Edit Webinar' : 'Create Webinar'}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: "10px", px: 3 }}>
                    <img src={details} alt="Details Icon" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2E333B", fontSize: 15 }}>Instructor Details</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 3, mb: 1, px: 3, ml: 5, flexDirection: { xs: 'row', sm: 'row', width: "90%" } }}>
                    <Box sx={{ display: 'flex', height: "100%", gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'column', width: "50%" } }}>
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
                        {/* <Box sx={{ display: 'flex', gap: 2, mb: 1, px: 3, ml: 5, flexDirection: { xs: 'column', sm: 'row' } }}> */}
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

                        {/* </Box> */}
                    </Box>
                    <Box sx={{ display: 'flex', alignContent: "space-between", height: "100%", gap: 2, justifyContent: "flex-start", width: "50%", flexDirection: { xs: 'column', sm: 'column' } }}>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">Instructor Image</Typography>
                            <Box {...getRootProps()} sx={{
                                border: '2px dashed #ccc',
                                borderRadius: 4,
                                height: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: '100%', sm: 100 },
                                cursor: 'pointer',
                                objectFit: 'cover',
                                padding: 0,
                            }}>
                                <input {...getInputProps()} />
                                {instructorImage ? (
                                    <img src={instructorImage} alt="Instructor" style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>+</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, mt: 0.5 }}>
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
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', px: 3, mb: 2, mt: 2, gap: "10px" }}>
                    <img src={webinar} alt="Webinar Icon" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2E333B", fontSize: 15 }}>Webinar Details</Typography>
                </Box>

                <Box sx={{ mb: 2, px: 3, ml: 5 }}>
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

                <Box sx={{ display: 'flex', ml: 5, gap: 2, mb: 2, px: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ flex: 1,  maxWidth: { xs: "100%", sm: "25%" } }}>
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
                            InputProps={{
                                inputProps: {
                                    min: new Date().toISOString().split("T")[0]
                                }
                            }}
                        />

                    </Box>
                    <Box sx={{ flex: 1,  maxWidth: { xs: "100%", sm: "25%" } }}>
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
                            error={!!errors.startTime}
                            helperText={errors.startTime}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                    <Box sx={{ flex: 1,  maxWidth: { xs: "100%", sm: "25%" } }}>
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
                            error={!!errors.endTime}
                            helperText={errors.endTime}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' } }}
                        />
                    </Box>
                </Box>

                <Box sx={{ mt: 4, mb: 1, display: 'flex', px: 3, justifyContent: 'flex-start' }}>
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
