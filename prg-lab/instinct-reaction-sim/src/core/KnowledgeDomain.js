(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class KnowledgeDomain {
    static process(data) {
      let valuation = "indifference";

      switch (data.preference) {
        case "like":
          valuation = "attraction";
          break;
        case "dislike":
          valuation = "threat";
          break;
        case "neutral":
          valuation = "indifference";
          break;
        case "unknown":
          valuation = "confusion";
          break;
      }

      return Object.assign({}, data, { valuation });
    }
  }

  MPER.KnowledgeDomain = KnowledgeDomain;
})(window);
