import React from "react";
import styles from "./HomeContent.module.css";
import { Link } from "react-router-dom";
import { getCurrentUserDecks } from "../../services/deckService";
import { ListBox, ListBoxItem } from "react-aria-components";

export default function HomeContent() {
  const [decks, setDecks] = React.useState();
  React.useEffect(() => {
    async function loadDecks() {
      const decks = await getCurrentUserDecks();
      setDecks(decks);
    }
    loadDecks();
  }, []);

  if (!decks) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>Trending Decks</h2>
      <div>X Y Z</div>
      <h3>Decks</h3>
      <ListBox
        items={decks}
        aria-label="Deck list"
        className={styles.container}
      >
        {(item) => (
          <ListBoxItem
            id={item._id}
            textValue="Deck details"
            className={styles.rowBox}
          >
            <Link to={`../decks/${item._id}/session`}>
              <div className={styles.bigCard}>
                <div>{item.deckName}</div>
                <div>{item.description}</div>
              </div>
            </Link>
          </ListBoxItem>
        )}
      </ListBox>

      <Link to="dashboard">View more</Link>
    </div>
  );
}
