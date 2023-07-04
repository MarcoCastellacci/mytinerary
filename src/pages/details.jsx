import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCitiesById, getItineraryByCities } from "../firebase/firebase";
import { Link as RouterLink } from 'react-router-dom';
import Itinerarys from "../componentes/itinerary";

import '../style/details.css'

export default function Details() {
    const { id } = useParams();
    const [cities, setCities] = useState([])
    const [itinerary, setItinerary] = useState([])

    useEffect(() => {
        async function getData() {
            const resCities = await getCitiesById(id)
            console.log(resCities);
            setCities(resCities)
        }
        getData()
    }, [id])

    useEffect(() => {
        async function getData() {
            const resItineraries = await getItineraryByCities(id)
            if (resItineraries === null) {
                setItinerary([])
            } else {
                setItinerary([resItineraries])
            }
        }
        getData()
    }, [id])

    return (
        <>
            {cities &&
                <div className='main ' key={cities._id}>
                    <div className="city-name">
                        <h3>{cities.name}</h3>
                    </div>
                    <div className='image-detail'>
                        <img src={cities.image} alt="my city" />
                    </div>
                    <div className='description'>
                        <p>{cities.info}</p>
                    </div>
                    <div className='itinerary'>
                        {itinerary.length > 0 ?
                            itinerary.map((itinerary, index) => (
                                <Itinerarys itinerarys={itinerary} key={index} />)) :
                            <div>
                                <h1> No Itineraries Yet </h1>
                            </div>
                        }
                    </div>
                    <div>
                        <RouterLink to={'/cities'}>
                            <button className='button-back'>
                                &#10232; Back to Cities
                            </button>
                        </RouterLink>
                    </div>

                </div>
            }
        </>
    );
}
