const ASSET_BASE_PATH = "assets/avatar/base";
const ASSET_EYES_PATH = "assets/avatar/eyes";

const DEFAULT_SKIN_TONE = "very_light";
const DEFAULT_EYE_COLOR = "light_gray";

const FACE_SHAPES = [
  { id: "oval", label: "овал" },
  { id: "round", label: "круглое" },
  { id: "sharp_chin", label: "острый подбородок" },
  { id: "square_cheekbones", label: "квадратное со скулами" }
];

const SKIN_TONES = [
  { id: "very_light", label: "очень светлый", swatch: "#f6d8c8" },
  { id: "light", label: "светлый", swatch: "#e9bd9f" },
  { id: "medium", label: "средний", swatch: "#c98f65" },
  { id: "tan", label: "загорелый", swatch: "#a96843" },
  { id: "dark", label: "темный", swatch: "#633a2a" }
];

const EYE_SHAPES = [
  { id: "no_lashes", label: "без ресниц" },
  { id: "short_lashes", label: "короткие ресницы" },
  { id: "long_lashes", label: "длинные ресницы" },
  { id: "winged_liner", label: "стрелки" },
  { id: "smokey", label: "смоки" },
  { id: "small_waterline", label: "подведенные" }
];

const EYE_COLORS = [
  { id: "light_gray", label: "светло-серые", swatch: "#dfe4e4" },
  { id: "brown", label: "карие", swatch: "#6b3f26" },
  { id: "gray", label: "серые", swatch: "#8c9292" },
  { id: "blue", label: "голубые", swatch: "#7fb2d9" },
  { id: "green", label: "зеленые", swatch: "#6e9a72" },
  { id: "almost_black", label: "почти черные", swatch: "#171412" }
];

const TRAITS = [
  "стильная",
  "ироничная",
  "нежная",
  "смелая",
  "собранная",
  "хаотичная",
  "вдохновленная",
  "наблюдательная",
  "дорогая",
  "спокойная",
  "драматичная",
  "умная",
  "легкая",
  "уверенная",
  "творческая",
  "социальная",
  "мечтательная",
  "остроумная",
  "элегантная",
  "непредсказуемая",
  "сильная",
  "честная",
  "чувственная",
  "глянцевая",
  "кинематографичная"
];

const state = {
  faceShape: "oval",
  skinTone: DEFAULT_SKIN_TONE,

  eyeShape: "no_lashes",
  eyeColor: DEFAULT_EYE_COLOR,

  selectedTraits: []
};

document.addEventListener("DOMContentLoaded", () => {
  initTelegram();
  initNavigation();
  initTabs();

  renderFaceShapeOptions();
  renderSkinToneOptions();
  renderEyeShapeOptions();
  renderEyeColorOptions();
  renderTraits();

  updateAvatar();
  updateTraitsState();
});

function initTelegram() {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
}

function initNavigation() {
  const startButton = document.getElementById("startButton");
  const toTraitsButton = document.getElementById("toTraitsButton");
  const toCongratsButton = document.getElementById("toCongratsButton");
  const toResultButton = document.getElementById("toResultButton");
  const restartButton = document.getElementById("restartButton");
  const downloadButton = document.getElementById("downloadButton");
  const shareButton = document.getElementById("shareButton");

  startButton.addEventListener("click", () => showScreen("screen2"));
  toTraitsButton.addEventListener("click", () => showScreen("screen3"));
  toCongratsButton.addEventListener("click", () => showScreen("screen4"));

  toResultButton.addEventListener("click", () => {
    updateFinalCard();
    showScreen("screen5");
  });

  restartButton.addEventListener("click", () => {
    resetCharacter();
    showScreen("screen2");
  });

  downloadButton.addEventListener("click", downloadBadge);
  shareButton.addEventListener("click", shareBadge);
}

function showScreen(screenId) {
  const screens = document.querySelectorAll("[data-screen]");

  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === screenId);
  });

  window.scrollTo({ top: 0, behavior: "instant" });
}

function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      document.querySelectorAll("[data-tab]").forEach((tabButton) => {
        tabButton.classList.toggle("is-active", tabButton.dataset.tab === targetTab);
      });

      document.querySelectorAll("[data-tab-content]").forEach((content) => {
        content.classList.toggle("is-active", content.dataset.tabContent === targetTab);
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function renderFaceShapeOptions() {
  const container = document.getElementById("faceShapeOptions");
  container.innerHTML = "";

  FACE_SHAPES.forEach((shape) => {
    const button = createOptionButton({
      label: shape.label,
      isActive: state.faceShape === shape.id,
      onClick: () => {
        state.faceShape = shape.id;

        /*
          При клике на любую форму лица сначала показываем:
          base_skin_very_light_{shape}.png
        */
        state.skinTone = DEFAULT_SKIN_TONE;

        renderFaceShapeOptions();
        renderSkinToneOptions();
        updateAvatar();
      }
    });

    container.appendChild(button);
  });
}

function renderSkinToneOptions() {
  const container = document.getElementById("skinToneOptions");
  container.innerHTML = "";

  SKIN_TONES.forEach((tone) => {
    const button = createSwatchButton({
      label: tone.label,
      color: tone.swatch,
      isActive: state.skinTone === tone.id,
      onClick: () => {
        state.skinTone = tone.id;
        renderSkinToneOptions();
        updateAvatar();
      }
    });

    container.appendChild(button);
  });
}

function renderEyeShapeOptions() {
  const container = document.getElementById("eyeShapeOptions");
  container.innerHTML = "";

  EYE_SHAPES.forEach((shape) => {
    const button = createOptionButton({
      label: shape.label,
      isActive: state.eyeShape === shape.id,
      onClick: () => {
        state.eyeShape = shape.id;

        /*
          При клике на любую форму глаз сначала показываем:
          eyes_light_gray_{shape}_.png
        */
        state.eyeColor = DEFAULT_EYE_COLOR;

        renderEyeShapeOptions();
        renderEyeColorOptions();
        updateAvatar();
      }
    });

    container.appendChild(button);
  });
}

function renderEyeColorOptions() {
  const container = document.getElementById("eyeColorOptions");
  container.innerHTML = "";

  EYE_COLORS.forEach((color) => {
    const button = createSwatchButton({
      label: color.label,
      color: color.swatch,
      isActive: state.eyeColor === color.id,
      onClick: () => {
        state.eyeColor = color.id;
        renderEyeColorOptions();
        updateAvatar();
      }
    });

    container.appendChild(button);
  });
}

function renderTraits() {
  const container = document.getElementById("traitsGrid");
  container.innerHTML = "";

  TRAITS.forEach((trait) => {
    const button = document.createElement("button");
    button.className = "trait-button";
    button.type = "button";
    button.textContent = trait;

    button.addEventListener("click", () => toggleTrait(trait));

    container.appendChild(button);
  });
}

function createOptionButton({ label, isActive, onClick }) {
  const button = document.createElement("button");
  button.className = "option-button";
  button.type = "button";
  button.textContent = label;
  button.classList.toggle("is-active", isActive);
  button.addEventListener("click", onClick);

  return button;
}

function createSwatchButton({ label, color, isActive, onClick }) {
  const button = document.createElement("button");
  button.className = "swatch-button";
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.style.setProperty("--swatch-color", color);
  button.classList.toggle("is-active", isActive);
  button.addEventListener("click", onClick);

  return button;
}

function toggleTrait(trait) {
  const isSelected = state.selectedTraits.includes(trait);

  if (isSelected) {
    state.selectedTraits = state.selectedTraits.filter((item) => item !== trait);
  } else {
    if (state.selectedTraits.length >= 5) {
      return;
    }

    state.selectedTraits.push(trait);
  }

  updateTraitsState();
}

function updateTraitsState() {
  const buttons = document.querySelectorAll(".trait-button");
  const counter = document.getElementById("traitsCounter");
  const toCongratsButton = document.getElementById("toCongratsButton");

  buttons.forEach((button) => {
    const trait = button.textContent.replace("★ ", "").trim();
    button.classList.toggle("is-active", state.selectedTraits.includes(trait));
  });

  counter.textContent = `${state.selectedTraits.length}/5`;
  toCongratsButton.disabled = state.selectedTraits.length !== 5;
}

function getFaceImagePath() {
  return `${ASSET_BASE_PATH}/base_skin_${state.skinTone}_${state.faceShape}.png`;
}

function getEyesImagePath() {
  /*
    Новая схема naming:
    eyes_{color}_{shape}_.png

    Пример:
    eyes_light_gray_no_lashes_.png
    eyes_green_winged_liner_.png
  */
  return `${ASSET_EYES_PATH}/eyes_${state.eyeColor}_${state.eyeShape}_.png`;
}

function updateAvatar() {
  setBackground("faceLayer", getFaceImagePath());
  setBackground("eyesLayer", getEyesImagePath());

  applyEyeStyleClass("eyesLayer", state.eyeShape);

  /*
    Волосы и детали пока очищаем.
    Когда добавим assets, сюда подключим hair/details-логику.
  */
  setBackground("hairLayer", "");
  setBackground("detailsLayer", "");
}

function updateFinalCard() {
  setBackground("finalFaceLayer", getFaceImagePath());
  setBackground("finalEyesLayer", getEyesImagePath());

  applyEyeStyleClass("finalEyesLayer", state.eyeShape);

  setBackground("finalHairLayer", "");
  setBackground("finalDetailsLayer", "");

  const finalTraitsList = document.getElementById("finalTraitsList");
  finalTraitsList.innerHTML = "";

  state.selectedTraits.forEach((trait) => {
    const li = document.createElement("li");
    li.textContent = trait;
    finalTraitsList.appendChild(li);
  });
}

function applyEyeStyleClass(elementId, eyeShape) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  element.classList.remove(
    "eyes-style-no_lashes",
    "eyes-style-short_lashes",
    "eyes-style-long_lashes",
    "eyes-style-winged_liner",
    "eyes-style-smokey",
    "eyes-style-small_waterline"
  );

  element.classList.add(`eyes-style-${eyeShape}`);
}

function setBackground(elementId, imagePath) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  if (!imagePath) {
    element.style.backgroundImage = "";
    return;
  }

  element.style.backgroundImage = `url("${imagePath}")`;
}

function resetCharacter() {
  state.faceShape = "oval";
  state.skinTone = DEFAULT_SKIN_TONE;

  state.eyeShape = "no_lashes";
  state.eyeColor = DEFAULT_EYE_COLOR;

  state.selectedTraits = [];

  renderFaceShapeOptions();
  renderSkinToneOptions();
  renderEyeShapeOptions();
  renderEyeColorOptions();
  updateAvatar();
  updateTraitsState();
}

async function downloadBadge() {
  const badge = document.getElementById("badgeCapture");

  if (!badge || typeof html2canvas === "undefined") {
    return;
  }

  const canvas = await html2canvas(badge, {
    backgroundColor: null,
    scale: 3,
    useCORS: true
  });

  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "character_editor_badge.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function shareBadge() {
  const shareText = "Я создала персонажа в CHARACTER EDITOR by malakhovaa_";

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=&text=${encodeURIComponent(shareText)}`
    );
    return;
  }

  if (navigator.share) {
    await navigator.share({
      title: "CHARACTER EDITOR",
      text: shareText
    });
  }
}
