# Runtime Design

MPER is not a simple chatbot wrapper. The runtime controls character behavior through structured emotional parameters, and a future LLM should only render language from that controlled state.

## Minimal Flow

```text
Persona JSON
-> Emotion State
-> Reaction Logic
-> Prompt Builder
-> LLM Output
```

This prototype stops at prompt direction. It does not call an LLM yet.

## Persona JSON

Persona JSON is the structured source of character control. It may include:

- `name`
- stable `traits`
- `style`
- `stability`
- raw `emotions`
- behavioral `boundaries`

Emotion values can be written as either `0..1` or `0..100`.

## Emotion State

The runtime normalizes known emotion values into `0..1`.

Current emotion keys:

- `joy`
- `sadness`
- `anger`
- `fear`
- `trust`
- `curiosity`
- `affection`
- `confidence`

Missing emotions default to `0`.

## Reaction Logic

Reaction logic derives a simple behavioral stance from emotion state.

Current outputs:

- `stance`
- `dominantEmotion`
- `regulation`
- `responseBiases`

This layer is deliberately deterministic. It is where the runtime starts deciding behavior before language generation.

## Prompt Direction

Prompt direction is a structured instruction object for a future LLM renderer. It contains:

- role direction
- runtime control rule
- emotional direction
- reaction direction
- persona constraints
- output guidance

The prompt builder should preserve the rule that structure controls the character, and the LLM renders the final wording.
