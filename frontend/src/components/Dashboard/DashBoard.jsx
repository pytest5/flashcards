import { useState, useEffect } from "react";
import { getCurrentUserDecks } from "../../services/deckService";
import { GridList, GridListItem, Button } from "react-aria-components";
// import "./Dashboard.module.css";
import { Link } from "react-router-dom";
import styles from "./DashBoard.module.css";
import SmallCard from "../SmallCard/SmallCard";
import CardCarouselVertical from "../CardCarouselVertical/CardCarouselVertical";
import { BsThreeDots } from "react-icons/bs";

export default function Dashboard() {
  const [decks, setDecks] = useState([]);

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
    <div className={styles.dashboardWrapper}>
      <h2>Your Decks</h2>
      <GridList aria-label="My Decks" className={styles.dashboardListWrapper}>
        {decks.map((deck) => (
          <GridListItem key={deck._id} textValue={deck.deckName}>
            <div className={styles.dashboardItemWrapper}>
              <Link
                to={`/decks/${deck._id}/session`}
                style={{
                  textDecoration: "none",
                  color: "var(--dark-variation)",
                }}
              >
                {deck.deckName}
              </Link>
              <Link to={`/decks/${deck._id}/edit`}>
                <BsThreeDots color={"var(--medium-variation"} />
              </Link>
            </div>
          </GridListItem>
        ))}
      </GridList>
    </div>
  );
}
