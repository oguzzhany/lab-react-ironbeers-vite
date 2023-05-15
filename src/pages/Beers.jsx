import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Beers() {
  const [beers, setBeers] = useState([]);

  // Fetch Data
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`https://ih-beers-api2.herokuapp.com/beers`);
      console.log(response);
      if (response.status === 200) {
        const parsed = await response.json();
        setBeers(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <>
      <Link to={`/`}>HomePage</Link>
      <h1>All Beers</h1>
      {beers.map((beer) => (
        <div key={beer._id}>
          <img src={beer.image_url} alt="" />
          <Link to={`/beers/${beer._id}`}>
            <h2>{beer.name}</h2>
          </Link>
          <h4>{beer.tagline}</h4>
          <h5>{beer.contributed_by}</h5>
        </div>
      ))}
    </>
  );
}

export default Beers;
