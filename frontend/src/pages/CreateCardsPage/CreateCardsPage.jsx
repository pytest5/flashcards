import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./CreateCardsPage.module.css";
import { createCard } from "../../services/cardService";

export default function CreateCardsPage() {
  const [type, setType] = useState("");
  const { state } = useLocation();
  const { deck } = state;
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "cards" });
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = () => {
      setType(deck.type);
    };
    onLoad();
  }, [deck.type]);

  const onSubmit = async (formData) => {
    const { cards } = formData;
    for (const card of cards) {
      if (type === "front-back") {
        card.distractors = [null, null];
        card.isMultipleChoice = false;
      }
      if (type === "mcq-kids") {
        card.distractors = [];
        for (const key in card) {
          if (
            key === "distractorOne" ||
            key === "distractorTwo" ||
            key === "distractorThree"
          ) {
            card.distractors.push(card[key].trim());
          }
          card.isMultipleChoice = true;
        }
      }
      card.decks = [deck._id];
      card.user = deck.user;
    }
    
    const cardsCreated = createCard(cards);
    if (cardsCreated){
      navigate("/home");
    }
  };

  if (type === "front-back") {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className={styles.formControl}>
                <label>Front</label>
                <input {...register(`cards.${index}.front`)} />
                <label>Rear</label>
                <input {...register(`cards.${index}.rear`)} />
                <label>Child Friendly</label>
                <input
                  type="checkbox"
                  {...register(`cards.${index}.isChildFriendly`)}
                />
              </div>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ front: "", rear: "", isChildFriendly: false })
            }
          >
            Add Card
          </button>
          <input type="submit" value="Create Cards" />
        </form>
      </>
    );
  }

  if (type === "mcq-kids") {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className={styles.formControl}>
                <label>Answer</label>
                <input {...register(`cards.${index}.answer`)} />
                <label>Distractors</label>
                <input {...register(`cards.${index}.distractorOne`)} />
                <input {...register(`cards.${index}.distractorTwo`)} />
                <input {...register(`cards.${index}.distractorThree`)} />
                <label>Audio URL</label>
                <input {...register(`cards.${index}.audioUrl`)} />
                <label>Child Friendly</label>
                <input
                  type="checkbox"
                  {...register(`cards.${index}.isChildFriendly`)}
                />
              </div>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ front: "", rear: "", isChildFriendly: false })
            }
          >
            Add Card
          </button>
          <input type="submit" value="Create Cards" />
        </form>
      </>
    );
  }
}
