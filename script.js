const ASSET_BASE_PATH = "assets/avatar/base";
const ASSET_EYES_PATH = "assets/avatar/eyes";
const ASSET_HAIR_PATH = "assets/avatar/hair";

const DEFAULT_SKIN_TONE = "very_light";
const DEFAULT_EYE_COLOR = "light_gray";
const DEFAULT_HAIR_COLOR = "light_brown";

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

const HAIR_STYLES = [
  { id: null, label: "без волос" },
  { id: "straight", label: "прямые" },
  { id: "cascade", label: "каскад" }
];

const HAIR_COLORS = [
  { id: "white", label: "белые", swatch: "#f1eee7" },
  { id: "blonde", label: "блонд", swatch: "#d8bd82" },
  { id: "light_brown", label: "светло-русые", swatch: "#a9825d" },
  { id: "dark", label: "темные", swatch: "#4a3026" },
  { id: "orange_red", label: "рыжие", swatch: "#b65b2e" },
  { id: "cherry_red", label: "вишневые", swatch: "#6f1f2c" },
  { id: "black", label: "черные", swatch: "#151312" }
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

  hairStyle: null,
  hairColor: DEFAULT_HAIR_COLOR,

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
  renderHairStyleOptions();
  renderHairColorOptions();
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

function getEl(id) {
  return document.getElementById(id);
}

function safeClick(id, handler) {
  const element = getEl(id);
  if (!element) return;
  element.addEventListener("click", handler);
}

function initNavigation() {
  safeClick("startButton", () => showScreen("screen2"));
  safeClick("toTraitsButton", () => showScreen("screen3"));
  safeClick("toCongratsButton", () => showScreen("screen4"));

  safeClick("toResultButton", () => {
    updateFinalCard();
    showScreen("screen5");
  });

  safeClick("restartButton", () => {
    resetCharacter();
    showScreen("screen2");
  });

  safeClick("downloadButton", downloadBadge);
  safeClick("shareButton", shareBadge);
}

function showScreen(screenId) {
  document.querySelectorAll("[data-screen]").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === screenId);
  });

  window.scrollTo({ top: 0, behavior: "auto" });
}

function initTabs() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      document.querySelectorAll("[data-tab]").forEach((tabButton) => {
        tabButton.classList.toggle("is-active", tabButton.dataset.tab === targetTab);
      });

      document.querySelectorAll("[data-tab-content]").forEach((content) => {
        content.classList.toggle("is-active", content.dataset.tabContent === targetTab);
      });

      window.scrollTo({ top: 0, behavior: "auto" });
    });
  });
}

function renderFaceShapeOptions() {
  const container = getEl("faceShapeOptions");
  if (!container) return;

  container.innerHTML = "";

  FACE_SHAPES.forEach((shape) => {
    container.appendChild(
      createOptionButton({
        label: shape.label,
        isActive: state.faceShape === shape.id,
        onClick: () => {
          state.faceShape = shape.id;
          state.skinTone = DEFAULT_SKIN_TONE;

          renderFaceShapeOptions();
          renderSkinToneOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderSkinToneOptions() {
  const container = getEl("skinToneOptions");
  if (!container) return;

  container.innerHTML = "";

  SKIN_TONES.forEach((tone) => {
    container.appendChild(
      createStarSwatchButton({
        label: tone.label,
        color: tone.swatch,
        isActive: state.skinTone === tone.id,
        onClick: () => {
          state.skinTone = tone.id;
          renderSkinToneOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderEyeShapeOptions() {
  const container = getEl("eyeShapeOptions");
  if (!container) return;

  container.innerHTML = "";

  EYE_SHAPES.forEach((shape) => {
    container.appendChild(
      createOptionButton({
        label: shape.label,
        isActive: state.eyeShape === shape.id,
        onClick: () => {
          state.eyeShape = shape.id;
          state.eyeColor = DEFAULT_EYE_COLOR;

          renderEyeShapeOptions();
          renderEyeColorOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderEyeColorOptions() {
  const container = getEl("eyeColorOptions");
  if (!container) return;

  container.innerHTML = "";

  EYE_COLORS.forEach((color) => {
    container.appendChild(
      createStarSwatchButton({
        label: color.label,
        color: color.swatch,
        isActive: state.eyeColor === color.id,
        onClick: () => {
          state.eyeColor = color.id;
          renderEyeColorOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderHairStyleOptions() {
  const container = getEl("hairStyleOptions");
  if (!container) return;

  container.innerHTML = "";

  HAIR_STYLES.forEach((style) => {
    container.appendChild(
      createOptionButton({
        label: style.label,
        isActive: state.hairStyle === style.id,
        onClick: () => {
          state.hairStyle = style.id;

          if (state.hairStyle && !state.hairColor) {
            state.hairColor = DEFAULT_HAIR_COLOR;
          }

          renderHairStyleOptions();
          renderHairColorOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderHairColorOptions() {
  const container = getEl("hairColorOptions");
  if (!container) return;

  container.innerHTML = "";

  HAIR_COLORS.forEach((color) => {
    container.appendChild(
      createStarSwatchButton({
        label: color.label,
        color: color.swatch,
        isActive: state.hairColor === color.id,
        onClick: () => {
          state.hairColor = color.id;

          if (!state.hairStyle) {
            state.hairStyle = "straight";
          }

          renderHairStyleOptions();
          renderHairColorOptions();
          updateAvatar();
        }
      })
    );
  });
}

function renderTraits() {
  const container = getEl("traitsGrid");
  if (!container) return;

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

function createStarSwatchButton({ label, color, isActive, onClick }) {
  const button = document.createElement("button");
  button.className = "star-swatch-button";
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.style.setProperty("--swatch-color", color);
  button.classList.toggle("is-active", isActive);

  const hiddenLabel = document.createElement("span");
  hiddenLabel.className = "visually-hidden";
  hiddenLabel.textContent = label;
  button.appendChild(hiddenLabel);

  button.addEventListener("click", onClick);
  return button;
}

function toggleTrait(trait) {
  if (state.selectedTraits.includes(trait)) {
    state.selectedTraits = state.selectedTraits.filter((item) => item !== trait);
  } else {
    if (state.selectedTraits.length >= 5) return;
    state.selectedTraits.push(trait);
  }

  updateTraitsState();
}

function updateTraitsState() {
  document.querySelectorAll(".trait-button").forEach((button) => {
    const trait = button.textContent.replace("★ ", "").trim();
    button.classList.toggle("is-active", state.selectedTraits.includes(trait));
  });

  const counter = getEl("traitsCounter");
  if (counter) counter.textContent = `${state.selectedTraits.length}/5`;

  const toCongratsButton = getEl("toCongratsButton");
  if (toCongratsButton) {
    toCongratsButton.disabled = state.selectedTraits.length !== 5;
  }
}

function getFaceImagePath() {
  return `${ASSET_BASE_PATH}/base_skin_${state.skinTone}_${state.faceShape}.png`;
}

function getEyesImagePath() {
  return `${ASSET_EYES_PATH}/eyes_${state.eyeShape}_${state.eyeColor}.png`;
}

function getHairBackImagePath() {
  if (!state.hairStyle) return "";
  return `${ASSET_HAIR_PATH}/hair_${state.hairStyle}_${state.hairColor}_back.png`;
}

function getHairFrontImagePath() {
  if (!state.hairStyle) return "";
  return `${ASSET_HAIR_PATH}/hair_${state.hairStyle}_${state.hairColor}_front.png`;
}

function updateAvatar() {
  setBackground("faceLayer", getFaceImagePath());
  setBackground("eyesLayer", getEyesImagePath());

  setBackground("hairBackLayer", getHairBackImagePath());
  setBackground("hairFrontLayer", getHairFrontImagePath());

  setBackground("detailsLayer", "");

  applyEyeStyleClass("eyesLayer", state.eyeShape);
  applyHairStyleClass("hairBackLayer", state.hairStyle);
  applyHairStyleClass("hairFrontLayer", state.hairStyle);
}

function updateFinalCard() {
  setBackground("finalFaceLayer", getFaceImagePath());
  setBackground("finalEyesLayer", getEyesImagePath());

  setBackground("finalHairBackLayer", getHairBackImagePath());
  setBackground("finalHairFrontLayer", getHairFrontImagePath());

  setBackground("finalDetailsLayer", "");

  applyEyeStyleClass("finalEyesLayer", state.eyeShape);
  applyHairStyleClass("finalHairBackLayer", state.hairStyle);
  applyHairStyleClass("finalHairFrontLayer", state.hairStyle);

  const finalTraitsList = getEl("finalTraitsList");
  if (!finalTraitsList) return;

  finalTraitsList.innerHTML = "";

  state.selectedTraits.forEach((trait) => {
    const li = document.createElement("li");
    li.textContent = trait;
    finalTraitsList.appendChild(li);
  });
}

function setBackground(elementId, imagePath) {
  const element = getEl(elementId);
  if (!element) return;

  if (!imagePath) {
    element.style.backgroundImage = "";
    return;
  }

  element.style.backgroundImage = `url("${imagePath}")`;
}

function applyEyeStyleClass(elementId, eyeShape) {
  const element = getEl(elementId);
  if (!element) return;

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

function applyHairStyleClass(elementId, hairStyle) {
  const element = getEl(elementId);
  if (!element) return;

  element.classList.remove("hair-style-straight", "hair-style-cascade");

  if (hairStyle) {
    element.classList.add(`hair-style-${hairStyle}`);
  }
}

function resetCharacter() {
  state.faceShape = "oval";
  state.skinTone = DEFAULT_SKIN_TONE;

  state.eyeShape = "no_lashes";
  state.eyeColor = DEFAULT_EYE_COLOR;

  state.hairStyle = null;
  state.hairColor = DEFAULT_HAIR_COLOR;

  state.selectedTraits = [];

  renderFaceShapeOptions();
  renderSkinToneOptions();
  renderEyeShapeOptions();
  renderEyeColorOptions();
  renderHairStyleOptions();
  renderHairColorOptions();
  updateAvatar();
  updateTraitsState();
}

async function downloadBadge() {
  const badge = getEl("badgeCapture");
  if (!badge || typeof html2canvas === "undefined") return;

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
