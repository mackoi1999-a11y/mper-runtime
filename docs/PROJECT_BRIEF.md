# MPER Project Brief

MPER stands for Multi Persona Emotion Rendering.

This repository is an experimental runtime system for structured AI-driven characters.

## Core Idea

MPER does not treat AI characters as simple chatbots.
It treats them as persona-driven emotional entities with internal state.

The runtime should convert structured persona data into:

- emotion state
- reaction behavior
- dialogue prompt
- memory context
- motion / behavior cues

## Current Goal

The first prototype should read a Persona JSON file and generate:

1. a normalized emotion state
2. a character prompt
3. a simple reaction direction

## Important Principle

The LLM should not freely invent the character.
The runtime should control the character through structured data.

Structure first, AI output second.
