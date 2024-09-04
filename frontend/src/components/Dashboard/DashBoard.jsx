import { useState, useEffect } from "react";
import { getCurrentUserDecks } from "../../services/deckService";
import { GridList, GridListItem } from "react-aria-components";
// import "./Dashboard.module.css";
import { Link } from "react-router-dom";
import EditDeckModal from "../EditDeckModal/EditDeckModal";

export default function Dashboard() {
  const [decks, setDecks] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const onLoad = async () => {
      const userDecks = await getCurrentUserDecks();
      setDecks(userDecks);
    };
    onLoad();
  }, []);

  if (decks.length === 0) {
    return <div>Add a deck!</div>;
  }

  return (
    <>
      <h2>Your Decks</h2>
      <GridList aria-label="My Decks">
        {decks.map((deck) => (
          <GridListItem key={deck._id} textValue={deck.deckName}>
            <Link to={`/decks/${deck._id}/session`}>{deck.deckName}</Link>
            <EditDeckModal deck={deck} setReload={setReload} reload={reload} />
          </GridListItem>
        ))}
      </GridList>
    </>
  );
}
