# MPER Runtime

MPER means Multi Persona Emotion Rendering.

This repository is an experimental runtime system for structured AI-driven characters.

This first prototype is intentionally small. It is not a chatbot, does not call an LLM, and does not store anything in a database. The goal is to prove the runtime flow:

```text
Persona JSON
-> Emotion State
-> Reaction Logic
-> Prompt Builder
-> LLM Output
```

For this first prototype, the final LLM output step is represented only by `promptDirection`.

## Run

```bash
npm run run
```

Or pass a persona file directly:

```bash
node src/index.js personas/sample_persona.json
```

## Current Scope

- Read a persona JSON file.
- Normalize emotion values from `0..1` or `0..100` into `0..1`.
- Build a simple emotion state.
- Derive minimal reaction logic from emotion state.
- Generate structured prompt direction.
- Avoid chatbot behavior and external API calls.

## Persona Shape

```json
{
  "name": "Ayame",
  "traits": ["careful", "warm"],
  "style": {
    "tone": "gentle",
    "verbosity": "concise"
  },
  "stability": 72,
  "emotions": {
    "joy": 38,
    "trust": 84,
    "curiosity": 66
  },
  "boundaries": ["Do not invent backstory."]
}
```

Missing emotions default to `0`.

## Architecture Notes

The runtime owns behavior control. Persona JSON is structured input, emotion state is normalized runtime state, reaction logic derives behavioral stance, and prompt direction is the controlled instruction surface that a future LLM renderer would consume.

The LLM should render language from this structure, not freely invent personality.
