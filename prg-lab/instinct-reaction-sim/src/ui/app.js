(function (global) {
  const MPER = global.MPER;

  const appState = {
    characters: [],
    lastCharId: 0,
    showPreferences: false,
    logSystem: new MPER.LogSystem()
  };

  function createCharacter() {
    appState.lastCharId += 1;
    return MPER.CharacterModel.create(appState.lastCharId);
  }

  function handleInputValue(inputValue) {
    const results = [];

    appState.characters.forEach((character) => {
      const data = MPER.ReactionPipeline.run(character, inputValue);
      results.push({
        name: character.name,
        color: character.color,
        input: data.inputValue,
        preference: data.preference,
        valuation: data.valuation,
        reaction: data.reaction,
        desc: MPER.Config.actionDescriptionsJa[data.reaction] || ""
      });
    });

    updateUI();
    appState.logSystem.append(document.getElementById("log-container"), inputValue, results);
  }

  function rebuildCharacterDOMs() {
    const simArea = document.getElementById("sim-area");
    const oldNodes = simArea.querySelectorAll(".character-node");
    oldNodes.forEach((node) => node.remove());

    appState.characters.forEach((character) => {
      const charEl = document.createElement("div");
      charEl.className = "character-node";
      charEl.id = "char-node-" + character.id;
      charEl.style.backgroundColor = character.color;
      charEl.style.left = character.x + "%";
      charEl.style.top = character.y + "%";

      const label = document.createElement("div");
      label.className = "character-label";
      label.innerText = character.name;
      charEl.appendChild(label);

      simArea.appendChild(charEl);
    });
  }

  function updateCharacterPositions() {
    appState.characters.forEach((character) => {
      const charEl = document.getElementById("char-node-" + character.id);
      if (!charEl) return;

      charEl.style.left = character.x + "%";
      charEl.style.top = character.y + "%";

      const label = charEl.querySelector(".character-label");
      if (!label) return;

      if (character.x > 80) {
        label.classList.add("flip-left");
      } else {
        label.classList.remove("flip-left");
      }
    });
  }

  function renderCharacterList() {
    const listEl = document.getElementById("character-list");
    listEl.innerHTML = "";

    appState.characters.forEach((character) => {
      const card = document.createElement("div");
      card.className = "char-card";

      const header = document.createElement("div");
      header.className = "char-card-header";
      header.innerHTML = '<span class="char-color-dot" style="background-color: ' + character.color + ';"></span>' + character.name;
      card.appendChild(header);

      const body = document.createElement("div");
      const rows = [
        { key: "like", name: "like", badgeClass: "badge-like" },
        { key: "dislike", name: "dislike", badgeClass: "badge-dislike" },
        { key: "neutral", name: "neutral", badgeClass: "badge-neutral" },
        { key: "unknown", name: "unknown", badgeClass: "badge-unknown" }
      ];

      rows.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "preference-row";

        const badge = document.createElement("span");
        badge.className = "badge " + row.badgeClass;
        badge.innerText = row.name;

        const vals = document.createElement("span");
        vals.className = "preference-values";
        if (appState.showPreferences) {
          vals.innerText = character[row.key].length > 0 ? character[row.key].join(", ") : "なし";
        } else {
          vals.innerText = character[row.key].length > 0 ? "●".repeat(character[row.key].length).trim() : "なし";
        }

        rowEl.appendChild(badge);
        rowEl.appendChild(vals);
        body.appendChild(rowEl);
      });

      card.appendChild(body);
      listEl.appendChild(card);
    });

    document.getElementById("char-count-badge").innerText = appState.characters.length + "体";
  }

  function updateUI() {
    renderCharacterList();
    updateCharacterPositions();
  }

  function setupNumberButtons() {
    const container = document.getElementById("number-buttons-container");
    container.innerHTML = "";

    for (let i = 0; i <= 10; i++) {
      const btn = document.createElement("button");
      btn.className = "num-btn";
      btn.innerText = i;
      btn.addEventListener("click", () => {
        handleInputValue(i);
      });
      container.appendChild(btn);
    }
  }

  function initSimulation() {
    appState.characters = [];
    appState.lastCharId = 0;
    appState.showPreferences = false;
    appState.logSystem.clear();

    const toggleBtn = document.getElementById("btn-toggle-prefs");
    if (toggleBtn) {
      toggleBtn.innerHTML = "👁️ 個性を覗く";
      toggleBtn.style.backgroundColor = "#6366f1";
    }

    for (let i = 0; i < MPER.Config.initialCharacterCount; i++) {
      appState.characters.push(createCharacter());
    }

    const logContainer = document.getElementById("log-container");
    logContainer.innerHTML = '<div class="log-placeholder">数値ボタンを押すと、各キャラクターの反応ログがここにリアルタイムで表示されます。</div>';

    rebuildCharacterDOMs();
    updateUI();
  }

  function bindEvents() {
    document.getElementById("btn-create").addEventListener("click", () => {
      appState.characters.push(createCharacter());
      rebuildCharacterDOMs();
      updateUI();
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
      initSimulation();
    });

    document.getElementById("btn-copy-log").addEventListener("click", () => {
      appState.logSystem.copyToClipboard(document.getElementById("btn-copy-log"));
    });

    document.getElementById("btn-toggle-prefs").addEventListener("click", () => {
      appState.showPreferences = !appState.showPreferences;
      const btn = document.getElementById("btn-toggle-prefs");
      if (appState.showPreferences) {
        btn.innerHTML = "🙈 個性を隠す";
        btn.style.backgroundColor = "#64748b";
      } else {
        btn.innerHTML = "👁️ 個性を覗く";
        btn.style.backgroundColor = "#6366f1";
      }
      renderCharacterList();
    });
  }

  function boot() {
    setupNumberButtons();
    bindEvents();
    initSimulation();
  }

  global.addEventListener("load", boot);
})(window);
