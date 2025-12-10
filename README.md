# Question Impostor

[![CI Pipeline](https://github.com/tranadam/question-impostor/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tranadam/question-impostor/actions/workflows/ci.yml)

## About the game

Question impostor game you can play with friends on a single phone.

### Features

- Single phone support
- AI suggestions based on user categories and preferences
- Random questions roll so everyone plays
- Voting screen to reveal the impostor

### Rules

Everyone discretely draws a question and writes down their answer. The
catch is, some of the players unknowingly receive an impostor question.
Once everyone locks their answer, original question is revealed along
with all answers. Players discuss who they think the impostor is, then
vote. If the majority correctly identifies the impostor, they win. If
not, the impostor wins!

## Local Development

To run the project locally, run:

```
pnpm run dev
```

The server runs at [http://localhost:3000](http://localhost:3000).

## Deployment

Build and run the Docker container by:

```
docker compose up -d
```

Production app runs at [http://localhost:8302](http://localhost:8302)
