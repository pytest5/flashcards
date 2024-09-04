import { Link } from "react-router-dom";
import { DialogTrigger, Button, Dialog, Popover } from "react-aria-components";
import { deleteDeck } from "../../services/deckService";
import { useNavigate } from "react-router-dom";

import styles from "./EditDeckModal.module.css";

export default function EditDeckModal({ deck, setReload, reload }) {
  const navigate = useNavigate();

  const onClick = (deckId) => {
    const deletedDeck = deleteDeck(deckId);
    setReload(reload += 1)
    navigate("/home/dashboard");
  }

  return (
    <>
      <DialogTrigger>
        <Button aria-label="Options">…</Button>
        <Popover>
          <Dialog>
            {({ close }) => (
              <form>
                <Link to={`/decks/${deck._id}/edit`}>
                  <Button className={styles.formSubmitButton}>Edit Deck</Button>
                </Link>
                <Link to={`/decks/${deck._id}/cards/edit`}>
                  <Button className={styles.formSubmitButton}>
                    Edit Cards
                  </Button>
                </Link>
                <Button className={styles.formSubmitButton} onPress={() => onClick(deck._id)}>Delete Deck</Button>
                <Button
                  className={styles.formSubmitButton}
                  onPress={close}
                  style={{ marginTop: 8 }}
                >
                  X
                </Button>
              </form>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </>
  );
}
