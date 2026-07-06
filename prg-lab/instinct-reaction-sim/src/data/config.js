(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  MPER.Config = {
    initialCharacterCount: 5,
    boundaryMargin: 4,
    actionStep: 4.5,
    playerPosition: { x: 50, y: 50 },
    characterColors: [
      "#ef4444",
      "#f97316",
      "#af52de",
      "#10b981",
      "#3b82f6",
      "#6366f1",
      "#a855f7",
      "#ec4899",
      "#14b8a6",
      "#84cc16"
    ],
    preferenceTypes: ["like", "dislike", "neutral", "unknown"],
    actionDescriptionsJa: {
      approach: "プレイヤーに近づいた",
      escape: "プレイヤーから逃げた",
      stay: "その場に留まった",
      wander: "ランダムに彷徨った"
    }
  };
})(window);
