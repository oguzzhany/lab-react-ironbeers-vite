import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBeer = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [first_brewed, setFirst_brewed] = useState("");
  const [brewers_tips, setBrewers_tips] = useState("");
  const [attenuation_level, setAttenuation_level] = useState(0);
  const [contributed_by, setContributed_by] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    const payload = {
      name,
      tagline,
      description,
      first_brewed,
      brewers_tips,
      attenuation_level,
      contributed_by,
    };
    try {
      const response = await fetch(
        `https://ih-beers-api2.herokuapp.com/beers/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 200) {
        console.log("All good");
        const newBeer = await response.json();
        // Navigate to the details page
        console.log(response);
        navigate(`/beers/${newBeer._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to={`/`}>HomePage</Link>
      <h1>Create</h1>
      <form
        style={{ display: "grid", gridTemplate: "repeat(8, 1fr) / auto" }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label>
          Tagline:
          <input
            value={tagline}
            onChange={(event) => {
              setTagline(event.target.value);
            }}
          />
        </label>
        <label>
          Description:
          <input
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        <label>
          First Brewed:
          <input
            value={first_brewed}
            onChange={(event) => {
              setFirst_brewed(event.target.value);
            }}
          />
        </label>
        <label>
          Brewers Tips:
          <input
            value={brewers_tips}
            onChange={(event) => {
              setBrewers_tips(event.target.value);
            }}
          />
        </label>
        <label>
          Attenuation Level:
          <input
            type="number"
            value={attenuation_level}
            onChange={(event) => {
              setAttenuation_level(event.target.value);
            }}
          />
        </label>
        <label>
          Contributed By:
          <input
            value={contributed_by}
            onChange={(event) => {
              setContributed_by(event.target.value);
            }}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBeer;
