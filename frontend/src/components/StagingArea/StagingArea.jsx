import React from "react";
import styles from "./StagingArea.module.css";
import PlayButtonIcon from "../PlayButtonIcon/PlayButtonIcon";
import { useParams } from "react-router-dom";
import { getCardsByDeckId } from "../../services/cardService";
import { loadDeck } from "../../services/deckService";
import CardCarousel from "../CardCarousel/CardCarousel";
import CardCarouselVertical from "../CardCarouselVertical/CardCarouselVertical";

export default function StagingArea() {
  const { deckId } = useParams();
  const [cards, setCards] = React.useState([]);
  const [deckInfo, setDeckInfo] = React.useState();
  React.useEffect(() => {
    async function loadCards() {
      const fetchedCards = await getCardsByDeckId(deckId);
      setCards(fetchedCards);
    }
    async function loadDeckInfo() {
      const info = await loadDeck(deckId);
      setDeckInfo(info);
    }
    loadCards();
    loadDeckInfo();
  }, [deckId]);

  if (!cards || !deckInfo) {
    return <h1>Loading...</h1>;
  }

  const isDeckEmpty = cards.length === 0;

  return (
    <div className={styles.stagingAreaWrapper}>
      <CardCarousel items={cards} />
      <div className={styles.playBtnContainer}>
        {isDeckEmpty ? (
          <div>
            The deck currently has no cards. Please add cards using the menu
            (three dots) above.
          </div>
        ) : (
          <PlayButtonIcon color={"var(--primary-color)"} />
        )}
      </div>
      <section className={styles.deckInfo}>
        <h2>{deckInfo.deckName}</h2>
        <div className={styles.secondaryDeckInfo}>
          <div>{deckInfo.description}</div>
          <span>{cards.length} terms</span>
        </div>
      </section>
      <CardCarouselVertical cards={cards} />
    </div>
  );
}
