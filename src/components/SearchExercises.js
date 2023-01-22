import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Button, TextField, Typography } from '@mui/material'

import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';



const SearchExercises = () => {

  // Logic for search
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyPart(['all', ...bodyPartData]);
    }

    fetchExerciseData();
  }, [])


  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      const searchedExercise = exerciseData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
          || exercise.target.toLowerCase().includes(search)
          || exercise.equipment.toLowerCase().includes(search)
          || exercise.bodyPart.toLowerCase().includes(search));
      setSearch('')
      setExercises(searchedExercise);
    }
  }

  return (
    <Stack alignItems="center" mt="30px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', sx: '30px' } }} mb="50px" textAlign="center">
        Awesome Exercises You<br />Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: "20px"
            },
            width: { lg: '800px', xs: '450px' },
            backgroundColor: "#fff",
            borderRadius: '40px'
          }}
          height="76px"
          onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className='search-btn'
          onClick={handleSearch}
          sx={{
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
        >Search</Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExercises