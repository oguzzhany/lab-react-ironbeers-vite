import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BeerDetails = () => {
  const { beerId } = useParams();
  const navigate = useNavigate();

  const [beer, setBeer] = useState();

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://ih-beers-api2.herokuapp.com/beers/${beerId}`
      );
      if (response.status === 200) {
        const parsed = await response.json();
        setBeer(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Call the fetch at the right time
  useEffect(() => {
    fetchCharacter();
  }, [beerId]);

  return beer ? (
    <>
      <Link to={`/`}>HomePage</Link>
      <img src={beer.image_url} alt="" />
      <h1>Details about {beer.name}</h1>
      <p>{beer.tagline}</p>
    </>
  ) : (
    <h1>Loading informations about your beer</h1>
  );
};

export default BeerDetails;
