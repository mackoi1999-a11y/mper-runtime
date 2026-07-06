(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class BehaviorExecutor {
    static applyAction(character, action) {
      const targetX = MPER.Config.playerPosition.x;
      const targetY = MPER.Config.playerPosition.y;
      const step = MPER.Config.actionStep;
      let dx = 0;
      let dy = 0;

      switch (action) {
        case "approach":
          dx = targetX - character.x;
          dy = targetY - character.y;
          break;
        case "escape":
          dx = character.x - targetX;
          dy = character.y - targetY;
          if (dx === 0 && dy === 0) {
            const angle = Math.random() * 2 * Math.PI;
            dx = Math.cos(angle);
            dy = Math.sin(angle);
          }
          break;
        case "stay":
          return;
        case "wander":
          {
            const angle = Math.random() * 2 * Math.PI;
            dx = Math.cos(angle);
            dy = Math.sin(angle);
          }
          break;
      }

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        character.x += (dx / dist) * step;
        character.y += (dy / dist) * step;
      } else if (action === "wander" || action === "escape") {
        character.x += dx * step;
        character.y += dy * step;
      }

      const margin = MPER.Config.boundaryMargin;
      character.x = Math.max(margin, Math.min(100 - margin, character.x));
      character.y = Math.max(margin, Math.min(100 - margin, character.y));
    }
  }

  MPER.BehaviorExecutor = BehaviorExecutor;
})(window);
