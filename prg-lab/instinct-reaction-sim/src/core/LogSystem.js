(function (global) {
  const MPER = global.MPER || (global.MPER = {});

  class LogSystem {
    constructor(maxGroups, maxHistory) {
      this.maxGroups = maxGroups || 10;
      this.maxHistory = maxHistory || 25;
      this.historyText = [];
    }

    clear() {
      this.historyText = [];
    }

    append(container, inputValue, results) {
      const placeholder = container.querySelector(".log-placeholder");
      if (placeholder) {
        placeholder.remove();
      }

      const logGroup = document.createElement("div");
      logGroup.className = "log-group";

      const timeStr = new Date().toLocaleTimeString();
      const title = document.createElement("div");
      title.className = "log-group-title";
      title.innerText = "▸ 入力刺激: " + inputValue + " [" + timeStr + "]";
      logGroup.appendChild(title);

      let groupText = "=== 入力刺激: " + inputValue + " [" + timeStr + "] ===\n";

      results.forEach((res) => {
        const item = document.createElement("div");
        item.className = "log-item";

        const dot = document.createElement("span");
        dot.className = "log-dot";
        dot.style.backgroundColor = res.color;

        const nameSpan = document.createElement("span");
        nameSpan.style.fontWeight = "bold";
        nameSpan.style.minWidth = "65px";
        nameSpan.style.color = "#f8fafc";
        nameSpan.innerText = res.name;

        const textSpan = document.createElement("span");
        textSpan.className = "log-text-content";
        textSpan.style.color = "#cbd5e1";
        textSpan.innerHTML = " : input=" + res.input + " / " +
          '<span class="log-pref-badge ' + this.badgeClass(res.preference) + '">' + res.preference + "</span> / " +
          '<span style="color: #fda4af; font-weight: bold;">' + res.valuation + "</span> / " +
          '<span style="color: #c084fc; font-weight: bold;">' + res.reaction + "</span> / " +
          '<span style="color: #38bdf8;">' + res.desc + "</span>";

        item.appendChild(dot);
        item.appendChild(nameSpan);
        item.appendChild(textSpan);
        logGroup.appendChild(item);

        groupText += res.name + " : input=" + res.input + " / " + res.preference + " / " + res.valuation + " / " + res.reaction + " / " + res.desc + "\n";
      });

      this.historyText.unshift(groupText);
      container.insertBefore(logGroup, container.firstChild);

      while (container.childNodes.length > this.maxGroups) {
        container.lastChild.remove();
      }

      if (this.historyText.length > this.maxHistory) {
        this.historyText.pop();
      }
    }

    badgeClass(preference) {
      switch (preference) {
        case "like":
          return "badge-like";
        case "dislike":
          return "badge-dislike";
        case "neutral":
          return "badge-neutral";
        case "unknown":
          return "badge-unknown";
        default:
          return "";
      }
    }

    copyToClipboard(button) {
      if (this.historyText.length === 0) {
        const original = button.innerHTML;
        button.innerHTML = "⚠ ログが空です";
        setTimeout(() => {
          button.innerHTML = original;
        }, 1500);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = this.historyText.join("\n");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.top = "0";
      textarea.style.left = "0";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999);

      let success = false;
      try {
        success = document.execCommand("copy");
      } catch (err) {
        console.error("Copy failed: ", err);
      }
      document.body.removeChild(textarea);

      const original = button.innerHTML;
      if (success) {
        button.innerHTML = "✓ コピーしました！";
        button.classList.add("success");
        setTimeout(() => {
          button.innerHTML = original;
          button.classList.remove("success");
        }, 1800);
      } else {
        button.innerHTML = "× コピー失敗";
        setTimeout(() => {
          button.innerHTML = original;
        }, 1800);
      }
    }
  }

  MPER.LogSystem = LogSystem;
})(window);
