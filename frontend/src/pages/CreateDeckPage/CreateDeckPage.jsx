import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../services/deckService";
import { getAllSubjects } from "../../services/subjectService";
import { getCurrentUser } from "../../services/userService";

import styles from "./CreateDeckPage.module.css";
import FormContainer from "../../components/FormContainer/FormContainer";

export default function CreateDeckPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      const subjectsInDb = await getAllSubjects();
      setSubjects(subjectsInDb);
    };
    onLoad();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const user = await getCurrentUser();
    formData.user = user._id;
    const deck = await createDeck(formData);
    if (deck) {
      deck.type = formData.type;
      navigate(`/decks/${deck._id}/new`, { state: { deck } });
    }
  };

  const upperCaseFirstChar = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <FormContainer header="Create new deck" to="/home">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label>Name</label>
          <input
            type="text"
            name="deckName"
            {...register("deckName", { required: "Please name your deck" })}
          />
        </div>
        <div className={styles.formControl}>
          <label>Subject</label>
          <select
            className={styles.createFormSelect}
            name="subject"
            {...register("subject", { required: "Please select a subject" })}
          >
            {subjects
              ? subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {upperCaseFirstChar(subject.subjectName)}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className={styles.formControl}>
          <label>Description</label>
          <input type="text" name="description" {...register("description")} />
        </div>
        <div className={styles.formControl}>
          <label>Visibility</label>
          <select
            className={styles.createFormSelect}
            name="visibility"
            {...register("visibility", { required: "Please select a choice" })}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label>Type</label>
          <select
            className={styles.createFormSelect}
            name="type"
            {...register("type", {
              required: "Please select the type of deck",
            })}
          >
            <option value="mcq-kids">MCQ</option>
            <option value="front-back">Regular</option>
          </select>
        </div>
        <input
          className={styles.formSubmitButton}
          type="submit"
          value="Create Deck"
        />
      </form>
    </FormContainer>
  );
}
