const state = {
  faceShape: "круглое",
  skinTone: "светлый",
  eyeType: "длинные ресницы",
  eyeColor: "карие",
  hairStyle: "блоуаут",
  hairColor: "темные",
  glasses: "ничего",
  ears: "ничего",
  features: [],
  mask: "ничего",
  leftHand: "ничего",
  rightHand: "ничего",
  traits: []
};

const traits = [
  "книжный червь",
  "редфлаг",
  "безнадежный романтик",
  "бизнесвуман",
  "авангардист",
  "black cat energy",
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
  "golden retriever energy",
  "бережливый",
  "неряха",
  "фэшн-икона",
  "верит в чудеса",
  "кофехолик",
  "светский красавец",
  "эмо",
  "вегетарианец",
  "на массанаборе",
  "шутник",
  "чистюля",
  "застенчивый",
  "кулинар",
  "любит детей",
  "скептик"
];

const screens = {
  start: document.getElementById("screen-start"),
  editor: document.getElementById("screen-editor"),
  traits: document.getElementById("screen-traits"),
  congrats: document.getElementById("screen-congrats"),
  result: document.getElementById("screen-result")
};

const startBtn = document.getElementById("startBtn");
const toTraitsBtn = document.getElementById("toTraitsBtn");
const finishTraitsBtn = document.getElementById("finishTraitsBtn");
const showCardBtn = document.getElementById("showCardBtn");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");
const restartBtn = document.getElementById("restartBtn");

const traitsList = document.getElementById("traitsList");
const traitsCounter = document.getElementById("traitsCounter");

const faceLayer = document.getElementById("faceLayer");
const eyesLayer = document.getElementById("eyesLayer");
const hairLayer = document.getElementById("hairLayer");
const detailsLayer = document.getElementById("detailsLayer");

const finalFaceLayer = document.getElementById("finalFaceLayer");
const finalEyesLayer = document.getElementById("finalEyesLayer");
const finalHairLayer = document.getElementById("finalHairLayer");
const finalDetailsLayer = document.getElementById("finalDetailsLayer");
const finalTraitsList = document.getElementById("finalTraitsList");
const resultCard = document.getElementById("resultCard");

function showScreen(name) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  screens[name].classList.add("active");
  window.scrollTo(0, 0);
}

function initTelegram() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }
}

function setActiveButton(group, value) {
  const groupElement = document.querySelector(`[data-group="${group}"]`);
  if (!groupElement) return;

  const buttons = groupElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.value === value);
  });
}

function updatePortrait() {
  const faceColors = {
    "очень светлый": "#f6d7c3",
    "светлый": "#efc2a4",
    "средний": "#c98963",
    "темный": "#7a4b35"
  };

  const hairColors = {
    "блонд": "#d8bd77",
    "темные": "#4a342d",
    "русые": "#8a6a4f",
    "рыжие": "#aa4d2f",
    "черные": "#151515"
  };

  const eyeColors = {
    "карие": "#5b3422",
    "голубые": "#88aeca",
    "зеленые": "#6f8e67",
    "почти черные": "#181412"
  };

  const faceRadius = {
    "круглое": "50% 50% 46% 46%",
    "овальное": "48% 48% 52% 52%",
    "острый подбородок": "48% 48% 62% 62%",
    "квадратное со скулами": "34% 34% 30% 30%"
  };

  const hairShapes = {
    "прямые": {
      width: "198px",
      height: "200px",
      top: "36px",
      radius: "46% 46% 28% 28%"
    },
    "блоуаут": {
      width: "222px",
      height: "178px",
      top: "34px",
      radius: "52% 52% 34% 34%"
    },
    "каре": {
      width: "202px",
      height: "158px",
      top: "48px",
      radius: "44% 44% 16% 16%"
    },
    "очень кудрявые": {
      width: "230px",
      height: "190px",
      top: "30px",
      radius: "56% 56% 42% 42%"
    },
    "растрепанный пучок": {
      width: "186px",
      height: "132px",
      top: "58px",
      radius: "48% 48% 26% 26%"
    },
    "очень короткие": {
      width: "172px",
      height: "102px",
      top: "62px",
      radius: "54% 54% 26% 26%"
    }
  };

  const eyeShapes = {
    "длинные ресницы": {
      width: "118px",
      top: "142px",
      height: "34px"
    },
    "стрелки": {
      width: "126px",
      top: "140px",
      height: "30px"
    },
    "smoky eyes": {
      width: "126px",
      top: "140px",
      height: "36px"
    },
    "узкие глаза": {
      width: "112px",
      top: "146px",
      height: "24px"
    }
  };

  const faceStyle = faceRadius[state.faceShape] || faceRadius["круглое"];
  const hairStyle = hairShapes[state.hairStyle] || hairShapes["блоуаут"];
  const eyeStyle = eyeShapes[state.eyeType] || eyeShapes["длинные ресницы"];

  faceLayer.style.background = faceColors[state.skinTone] || "#efc2a4";
  faceLayer.style.borderRadius = faceStyle;
  faceLayer.textContent = "";

  hairLayer.style.background = hairColors[state.hairColor] || "#4a342d";
  hairLayer.style.width = hairStyle.width;
  hairLayer.style.height = hairStyle.height;
  hairLayer.style.top = hairStyle.top;
  hairLayer.style.borderRadius = hairStyle.radius;
  hairLayer.textContent = "";

  eyesLayer.style.color = eyeColors[state.eyeColor] || "#5b3422";
  eyesLayer.style.width = eyeStyle.width;
  eyesLayer.style.height = eyeStyle.height;
  eyesLayer.style.top = eyeStyle.top;
  eyesLayer.textContent = "";

  const details = [];

  if (state.glasses !== "ничего") details.push(state.glasses);
  if (state.ears !== "ничего") details.push(state.ears);
  if (state.features.length) details.push(...state.features);
  if (state.mask !== "ничего") details.push(state.mask);
  if (state.leftHand !== "ничего") details.push(`левая: ${state.leftHand}`);
  if (state.rightHand !== "ничего") details.push(`правая: ${state.rightHand}`);

  detailsLayer.textContent = details.length ? details.join(" · ") : "детали";

  syncFinalPortrait();
}

function syncFinalPortrait() {
  finalFaceLayer.style.background = faceLayer.style.background;
  finalFaceLayer.style.borderRadius = faceLayer.style.borderRadius;
  finalFaceLayer.textContent = faceLayer.textContent;

  finalEyesLayer.style.background = eyesLayer.style.background;
  finalEyesLayer.style.color = eyesLayer.style.color;
  finalEyesLayer.textContent = eyesLayer.textContent;

  finalHairLayer.style.background = hairLayer.style.background;
  finalHairLayer.textContent = hairLayer.textContent;

  finalDetailsLayer.textContent = detailsLayer.textContent;
}

function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      tabButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach((content) => {
        content.classList.toggle("active", content.id === `tab-${tab}`);
      });
    });
  });
}

function setupOptionButtons() {
  const optionGroups = document.querySelectorAll(".option-grid");

  optionGroups.forEach((groupElement) => {
    const groupName = groupElement.dataset.group;
    const isMulti = groupElement.classList.contains("multi");

    groupElement.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (isMulti) {
          const currentValues = state[groupName];

          if (currentValues.includes(value)) {
            state[groupName] = currentValues.filter((item) => item !== value);
            button.classList.remove("active");
          } else {
            state[groupName].push(value);
            button.classList.add("active");
          }
        } else {
          state[groupName] = value;
          setActiveButton(groupName, value);
        }

        updatePortrait();
      });
    });
  });
}

function renderTraits() {
  traitsList.innerHTML = "";

  traits.forEach((trait) => {
    const button = document.createElement("button");
    button.className = "trait-button";
    button.textContent = trait;

    button.addEventListener("click", () => {
      const isSelected = state.traits.includes(trait);

      if (isSelected) {
        state.traits = state.traits.filter((item) => item !== trait);
        button.classList.remove("active");
      } else {
        if (state.traits.length >= 5) return;

        state.traits.push(trait);
        button.classList.add("active");
      }

      updateTraitsCounter();
    });

    traitsList.appendChild(button);
  });
}

function updateTraitsCounter() {
  traitsCounter.textContent = `${state.traits.length}/5`;

  if (state.traits.length === 5) {
    finishTraitsBtn.classList.remove("disabled");
  } else {
    finishTraitsBtn.classList.add("disabled");
  }
}

function renderFinalTraits() {
  finalTraitsList.innerHTML = "";

  state.traits.forEach((trait) => {
    const item = document.createElement("li");
    item.textContent = trait;
    finalTraitsList.appendChild(item);
  });
}

async function downloadCard() {
  try {
    const canvas = await html2canvas(resultCard, {
      backgroundColor: "#fffdf8",
      scale: 2
    });

    const link = document.createElement("a");
    link.download = "character-editor-malakhovaa.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    alert("Не получилось скачать карточку. Попробуй сделать скриншот.");
  }
}

function shareInTelegram() {
  const text = encodeURIComponent(
    "я создала персонажа в CHARACTER EDITOR by malakhovaa_"
  );

  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;

  window.open(shareUrl, "_blank");
}

function resetApp() {
  state.faceShape = "круглое";
  state.skinTone = "светлый";
  state.eyeType = "длинные ресницы";
  state.eyeColor = "карие";
  state.hairStyle = "блоуаут";
  state.hairColor = "темные";
  state.glasses = "ничего";
  state.ears = "ничего";
  state.features = [];
  state.mask = "ничего";
  state.leftHand = "ничего";
  state.rightHand = "ничего";
  state.traits = [];

  document.querySelectorAll(".option-grid button, .trait-button").forEach((button) => {
    button.classList.remove("active");
  });

  setActiveButton("faceShape", state.faceShape);
  setActiveButton("skinTone", state.skinTone);
  setActiveButton("eyeType", state.eyeType);
  setActiveButton("eyeColor", state.eyeColor);
  setActiveButton("hairStyle", state.hairStyle);
  setActiveButton("hairColor", state.hairColor);
  setActiveButton("glasses", state.glasses);
  setActiveButton("ears", state.ears);
  setActiveButton("mask", state.mask);
  setActiveButton("leftHand", state.leftHand);
  setActiveButton("rightHand", state.rightHand);

  updatePortrait();
  updateTraitsCounter();
  showScreen("editor");
}

function setDefaultActiveButtons() {
  setActiveButton("faceShape", state.faceShape);
  setActiveButton("skinTone", state.skinTone);
  setActiveButton("eyeType", state.eyeType);
  setActiveButton("eyeColor", state.eyeColor);
  setActiveButton("hairStyle", state.hairStyle);
  setActiveButton("hairColor", state.hairColor);
  setActiveButton("glasses", state.glasses);
  setActiveButton("ears", state.ears);
  setActiveButton("mask", state.mask);
  setActiveButton("leftHand", state.leftHand);
  setActiveButton("rightHand", state.rightHand);
}

startBtn.addEventListener("click", () => {
  showScreen("editor");
});

toTraitsBtn.addEventListener("click", () => {
  showScreen("traits");
});

finishTraitsBtn.addEventListener("click", () => {
  if (state.traits.length !== 5) return;
  showScreen("congrats");
});

showCardBtn.addEventListener("click", () => {
  renderFinalTraits();
  syncFinalPortrait();
  showScreen("result");
});

downloadBtn.addEventListener("click", downloadCard);
shareBtn.addEventListener("click", shareInTelegram);
restartBtn.addEventListener("click", resetApp);

initTelegram();
setupTabs();
setupOptionButtons();
renderTraits();
setDefaultActiveButtons();
updatePortrait();
updateTraitsCounter();