import { ListBox, ListBoxItem } from "react-aria-components";
import styles from "./JoshStaging.module.css"
// import { FaRegCirclePlay } from "react-icons/fa6";
import PlayButtonIcon from "../PlayButtonIcon/PlayButtonIcon";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { loadDeck } from "../../services/deckService";
import { getCardsByDeckId } from "../../services/cardService";

const mockDecks = [
  { id: 1, answer: "花", audioSrc: "www.test.com" },
  { id: 2, answer: "草", audioSrc: "www.test.com" },
  { id: 3, answer: "树", audioSrc: "www.test.com" },
];

export default function JoshStagingArea() {
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const onLoad = async () => {
            const promises = [loadDeck("66d20205d84ee450ba640999"), getCardsByDeckId("66d20205d84ee450ba640999")];
            const result = await Promise.all(promises);
            const [loadedDeck, cards] = result;
            loadedDeck.cards = cards
            setDeck(loadedDeck);
        };
        onLoad();
    }, []);

    console.log(deck);
  return (
    <>
        <h1>Test</h1>
    </>
    // <div className={styles.stagingAreaWrapper}>

    //   <PlayButtonIcon />
    //   <section className={styles.deckInfo}>
    //     <h2>{deck.deckName}</h2>
    //     <span>3 terms</span>
    //     <div>{deck.description}</div>
    //   </section>
    //   <ListBox
    //     items={mockDecks}
    //     className={`${styles.container} ${styles.column}`}
    //   >
    //     {(item) => (
    //       <ListBoxItem key={item.id} className={styles.columnBox}>
    //         <div className={styles.smallCard}>
    //           <span className={styles.smallCardAnswer}>{item.answer}</span>{" "}
    //           <HiOutlineSpeakerWave /> <FaRegStar />
    //         </div>
    //       </ListBoxItem>
    //     )}
    //   </ListBox>
    // </div>
  );
}
