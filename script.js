document.addEventListener("DOMContentLoaded", () => {
  const state = {
    avatar: {
      faceShape: null,
      skinTone: null,
      eyeShape: null,
      eyeColor: null
    },
    traits: []
  };

  const FACE_SHAPES = [
    { id: "oval", label: "овал" },
    { id: "round", label: "круглое" },
    { id: "sharp_chin", label: "острый подбородок" },
    { id: "square_cheekbones", label: "квадратное со скулами" }
  ];

  const SKIN_TONES = [
    { id: "very_light", label: "очень светлый", swatch: "#F8E8DF" },
    { id: "light", label: "светлый", swatch: "#F1D2BC" },
    { id: "medium", label: "средний", swatch: "#D9A786" },
    { id: "tan", label: "загорелый", swatch: "#B97B58" },
    { id: "dark", label: "темный", swatch: "#6F4635" }
  ];

  const EYE_SHAPES = [
    { id: "no_lashes", label: "без ресниц" }
  ];

  const EYE_COLORS = [
    { id: "light_gray", label: "светло-серые", swatch: "#E7E9EE" },
    { id: "brown", label: "карие", swatch: "#6F4A37" },
    { id: "gray", label: "серые", swatch: "#8D9098" },
    { id: "blue", label: "голубые", swatch: "#8EB7E8" },
    { id: "green", label: "зеленые", swatch: "#6F956A" },
    { id: "almost_black", label: "почти черные", swatch: "#1D1D1F" }
  ];

  const TRAITS = [
    "книжный червь",
    "редфлаг",
    "безнадежный романтик",
    "бизнесвуман",
    "авангардист",
    "блэк кэт энерджи",
    "лежебока",
    "живет в Pinterest",
    "эмоциональный",
    "карьерист",
    "ненавидит звонки",
    "бунтарь",
    "матчахолик",
    "душа компании",
    "социально неловкий",
    "ферритин — 10",
    "перфекционист",
    "любит приключения",
    "гринфлаг",
    "соня",
    "кокетливый",
    "на подсчете калорий",
    "художник",
    "всегда занята",
    "безумный",
    "поп-звезда",
    "не отвечает на сообщения",
    "садовод",
    "голден ретривер энерджи",
    "бережливый",
    "неряха",
    "фэшн-икона",
    "верит в чудеса",
    "кофехолик",
    "светский красавец",
    "эмо",
    "вегетарианец",
    "на массонаборе",
    "шутник",
    "чистюля",
    "застенчивый",
    "кулинар",
    "любит детей",
    "скептик"
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function showScreen(screenId) {
    const screens = document.querySelectorAll("[data-screen]");

    screens.forEach((screen) => {
      screen.classList.toggle("is-active", screen.id === screenId);
    });

    if (screenId === "screen5") {
      syncFinalPortrait();
      renderFinalTraits();
    }

    try {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }

  function bindNavigation() {
    const navButtons = document.querySelectorAll("[data-go]");

    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.go;
        if (!target) return;
        showScreen(target);
      });
    });
  }

  function bindTabs() {
    const tabButtons = document.querySelectorAll("[data-tab]");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName = button.dataset.tab;

        tabButtons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });

        tabContents.forEach((content) => {
          content.classList.toggle("is-active", content.id === `tab-${tabName}`);
        });
      });
    });
  }

  function setBackground(layerId, imagePath) {
    const layer = $(layerId);
    if (!layer) return;

    layer.textContent = "";

    if (!imagePath) {
      layer.style.backgroundImage = "none";
      return;
    }

    layer.style.backgroundImage = `url("${imagePath}")`;
  }

  function updateSelectedClass(containerId, selectedValue) {
    const container = $(containerId);
    if (!container) return;

    const buttons = container.querySelectorAll("[data-value]");

    buttons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.value === selectedValue);
    });
  }

  function getFaceAssetPath() {
    const { faceShape, skinTone } = state.avatar;

    if (!faceShape) return "";

    if (!skinTone) {
      return `assets/avatar/base/base_skin_white_${faceShape}.png`;
    }

    return `assets/avatar/base/base_skin_${skinTone}_${faceShape}.png`;
  }

  function getEyesAssetPath() {
    const { eyeShape, eyeColor } = state.avatar;

    if (!eyeShape) return "";

    if (eyeShape === "no_lashes" && !eyeColor) {
      return "assets/avatar/eyes/eyes_no_lashes_white.png";
    }

    if (eyeShape === "no_lashes" && eyeColor) {
      return `assets/avatar/eyes/eyes_no_lashes_${eyeColor}.png`;
    }

    return "";
  }

  function updatePortrait() {
    setBackground("faceLayer", getFaceAssetPath());
    setBackground("eyesLayer", getEyesAssetPath());
    setBackground("hairLayer", "");
    setBackground("detailsLayer", "");
  }

  function syncFinalPortrait() {
    setBackground("finalFaceLayer", getFaceAssetPath());
    setBackground("finalEyesLayer", getEyesAssetPath());
    setBackground("finalHairLayer", "");
    setBackground("finalDetailsLayer", "");
  }

  function renderFaceShapeOptions() {
    const container = $("faceShapeOptions");
    if (!container) return;

    container.innerHTML = "";

    FACE_SHAPES.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-chip";
      button.dataset.value = item.id;
      button.textContent = item.label;

      button.addEventListener("click", () => {
        state.avatar.faceShape = item.id;
        updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(button);
    });

    updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
  }

  function renderSkinToneOptions() {
    const container = $("skinToneOptions");
    if (!container) return;

    container.innerHTML = "";

    SKIN_TONES.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-chip";
      button.dataset.value = item.id;
      button.title = item.label;

      button.innerHTML = `
        <span class="color-chip__swatch" style="background:${item.swatch};"></span>
        <span class="color-chip__label">${item.label}</span>
      `;

      button.addEventListener("click", () => {
        state.avatar.skinTone = item.id;

        if (!state.avatar.faceShape) {
          state.avatar.faceShape = "oval";
          updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
        }

        updateSelectedClass("skinToneOptions", state.avatar.skinTone);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(button);
    });

    updateSelectedClass("skinToneOptions", state.avatar.skinTone);
  }

  function renderEyeShapeOptions() {
    const container = $("eyeShapeOptions");
    if (!container) return;

    container.innerHTML = "";

    EYE_SHAPES.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-chip";
      button.dataset.value = item.id;
      button.textContent = item.label;

      button.addEventListener("click", () => {
        state.avatar.eyeShape = item.id;
        updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(button);
    });

    updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
  }

  function renderEyeColorOptions() {
    const container = $("eyeColorOptions");
    if (!container) return;

    container.innerHTML = "";

    EYE_COLORS.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-chip";
      button.dataset.value = item.id;
      button.title = item.label;

      button.innerHTML = `
        <span class="color-chip__swatch" style="background:${item.swatch};"></span>
        <span class="color-chip__label">${item.label}</span>
      `;

      button.addEventListener("click", () => {
        state.avatar.eyeColor = item.id;

        if (!state.avatar.eyeShape) {
          state.avatar.eyeShape = "no_lashes";
          updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
        }

        updateSelectedClass("eyeColorOptions", state.avatar.eyeColor);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(button);
    });

    updateSelectedClass("eyeColorOptions", state.avatar.eyeColor);
  }

  function renderTraitOptions() {
    const container = $("traitsOptions");
    if (!container) return;

    container.innerHTML = "";

    TRAITS.forEach((trait) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "trait-chip";
      button.dataset.value = trait;

      const isSelected = state.traits.includes(trait);

      button.innerHTML = `
        <span class="trait-chip__star">${isSelected ? "★" : "☆"}</span>
        <span class="trait-chip__text">${trait}</span>
      `;

      if (isSelected) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", () => {
        const alreadySelected = state.traits.includes(trait);

        if (alreadySelected) {
          state.traits = state.traits.filter((item) => item !== trait);
        } else {
          if (state.traits.length >= 5) {
            return;
          }

          state.traits.push(trait);
        }

        renderTraitOptions();
        renderTraitsCounter();
        renderFinalTraits();
      });

      container.appendChild(button);
    });
  }

  function renderTraitsCounter() {
    const counter = $("traitsCounter");
    if (!counter) return;

    counter.textContent = `${state.traits.length}/5`;
  }

  function renderFinalTraits() {
    const list = $("finalTraitsList");
    if (!list) return;

    list.innerHTML = "";

    state.traits.forEach((trait) => {
      const item = document.createElement("div");
      item.className = "final-trait";

      item.innerHTML = `
        <span class="final-trait__star">★</span>
        <span class="final-trait__text">${trait}</span>
      `;

      list.appendChild(item);
    });
  }

  function bindCreateCardButton() {
    const button = $("createCardBtn");
    if (!button) return;

    button.addEventListener("click", () => {
      if (state.traits.length !== 5) {
        alert("Выбери ровно 5 черт.");
        return;
      }

      syncFinalPortrait();
      renderFinalTraits();
      showScreen("screen4");
    });
  }

  function waitForImages() {
    const imagePaths = [
      getFaceAssetPath(),
      getEyesAssetPath()
    ].filter(Boolean);

    const promises = imagePaths.map((src) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      });
    });

    return Promise.all(promises);
  }

  function bindDownloadCardButton() {
    const button = $("downloadCardBtn");
    if (!button) return;

    button.addEventListener("click", async () => {
      const card = $("finalCard");
      if (!card) return;

      if (typeof window.html2canvas !== "function") {
        alert("html2canvas не подключен.");
        return;
      }

      await waitForImages();

      const canvas = await window.html2canvas(card, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true
      });

      const imageUrl = canvas.toDataURL("image/png");

      const imageWindow = window.open("");

      if (imageWindow) {
        imageWindow.document.write(`
          <html>
            <head>
              <title>character-editor-card</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  margin: 0;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #f7f2eb;
                }

                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                }
              </style>
            </head>
            <body>
              <img src="${imageUrl}" alt="character editor card">
            </body>
          </html>
        `);
        imageWindow.document.close();
      } else {
        const link = document.createElement("a");
        link.download = "character-editor-card.png";
        link.href = imageUrl;
        link.click();
      }
    });
  }

  function bindShareTelegramButton() {
    const button = $("shareTelegramBtn");
    if (!button) return;

    button.addEventListener("click", () => {
      const text = encodeURIComponent("Я создала персонажа в CHARACTER EDITOR by malakhovaa_");
      const url = `https://t.me/share/url?url=&text=${text}`;
      window.open(url, "_blank");
    });
  }

  function bindNewCharacterButton() {
    const button = $("newCharacterBtn");
    if (!button) return;

    button.addEventListener("click", () => {
      state.avatar.faceShape = null;
      state.avatar.skinTone = null;
      state.avatar.eyeShape = null;
      state.avatar.eyeColor = null;
      state.traits = [];

      renderFaceShapeOptions();
      renderSkinToneOptions();
      renderEyeShapeOptions();
      renderEyeColorOptions();
      renderTraitOptions();
      renderTraitsCounter();
      renderFinalTraits();

      updatePortrait();
      syncFinalPortrait();

      showScreen("screen2");
    });
  }

  function initTelegram() {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
    } catch (error) {
      console.log("Telegram WebApp init skipped", error);
    }
  }

  function init() {
    initTelegram();

    bindNavigation();
    bindTabs();

    renderFaceShapeOptions();
    renderSkinToneOptions();
    renderEyeShapeOptions();
    renderEyeColorOptions();
    renderTraitOptions();
    renderTraitsCounter();
    renderFinalTraits();

    bindCreateCardButton();
    bindDownloadCardButton();
    bindShareTelegramButton();
    bindNewCharacterButton();

    updatePortrait();
    syncFinalPortrait();

    showScreen("screen1");
  }

  init();
});
