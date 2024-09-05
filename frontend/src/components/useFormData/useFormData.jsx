import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { loadDeck, editDeck } from "../../services/deckService";
import { getCardsByDeckId } from "../../services/cardService";
import { getAllSubjects } from "../../services/subjectService";

export default function useFormData(deckId) {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    const onLoad = async () => {
      const promises = [
        loadDeck(deckId),
        getCardsByDeckId(deckId),
        getAllSubjects(),
      ];
      const result = await Promise.all(promises);
      console.log(result);
      const [deck, cards, subjects] = result;
      setData({
        deck,
        cards,
        subjects,
      });
    };
    onLoad();
  }, [deckId]);

  return [data];
}
