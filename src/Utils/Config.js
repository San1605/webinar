import profile from "../assets/profiles.png"

// sample webinars
export const webinarCards = [
    {
        id: 1,
        oratorName: "Mathew Mating",
        oratorCompany: "Google",
        position: "Frontend Lead Developer",
        topicName: "Frontend Engineering",
        subtopicName: "React Native",
        image: profile,
        date: "2024-08-20",
        day: "Tuesday",
        timeSlot: "10:00 AM - 11:30 AM",
        color: "#741DE3"
    },
    {
        id: 2,
        oratorName: "Samantha Lee",
        oratorCompany: "Facebook",
        position: "Product Manager",
        topicName: "Product Design",
        subtopicName: "User Experience",
        image: profile,
        date: "2024-08-21",
        day: "Wednesday",
        timeSlot: "12:00 PM - 1:30 PM",
        color: "#E72174"
    },
    {
        id: 3,
        oratorName: "James O'Connor",
        oratorCompany: "Microsoft",
        position: "Senior Software Engineer",
        topicName: "Backend Development",
        subtopicName: "Azure Cloud Services",
        image: profile,
        date: "2024-08-22",
        day: "Thursday",
        timeSlot: "2:00 PM - 3:30 PM",
        color: "#08A79E"
    },
    {
        id: 4,
        oratorName: "Emily Watson",
        oratorCompany: "Amazon",
        position: "Data Scientist",
        topicName: "Data Science",
        subtopicName: "Machine Learning",
        image: profile,
        date: "2024-08-23",
        day: "Friday",
        timeSlot: "4:00 PM - 5:30 PM",
        color: "#0E51F1"
    },
    {
        id: 5,
        oratorName: "John Doe",
        oratorCompany: "Netflix",
        position: "DevOps Engineer",
        topicName: "DevOps",
        subtopicName: "Continuous Integration",
        image: profile,
        date: "2024-08-24",
        day: "Saturday",
        timeSlot: "9:00 AM - 10:30 AM",
        color: "#FFB023"
    },
    {
        id: 6,
        oratorName: "Sarah Parker",
        oratorCompany: "Tesla",
        position: "AI Researcher",
        topicName: "Artificial Intelligence",
        subtopicName: "Autonomous Driving",
        image: profile,
        date: "2024-08-25",
        day: "Sunday",
        timeSlot: "11:00 AM - 12:30 PM",
        color: "#088761"
    },
];


// function for gettig day form date
export const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' }; // 'short' for abbreviated names like "Mon", "Tue"
    return new Intl.DateTimeFormat('en-US', options).format(date);
};


// Utility function to convert 24-hour time format to 12-hour format with AM/PM
export const formatTime12Hour = (time24) => {
    if (time24) {
        const [hours, minutes] = time24.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert 0 hour to 12
        return `${hours12?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')} ${ampm}`;
    }
};

// Utility function to convert 12-hour time format to 24-hour format
export const parseTime12Hour = (time12) => {
    if (time12) {
        const [time, ampm] = time12.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        return `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}`;
    }
};


