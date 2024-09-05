import { useForm, useFieldArray } from "react-hook-form";
import useFormData from "../useFormData/useFormData";
import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import {
  createManyCards,
  deleteManyCards,
  updateManyCards,
} from "../../services/cardService";
import { useParams } from "react-router-dom";

export default function DynamicForm() {
  const { deckId } = useParams();
  const [{ cards, deck, subjects }, originalCardIds] = useFormData(deckId);
  const [toBeDeleted, setToBeDeleted] = React.useState([]);
  const [toBeEdited, setToBeEdited] = React.useState([]);

  React.useEffect(() => {
    if (!originalCardIds) return;
    setToBeEdited(originalCardIds);
  }, [originalCardIds]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors }, // subscribe to error form state obj
  } = useForm({
    defaultValues: {
      cards: cards?.map((i) => ({
        _id: i._id,
        prompt: i.front,
        answer: i.answer,
        distractors: ["", ""],
      })),
    },
  });

  React.useEffect(() => {
    if (!cards) return;
    reset({
      cards: cards.map((i) => ({
        _id: i._id,
        prompt: i.front,
        answer: i.answer,
        distractors: i.distractors || [],
      })),
    });
  }, [cards, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const onSubmit = async (data) => {
    console.log("submitted data!!!: ", data.cards);
    const toBeCreated = data.cards
      .filter((i) => !i._id)
      .map((i) => ({ ...i, deckId }));
    if (toBeCreated.length) await createManyCards(toBeCreated, deckId);
    if (toBeDeleted.length) await deleteManyCards(toBeDeleted);
    if (toBeEdited.length) await updateManyCards(toBeEdited);
    console.log({ toBeCreated, toBeDeleted, toBeEdited });
  };
  //   console.log("cards", cards);
  //   console.log("FIELDS", fields);
  //   console.log("error object:", errors);

  return (
    <FormContainer header="Editing deck" to="/home">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((i, idx) => {
          return (
            <section key={i.id}>
              {/* 0. ID */}
              <input type="hidden" {...register(`cards.${idx}._id`)} />
              {/* 1. PROMPT */}
              <label>prompt</label>
              <input
                {...register(`cards.${idx}.prompt`, {
                  //   required: "prompt required",
                })}
                placeholder="some placeholder"
              />
              <p>{errors.prompt?.message}</p>
              {/* 2. ANSWER */}
              <label>answer</label>
              <input
                {...register(`cards.${idx}.answer`, {
                  required: "answer required",
                })}
                placeholder="some placeholder"
              />
              <p>{errors.answer?.message}</p>
              {/* 3. DISTRACTORS */}
              <label>Distractors</label>
              {i?.distractors?.map((distractor, index) => (
                <div key={index}>
                  <input
                    {...register(`cards.${idx}.distractors.${index}`, {
                      //   required: "Distractor is required",
                    })}
                    placeholder="distractor"
                  />
                  <p>{errors.cards?.[idx]?.distractors?.[index]?.message}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  remove(idx);
                  setToBeDeleted([...toBeDeleted, i._id]);
                  setToBeEdited(toBeEdited.filter((item) => item !== i._id));
                }}
              >
                Delete
              </button>
            </section>
          );
        })}
        <button
          type="button"
          onClick={() =>
            append({
              prompt: "prompt", // provide default values
              answer: "answer",
              distractors: ["", ""],
            })
          }
        >
          Append
        </button>
        <p>{errors.cards?.root?.message}</p>
        <input type="submit" />
      </form>
    </FormContainer>
  );
}
