import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { Link as RouterLink } from "react-router-dom";
import { getCities } from '../firebase/firebase';


function CardCities() {
    const [cities, setCities] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function getData() {
            const resCities = await getCities()
            setCities([...resCities])
            setAllCities([...resCities]);
        }
        getData()
    }, [])

    useEffect(() => {
        function filterCities() {
            if (search === '') {
                setCities([...allCities]);
            } else {
                const filteredCities = allCities.filter(city =>
                    city.name.toLowerCase().includes(search.toLowerCase())
                );
                setCities(filteredCities);
            }
        }
        filterCities()
        // eslint-disable-next-line
    }, [search]);




    function handleFilter(e) {
        setSearch(e.target.value)
    }


    return (
        <>
            <div className="search">
                <input placeholder="Busca tu Ciudad" type="text" value={search} onChange={handleFilter} />
            </div>
            <ImageList sx={{
                width: '90vw', margin: '2.5rem', display: 'grid',
                gridGap: '1rem',
                justifyContent: 'center',
            }}>
                <p style={{ display: 'none' }}>Hola</p>
                {cities.length > 0 ? cities.map((city, index) =>
                    <ImageListItem key={index} className="image-list-item">
                        <img
                            src={`${city.image}?w=248&fit=crop&auto=format`}
                            srcSet={`${city.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={city.name}
                            loading="lazy"
                        />
                        <RouterLink to={`/cities/city/${city._id}`}>
                            <ImageListItemBar
                                title={city.name}
                                subtitle={city.country}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${city.name}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </RouterLink>
                    </ImageListItem>) :
                    <div className='main-cities'>
                        <Typography variant="h1" color="white" sx={{ textAlign: 'center', width: '85vw', backgroundColor: 'rgba(0, 0, 0, 0.651)' }} >
                            No cities found
                        </Typography>
                    </div>
                }
            </ImageList>
        </>
    )
}

export default CardCities;