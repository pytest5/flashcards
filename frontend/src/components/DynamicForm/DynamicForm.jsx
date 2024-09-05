import { useForm, useFieldArray } from "react-hook-form";
import useFormData from "../useFormData/useFormData";
// import Headers from "./Header";
// import from "./DynamicForm.module.css";

export default function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }, // subscribe to error form state obj
  } = useForm({
    defaultValues: {
      cards: [{ prompt: "prompt", answer: "answer" }],
    },
  });

  const data = useFormData("66d92a63b1e99ffb486e0e46");
  console.log(data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
    rules: {
      required: "Please append at least 1 item",
      // validate: () => {
      //   // validate entire form here
      // },
    },
  });

  console.log("fields", fields);
  console.log("error object:", errors);

  //   const firstName = watch("firstName");s
  const onSubmit = (data) => console.log("data: ", data);

  return (
    <div>
      {/* <Headers /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((i, idx) => {
          return (
            <section key={i.id}>
              <label>prompt</label>
              <input
                {...register(`cards.${idx}.prompt`, {
                  required: "prompt required",
                })} // placeholder="prompt"
              />
              <p>{errors.prompt?.message}</p>
              <label>answer</label>
              <input
                {...register(`cards.${idx}.answer`, {
                  required: "answer required",
                })} // placeholder="answer"
              />
              <p>{errors.answer?.message}</p>
              <button type="button" onClick={() => remove(idx)}>
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
            })
          }
        >
          Append
        </button>
        <p>{errors.cards?.root?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
