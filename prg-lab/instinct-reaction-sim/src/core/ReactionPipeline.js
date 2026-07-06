(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class ReactionPipeline {
    static sensorInput(inputValue) {
      return parseInt(inputValue, 10);
    }

    static evaluatePreference(character, inputValue) {
      return MPER.PreferenceMap.evaluate(character, inputValue);
    }

    static determineInstinctReaction(preference) {
      switch (preference) {
        case "like":
          return "approach";
        case "dislike":
          return "escape";
        case "neutral":
          return "stay";
        case "unknown":
          return "wander";
        default:
          return "stay";
      }
    }

    static run(character, inputValue) {
      const sensorValue = this.sensorInput(inputValue);
      const preference = this.evaluatePreference(character, sensorValue);
      const reaction = this.determineInstinctReaction(preference);

      const initialPayload = {
        character,
        inputValue: sensorValue,
        preference,
        reaction
      };

      const kdData = MPER.KnowledgeDomain.process(initialPayload);
      const ctData = MPER.ClassificationTreatment.process(kdData);
      MPER.BehaviorExecutor.applyAction(character, ctData.reaction);

      character.currentPreference = ctData.preference;
      character.currentReaction = ctData.reaction;

      return ctData;
    }
  }

  MPER.ReactionPipeline = ReactionPipeline;
})(window);
