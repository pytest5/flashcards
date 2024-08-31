# GA Software Engineering Bootcamp Project 3

## Libraries
[date-fns](https://date-fns.org/)
[validator](https://www.npmjs.com/package/validator)

## References

## Temp Logs

### Josh
backend: npm i validator date-fns
validator used to validate email format
date-fns for converting a YYYY/MM/DD -> [YYYY, MM, DD] -> iso-8601 date in mongodb

### Zac

Include deckId in req.body when creating a card. 

```yaml
// req.body:
{
  "front": "Car",
  "frontImageUrl": "https://fastly.picsum.photos/id/1016/200/300.jpg?hmac=9uxvjfyOlAv4nhGgmHDnUN3rkdGW1VumbY05RL2msEQ",
  "audioUrl": null,
  "rear": "A vehicle with 4 wheels",
  "rearImageUrl": "https://fastly.picsum.photos/id/1016/200/300.jpg?hmac=9uxvjfyOlAv4nhGgmHDnUN3rkdGW1VumbY05RL2msEQ",
  "distractors": null,
  "answer": null,
  "isChildFriendly": true,
  "isMultipleChoice": false,
  "deckId": "66d298d20d442f8e9c92ab50"
}
```
