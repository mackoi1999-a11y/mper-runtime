(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class PreferenceMap {
    static createRandom() {
      const preferences = {
        like: [],
        dislike: [],
        neutral: [],
        unknown: []
      };

      for (let value = 0; value <= 10; value++) {
        preferences[this.pickCategory(value)].push(value);
      }

      return preferences;
    }

    static pickCategory(value) {
      const rand = Math.random();

      if (value === 0) {
        if (rand < 0.8) return "unknown";
        if (rand < 0.87) return "like";
        if (rand < 0.94) return "dislike";
        return "neutral";
      }

      if (rand < 0.25) return "like";
      if (rand < 0.5) return "dislike";
      if (rand < 0.75) return "neutral";
      return "unknown";
    }

    static evaluate(character, inputValue) {
      if (character.like.includes(inputValue)) return "like";
      if (character.dislike.includes(inputValue)) return "dislike";
      if (character.neutral.includes(inputValue)) return "neutral";
      if (character.unknown.includes(inputValue)) return "unknown";
      return "unknown";
    }
  }

  MPER.PreferenceMap = PreferenceMap;
})(window);
