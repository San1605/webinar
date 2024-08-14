import React, { useContext, useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { webinarContext } from '../Context/GlobalContext.jsx';

const Header = () => {
    const { webinarList, setFilteredList } = useContext(webinarContext)
    const [query, setQuery] = useState("");// Search query state
    const [selectedFilter, setSelectedFilter] = useState("All");// Selected filter state

    const [currentList, setCurrentList] = useState(webinarList); // State for the list currently being viewed


    // Function to apply search on the current list
    const handleSearch = () => {
        let filteredWebinars = currentList;

        filteredWebinars = filteredWebinars.filter(item =>
            (item.topicName && item.topicName.toLowerCase().includes(query.toLowerCase())) ||
            (item.subtopicName && item.subtopicName.toLowerCase().includes(query.toLowerCase())) ||
            (item.oratorName && item.oratorName.toLowerCase().includes(query.toLowerCase())) ||
            (item.oratorCompany && item.oratorCompany.toLowerCase().includes(query.toLowerCase())) ||
            (item.position && item.position.toLowerCase().includes(query.toLowerCase())) ||
            (item.date && item.date.toLowerCase().includes(query.toLowerCase())) ||
            (item.day && item.day.toLowerCase().includes(query.toLowerCase()))
        );


        setFilteredList(filteredWebinars);
    }

    // Function to apply filter on the original list
    const handleFilter = () => {
        let filteredWebinars = webinarList;
        if (selectedFilter !== "All") {
            filteredWebinars = filteredWebinars.filter(item =>
                item.topicName === selectedFilter
            );
        }

        setCurrentList(filteredWebinars);
        setFilteredList(filteredWebinars); // This also updates the filtered list with the filter applied
    }

    // Apply filter when selectedFilter changes
    useEffect(() => {
        handleFilter();
    }, [selectedFilter]);

    // Apply search when query or currentList changes
    useEffect(() => {
        handleSearch();
    }, [query, currentList]);


    // Get unique topics for the filter dropdown

    const uniqueTopics = ["All", ...new Set(webinarList.map(item => item.topicName))];

    return (
        <Box
        className="HeaderBox"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                gap: 2,
                width: "100%",
                px: 5,
                background: "white",
                // padding: "2px 8px"
            }}
        >
            {/* Search input field */}
            <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                borderRadius={14}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ width: "30%", minWidth: 200, borderRadius: "20px", backgroundColor: "white", padding: "5px" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            {/* Filter dropdown */}
            <FormControl variant="outlined" size="small">
                <InputLabel id="topics-label">Topics</InputLabel>
                <Select
                    labelId="topics-label"
                    id="topics-select"
                    label="Topics"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}// Update selectedFilter state on change
                    sx={{
                        width: "fitContent",
                        minWidth: 150,
                        borderRadius: "10px"
                    }}
                >
                    {/* Map over unique topics to create dropdown menu items */}
                    {uniqueTopics.map((topic, index) => (
                        <MenuItem key={index} value={topic}>{topic}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default Header;