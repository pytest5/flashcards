import { Button, Dialog, DialogTrigger, Popover, Heading, Modal, ModalOverlay } from "react-aria-components";
import styles from "./DeleteDeckModal.module.css";

export default function DeleteDeckModal() {
  return     <>
  <DialogTrigger>
    <Button className={styles.formSubmitButton} aria-label="delete deck">Delete Deck</Button>
    <Modal>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading>Delete Deck</Heading>
              <p>Are you sure you want to delete the Deck? All contents
              will be permanently destroyed.</p>
              <Button className={styles.formSubmitButton} onPress={close} style={{ marginTop: 8 }}>
                X
              </Button>
              <Button>Delete</Button>
            </form>
          )}
        </Dialog>
    </Modal>
  </DialogTrigger>
</>
}
