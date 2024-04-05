import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import '../home/home.scss';
const filterChips = [
  { name: 'Flats', value: 'Flats' },
  { name: 'PG', value: 'PG' },

  { name: 'Commercial', value: 'Commercial' },
  { name: 'Residential', value: 'Residential' },
  { name: 'Plot', value: 'Plot' },
  { name: 'Rental', value: 'Rental' },

  { name: '1Bhk', value: '1Bhk' },
  { name: '2Bhk', value: '2Bhk' },
  { name: '3Bhk', value: '3Bhk' },
  { name: '3+Bhk', value: '3+Bhk' },
  { name: 'Villas', value: 'Villas' },

  { name: 'Farm-House', value: 'Farm-House' },
];
export const LocationAndFilter = ({ setFilterParams, filterParams }) => {
  const [location, setLocation] = useState({});

  const setSelectedChip = (name) => {
    setFilterParams(name);
  };

  const getLocationParams = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        getExactLocation(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const getExactLocation = async (latitude, longitude) => {
    try {
      const api_key = process.env.REACT_APP_LOCATION_API_KEY;
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { country, state, name } = data[0] || {};
      setLocation({ country: country, state: state, city: name });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getLocationParams();
  }, []);

  const handleChipClick = (item) => {
    setSelectedChip(item.name);
  };

  return (
    <Card sx={{ marginTop: '10px', margin: '10px', padding: '10px' }}>
      <Grid container gap={3}>
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent style={{ backgroundColor: 'rgb(77, 135, 250,0.4)' }}>
              <Typography textAlign={'center'}>
                {location.city ? (
                  <Button color="text" startIcon={<LocationOnIcon />}>
                    <Typography fontWeight={550}>
                      {location?.city || ''},<spa> {location?.state || ''}</spa>, {location?.country || ''}
                    </Typography>
                  </Button>
                ):(
                  <Skeleton variant="rounded" width={300}  />
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={8} xs={12}>
          <CardContent>
            <Grid container gap={2}>
              {filterChips.map((item, index) => {
                return (
                  <Grid key={index} item onClick={() => handleChipClick(item)}>
                    <Chip className={'chip-hover'} style={{ cursor: 'pointer', backgroundColor: filterParams === item.name && 'rgba(39, 195, 44, 0.7)' }} label={item.name} variant="outlined" />
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
