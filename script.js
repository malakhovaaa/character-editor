document.addEventListener("DOMContentLoaded", () => {
  /*
    =========================
    CHARACTER EDITOR / SCRIPT
    =========================
    Что умеет этот файл сейчас:
    - лицо: только форма OVAL
    - глаза: только форма NO_LASHES
    - выбор всех оттенков кожи для oval
    - выбор всех цветов глаз для no_lashes
    - если форма выбрана, а цвет еще нет -> белая техническая версия
    - обновляет портрет в редакторе
    - обновляет портрет в финальной карточке
    - позволяет выбрать до 5 черт
    - позволяет скачать карточку
  */

  const state = {
    avatar: {
      faceShape: null,   // "oval"
      skinTone: null,    // "very_light" | "light" | "medium" | "tan" | "dark"
      eyeShape: null,    // "no_lashes"
      eyeColor: null     // "light_gray" | "brown" | "gray" | "blue" | "green" | "almost_black"
    },
    traits: []
  };

  /*
    =========================
    ДАННЫЕ
    =========================
  */

  const FACE_SHAPES = [
    { id: "oval", label: "овал" }
  ];

  const SKIN_TONES = [
    { id: "very_light", label: "очень светлый", swatch: "#F8E8DF" },
    { id: "light",      label: "светлый",       swatch: "#F1D2BC" },
    { id: "medium",     label: "средний",       swatch: "#D9A786" },
    { id: "tan",        label: "загорелый",     swatch: "#B97B58" },
    { id: "dark",       label: "темный",        swatch: "#6F4635" }
  ];

  const EYE_SHAPES = [
    { id: "no_lashes", label: "без ресниц" }
  ];

  const EYE_COLORS = [
    { id: "light_gray",   label: "светло-серые", swatch: "#E7E9EE" },
    { id: "brown",        label: "карие",        swatch: "#6F4A37" },
    { id: "gray",         label: "серые",        swatch: "#8D9098" },
    { id: "blue",         label: "голубые",      swatch: "#8EB7E8" },
    { id: "green",        label: "зеленые",      swatch: "#6F956A" },
    { id: "almost_black", label: "почти черные", swatch: "#1D1D1F" }
  ];

  const TRAITS = [
    "авангардист",
    "безнадежный романтик",
    "безумный",
    "бережливый",
    "бунтарь",
    "вегетарианец",
    "верит в чудеса",
    "душа компании",
    "застенчивый",
    "карьерист",
    "книжный червь",
    "кокетливый",
    "кулинар",
    "лежебока",
    "любит детей",
    "любит приключения",
    "соня",
    "неряха",
    "поп-звезда",
    "перфекционист",
    "светский красавец",
    "скептик",
    "социально неловкий",
    "садовод",
    "художник",
    "чистюля",
    "шутник",
    "эмо",
    "эмоциональный",
    "живет в Pinterest",
    "ферритин - 10",
    "редфлаг",
    "гринфлаг",
    "блэк кэт энерджи",
    "голден ретривер энерджи",
    "не отвечает на сообщения",
    "ненавидит звонки",
    "всегда занята",
    "бизнесвуман",
    "фэшн-икона",
    "на подсчете калорий",
    "на массонаборе",
    "матчахолик",
    "кофехолик"
  ];

  /*
    =========================
    ХЕЛПЕРЫ
    =========================
  */

  function $(id) {
    return document.getElementById(id);
  }

  function safeSetBackground(layerId, imagePath) {
    const layer = $(layerId);
    if (!layer) return;

    layer.textContent = "";
    if (imagePath) {
      layer.style.backgroundImage = `url("${imagePath}")`;
      layer.style.backgroundRepeat = "no-repeat";
      layer.style.backgroundPosition = "center";
      layer.style.backgroundSize = "contain";
    } else {
      layer.style.backgroundImage = "none";
    }
  }

  function updateSelectedClass(containerId, selectedValue) {
    const container = $(containerId);
    if (!container) return;

    const allButtons = container.querySelectorAll("[data-value]");
    allButtons.forEach((btn) => {
      btn.classList.toggle("is-selected", btn.dataset.value === selectedValue);
    });
  }

  function showNeedTraitLimitMessage() {
    alert("Можно выбрать только 5 черт.");
  }

  /*
    =========================
    ПУТИ К ASSETS
    =========================
    ВАЖНО:
    У тебя должны существовать такие файлы:

    assets/avatar/base/base_skin_white_oval.png
    assets/avatar/base/base_skin_very_light_oval.png
    assets/avatar/base/base_skin_light_oval.png
    assets/avatar/base/base_skin_medium_oval.png
    assets/avatar/base/base_skin_tan_oval.png
    assets/avatar/base/base_skin_dark_oval.png

    assets/avatar/eyes/eyes_no_lashes_white.png
    assets/avatar/eyes/eyes_no_lashes_light_gray.png
    assets/avatar/eyes/eyes_no_lashes_brown.png
    assets/avatar/eyes/eyes_no_lashes_gray.png
    assets/avatar/eyes/eyes_no_lashes_blue.png
    assets/avatar/eyes/eyes_no_lashes_green.png
    assets/avatar/eyes/eyes_no_lashes_almost_black.png
  */

  function getFaceAssetPath() {
    const { faceShape, skinTone } = state.avatar;

    if (!faceShape) return "";

    if (faceShape === "oval") {
      if (!skinTone) {
        return "assets/avatar/base/base_skin_white_oval.png";
      }
      return `assets/avatar/base/base_skin_${skinTone}_oval.png`;
    }

    return "";
  }

  function getEyesAssetPath() {
    const { eyeShape, eyeColor } = state.avatar;

    if (!eyeShape) return "";

    if (eyeShape === "no_lashes") {
      if (!eyeColor) {
        return "assets/avatar/eyes/eyes_no_lashes_white.png";
      }
      return `assets/avatar/eyes/eyes_no_lashes_${eyeColor}.png`;
    }

    return "";
  }

  /*
    =========================
    РЕНДЕР ОПЦИЙ
    =========================
  */

  function renderFaceShapeOptions() {
    const container = $("faceShapeOptions");
    if (!container) return;

    container.innerHTML = "";

    FACE_SHAPES.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-chip";
      btn.dataset.value = item.id;
      btn.textContent = item.label;

      btn.addEventListener("click", () => {
        state.avatar.faceShape = item.id;
        updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(btn);
    });

    updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
  }

  function renderSkinToneOptions() {
    const container = $("skinToneOptions");
    if (!container) return;

    container.innerHTML = "";

    SKIN_TONES.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "color-chip";
      btn.dataset.value = item.id;
      btn.title = item.label;
      btn.setAttribute("aria-label", item.label);

      btn.innerHTML = `
        <span class="color-chip__swatch" style="background:${item.swatch};"></span>
        <span class="color-chip__label">${item.label}</span>
      `;

      btn.addEventListener("click", () => {
        state.avatar.skinTone = item.id;

        // если цвет выбрали раньше формы — автоматически включаем oval
        if (!state.avatar.faceShape) {
          state.avatar.faceShape = "oval";
          updateSelectedClass("faceShapeOptions", state.avatar.faceShape);
        }

        updateSelectedClass("skinToneOptions", state.avatar.skinTone);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(btn);
    });

    updateSelectedClass("skinToneOptions", state.avatar.skinTone);
  }

  function renderEyeShapeOptions() {
    const container = $("eyeShapeOptions");
    if (!container) return;

    container.innerHTML = "";

    EYE_SHAPES.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-chip";
      btn.dataset.value = item.id;
      btn.textContent = item.label;

      btn.addEventListener("click", () => {
        state.avatar.eyeShape = item.id;
        updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(btn);
    });

    updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
  }

  function renderEyeColorOptions() {
    const container = $("eyeColorOptions");
    if (!container) return;

    container.innerHTML = "";

    EYE_COLORS.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "color-chip";
      btn.dataset.value = item.id;
      btn.title = item.label;
      btn.setAttribute("aria-label", item.label);

      btn.innerHTML = `
        <span class="color-chip__swatch" style="background:${item.swatch};"></span>
        <span class="color-chip__label">${item.label}</span>
      `;

      btn.addEventListener("click", () => {
        state.avatar.eyeColor = item.id;

        // если цвет выбрали раньше формы — автоматически включаем no_lashes
        if (!state.avatar.eyeShape) {
          state.avatar.eyeShape = "no_lashes";
          updateSelectedClass("eyeShapeOptions", state.avatar.eyeShape);
        }

        updateSelectedClass("eyeColorOptions", state.avatar.eyeColor);
        updatePortrait();
        syncFinalPortrait();
      });

      container.appendChild(btn);
    });

    updateSelectedClass("eyeColorOptions", state.avatar.eyeColor);
  }

  function renderTraitOptions() {
    const container = $("traitsOptions");
    if (!container) return;

    container.innerHTML = "";

    TRAITS.forEach((trait) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "trait-chip";
      btn.dataset.value = trait;
      btn.innerHTML = `
        <span class="trait-chip__star">${state.traits.includes(trait) ? "★" : "☆"}</span>
        <span class="trait-chip__text">${trait}</span>
      `;

      btn.addEventListener("click", () => {
        const exists = state.traits.includes(trait);

        if (exists) {
          state.traits = state.traits.filter((item) => item !== trait);
        } else {
          if (state.traits.length >= 5) {
            showNeedTraitLimitMessage();
            return;
          }
          state.traits.push(trait);
        }

        renderTraitOptions();
        renderTraitsCounter();
        renderFinalTraits();
      });

      if (state.traits.includes(trait)) {
        btn.classList.add("is-selected");
      }

      container.appendChild(btn);
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

  /*
    =========================
    ОБНОВЛЕНИЕ ПОРТРЕТА
    =========================
  */

  function updatePortrait() {
    const facePath = getFaceAssetPath();
    const eyesPath = getEyesAssetPath();

    safeSetBackground("faceLayer", facePath);
    safeSetBackground("eyesLayer", eyesPath);

    // пока волосы и детали не подключаем
    safeSetBackground("hairLayer", "");
    safeSetBackground("detailsLayer", "");
  }

  function syncFinalPortrait() {
    const facePath = getFaceAssetPath();
    const eyesPath = getEyesAssetPath();

    safeSetBackground("finalFaceLayer", facePath);
    safeSetBackground("finalEyesLayer", eyesPath);

    safeSetBackground("finalHairLayer", "");
    safeSetBackground("finalDetailsLayer", "");
  }

  /*
    =========================
    ПЕРЕХОДЫ МЕЖДУ ЭКРАНАМИ
    =========================
    Тут я сделал универсально через data-screen
    и data-go.
    Если у тебя уже есть свои переходы и они
    работают, это можно оставить — не помешает.
  */

  function showScreen(screenId) {
    const screens = document.querySelectorAll("[data-screen]");
    screens.forEach((screen) => {
      screen.style.display = screen.id === screenId ? "" : "none";
    });
  }

  function bindNavigation() {
    const navButtons = document.querySelectorAll("[data-go]");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.go;
        if (!target) return;

        if (target === "screen5") {
          syncFinalPortrait();
          renderFinalTraits();
        }

        showScreen(target);
      });
    });

    const newCharacterBtn = $("newCharacterBtn");
    if (newCharacterBtn) {
      newCharacterBtn.addEventListener("click", () => {
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
  }

  /*
    =========================
    КНОПКА "ЭТО Я!"
    =========================
  */

  function bindCreateCardButton() {
    const createCardBtn = $("createCardBtn");
    if (!createCardBtn) return;

    createCardBtn.addEventListener("click", () => {
      if (state.traits.length !== 5) {
        alert("Выбери ровно 5 черт.");
        return;
      }

      syncFinalPortrait();
      renderFinalTraits();
      showScreen("screen4");
    });
  }

  /*
    =========================
    КНОПКА СКАЧАТЬ КАРТОЧКУ
    =========================
    Для этого должен быть подключен html2canvas.
    Если уже подключен — супер.
    Если нет — скажи, и я отдельно дам шаг,
    как его подключить.
  */

  function bindDownloadCardButton() {
    const downloadBtn = $("downloadCardBtn");
    if (!downloadBtn) return;

    downloadBtn.addEventListener("click", async () => {
      const card = $("finalCard");
      if (!card) return;

      if (typeof window.html2canvas !== "function") {
        alert("html2canvas не подключен. Если хочешь, я следующим сообщением дам тебе точный шаг, как его подключить.");
        return;
      }

      const canvas = await window.html2canvas(card, {
        backgroundColor: null,
        scale: 3,
        useCORS: true
      });

      const link = document.createElement("a");
      link.download = "character-editor-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  function bindShareTelegramButton() {
    const shareBtn = $("shareTelegramBtn");
    if (!shareBtn) return;

    shareBtn.addEventListener("click", () => {
      const text = encodeURIComponent("Я создала персонажа в CHARACTER EDITOR by malakhovaa_ ✨");
      const url = `https://t.me/share/url?url=&text=${text}`;
      window.open(url, "_blank");
    });
  }

  /*
    =========================
    INIT
    =========================
  */

  function init() {
    renderFaceShapeOptions();
    renderSkinToneOptions();
    renderEyeShapeOptions();
    renderEyeColorOptions();
    renderTraitOptions();
    renderTraitsCounter();
    renderFinalTraits();

    updatePortrait();
    syncFinalPortrait();

    bindNavigation();
    bindCreateCardButton();
    bindDownloadCardButton();
    bindShareTelegramButton();

    // если нужен стартовый экран — включи screen1
    const firstScreen = $("screen1");
    if (firstScreen) {
      showScreen("screen1");
    }
  }

  init();
});
