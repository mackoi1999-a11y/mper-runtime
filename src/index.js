#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const EMOTION_KEYS = [
  "joy",
  "sadness",
  "anger",
  "fear",
  "trust",
  "curiosity",
  "affection",
  "confidence"
];

function clamp(value, min = 0, max = 1) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function normalizeEmotionValue(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  if (value >= 0 && value <= 1) {
    return value;
  }

  if (value >= 0 && value <= 100) {
    return value / 100;
  }

  return clamp(value);
}

function loadPersona(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(absolutePath, "utf8");
  const persona = JSON.parse(raw);

  if (!persona.name || typeof persona.name !== "string") {
    throw new Error("Persona JSON must include a string `name`.");
  }

  return persona;
}

function normalizeEmotions(persona) {
  const source = persona.emotions || {};

  return EMOTION_KEYS.reduce((normalized, key) => {
    normalized[key] = normalizeEmotionValue(source[key]);
    return normalized;
  }, {});
}

function getDominantEmotion(emotions) {
  return Object.entries(emotions).reduce(
    (dominant, [key, value]) => {
      if (value > dominant.value) {
        return { key, value };
      }
      return dominant;
    },
    { key: "neutral", value: 0 }
  );
}

function buildEmotionState(persona) {
  const emotions = normalizeEmotions(persona);
  const dominant = getDominantEmotion(emotions);
  const intensity = dominant.value;

  return {
    personaName: persona.name,
    emotions,
    dominantEmotion: dominant.key,
    intensity,
    stability: normalizeEmotionValue(persona.stability ?? 0.5)
  };
}

function buildReactionLogic(emotionState) {
  const { emotions, dominantEmotion, stability } = emotionState;
  const guarded = emotions.fear > 0.45 || emotions.anger > 0.45;
  const open = emotions.trust > 0.55 || emotions.affection > 0.55;
  const exploratory = emotions.curiosity > 0.5;

  let stance = "neutral";
  if (guarded) stance = "guarded";
  if (open && !guarded) stance = "open";
  if (exploratory && open && !guarded) stance = "warmly curious";

  return {
    stance,
    dominantEmotion,
    regulation: stability >= 0.6 ? "steady" : "volatile",
    responseBiases: {
      shouldApproach: open && !guarded,
      shouldHoldBack: guarded,
      shouldAskCarefully: exploratory
    }
  };
}

function describeIntensity(value) {
  if (value >= 0.75) return "strong";
  if (value >= 0.45) return "moderate";
  if (value >= 0.2) return "subtle";
  return "low";
}

function buildPromptDirection(persona, emotionState, reactionLogic) {
  const traits = Array.isArray(persona.traits) ? persona.traits : [];
  const boundaries = Array.isArray(persona.boundaries) ? persona.boundaries : [];
  const style = persona.style || {};

  return {
    role: `Render dialogue as ${persona.name}.`,
    control: "Use the runtime emotion state as the source of behavior. Do not invent new personality traits.",
    emotionalDirection: {
      dominantEmotion: emotionState.dominantEmotion,
      intensity: describeIntensity(emotionState.intensity),
      stability: describeIntensity(emotionState.stability)
    },
    reactionDirection: {
      stance: reactionLogic.stance,
      regulation: reactionLogic.regulation,
      responseBiases: reactionLogic.responseBiases
    },
    personaConstraints: {
      traits,
      tone: style.tone || "natural",
      verbosity: style.verbosity || "medium",
      boundaries
    },
    outputGuidance: [
      "Express the current emotional state through word choice and pacing.",
      "Keep behavior consistent with persona constraints.",
      "Avoid adding facts, memories, relationships, or motives not present in structured input."
    ]
  };
}

function run(filePath) {
  const persona = loadPersona(filePath);
  const emotionState = buildEmotionState(persona);
  const reactionLogic = buildReactionLogic(emotionState);
  const promptDirection = buildPromptDirection(persona, emotionState, reactionLogic);

  return {
    persona: {
      name: persona.name,
      source: path.resolve(process.cwd(), filePath)
    },
    emotionState,
    reactionLogic,
    promptDirection
  };
}

function printUsage() {
  console.error("Usage: node src/index.js <persona.json>");
}

if (require.main === module) {
  const filePath = process.argv[2];

  if (!filePath) {
    printUsage();
    process.exitCode = 1;
  } else {
    try {
      console.log(JSON.stringify(run(filePath), null, 2));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

module.exports = {
  buildEmotionState,
  buildReactionLogic,
  buildPromptDirection,
  normalizeEmotionValue,
  normalizeEmotions,
  run
};
