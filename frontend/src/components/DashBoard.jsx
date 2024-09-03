import { useState, useEffect } from "react";
import { getDecksByUserId } from "../services/deckService";
import { GridList, GridListItem, Button } from "react-aria-components";
// import "./Dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      const userDecks = await getDecksByUserId("66d17ae8e1a667e4592afeea");
      console.log(userDecks);
      setDecks(userDecks);
    };
    onLoad();
  }, []);
  return (
    <>
      <h2>Your Decks</h2>
      <GridList aria-label="My Decks">
        {decks.map((deck) => (
          <GridListItem key={deck._id} textValue={deck.deckName}>
            <Link to={`/decks/${deck._id}/session`}>{deck.deckName}</Link>
            <Link to={`/decks/${deck._id}/edit`}><Button>...</Button></Link>
          </GridListItem>
        ))}
      </GridList>
    </>
  );
}
