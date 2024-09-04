import React from "react";
import styles from "./HomeContent.module.css";
import { Link } from "react-router-dom";
import { getCurrentUserDecks } from "../../services/deckService";
import { ListBox, ListBoxItem } from "react-aria-components";
import BigCard from "../BigCard/BigCard";

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
    <div className={styles.homeContentWrapper}>
      <section>
        <div className={styles.homeContentHeader}>
          <h3>Trending Decks</h3>
          <Link className={styles.viewMore}>View more</Link>
        </div>
        <div>X Y Z</div>
      </section>
      <section>
        <div className={styles.homeContentHeader}>
          <h3>Your Decks</h3>
          <Link className={styles.viewMore} to="dashboard">
            View more
          </Link>
        </div>
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
              <Link
                className={styles.bigCardLink}
                to={`../decks/${item._id}/session`}
              >
                <BigCard>
                  <div className={styles.deckInfo}>
                    <div className={styles.deckTitle}>{item.deckName}</div>
                    <div className={styles.deckDescription}>
                      {item.description}
                    </div>
                  </div>
                </BigCard>
              </Link>
            </ListBoxItem>
          )}
        </ListBox>
      </section>
    </div>
  );
}
