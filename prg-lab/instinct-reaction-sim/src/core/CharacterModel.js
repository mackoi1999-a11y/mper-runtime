(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class CharacterModel {
    static create(id) {
      const prefs = MPER.PreferenceMap.createRandom();
      const colors = MPER.Config.characterColors;

      return {
        id,
        name: "Char_" + String(id).padStart(2, "0"),
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        like: prefs.like,
        dislike: prefs.dislike,
        neutral: prefs.neutral,
        unknown: prefs.unknown,
        currentPreference: null,
        currentReaction: null,
        color: colors[(id - 1) % colors.length]
      };
    }
  }

  MPER.CharacterModel = CharacterModel;
})(window);
