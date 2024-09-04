import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { loadDeck, editDeck } from "../../services/deckService";
import { getCardsByDeckId } from "../../services/cardService";
import { getAllSubjects } from "../../services/subjectService";

import styles from "./EditDeckPage.module.css";

export default function EditDeckPage() {
  const [data, setData] = useState({});
  const { deckId } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "cards" });

  useEffect(() => {
    const onLoad = async () => {
      const promises = [
        loadDeck(deckId),
        getCardsByDeckId(deckId),
        getAllSubjects(),
      ];
      const result = await Promise.all(promises);
      const [deck, cards, subjects] = result;
      const tempData = {
        deck: deck,
        cards: cards,
        subjects: subjects,
      };
      setData(tempData);
    };
    onLoad();
  }, [deckId]);

  console.log(data);

  const { deck, cards, subjects } = data;

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    editDeck(deck._id, formData);
    navigate("/home/dashboard");
  };

  const upperCaseFirstChar = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  if (fields.length === 0 && cards) {
    for (const card of cards) {
      fields.push(card);
    }
  }

  return (
    <>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label>Name</label>
          <input
            type="text"
            name="deckName"
            defaultValue={deck?.deckName}
            {...register("deckName", { required: "Please name your deck" })}
          />
        </div>
        <div className={styles.formControl}>
          <label>Subject</label>
          <Controller
            name="subject"
            control={control}
            defaultValue=""
            {...register("subject", { required: "Please select a subject" })}
            render={({ field }) => (
              <select {...field}>
                <option value="" disabled>
                  Select an option
                </option>
                {subjects?.map((subject, index) => (
                  <option key={index} value={subject._id}>
                    {upperCaseFirstChar(subject.subjectName)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className={styles.formControl}>
          <label>Description</label>
          <input
            type="text"
            name="description"
            defaultValue={deck?.description}
            {...register("description")}
          />
        </div>
        <div className={styles.formControl}>
          <label>Visibility</label>
          <select
            name="visibility"
            defaultValue=""
            {...register("visibility", { required: "Please select a choice" })}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className={styles.formControl}>
          {/* Not fully working */}
          <label>Archived</label>
          <input
            type="checkbox"
            name="isArchived"
            {...register("isArchived")}
          ></input>
        </div>

        {/* {fields?.map((field, index) => (
          <div key={field._id}>
            <div className={styles.formControl}>
              <input hidden name="_id" defaultValue={field._id} {...register(`cards.${index}._id`)} />
              <h4>Card {index + 1}</h4>
              <label>Prompt</label>
              <input
                defaultValue={field.front || ""}
                {...register(`cards.${index}.front`)}
              />
              <label>Answer</label>

              <input
                defaultValue={field.answer || ""}
                {...register(`cards.${index}.answer`)}
              />
              <label>Distractors</label>
              {field.distractors
                ? field.distractors.map((distractor, dIndex) => (
                    <input
                      key={dIndex}
                      defaultValue={distractor}
                      {...register(`cards.${index}.distractor${dIndex}`)}
                    />
                  ))
                : ""}
              <label>Child Friendly</label>
              <input
                type="checkbox"
                defaultValue={field.isChildFriendly}
                {...register(`cards.${index}.isChildFriendly`)}
              />
            </div>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))} */}

        {/* <button
          type="button"
          onClick={() =>
            append({
              front: "",
              answer: "",
              distractor1: "",
              distractor2: "",
              distractor3: "",
              isChildFriendly: false,
            })
          }
        >
          Add Card
        </button> */}

        <input
          className={styles.formSubmitButton}
          type="submit"
          value="Edit Deck (Tick / Submit)"
        />
      </form>
    </>
  );
}
