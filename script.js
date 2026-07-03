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
  leftHand: "ничего",
  rightHand: "ничего",
  traits: []
};

const traits = [
  "авангардист",
  "безнадежный романтик",
  "безумный",
  "бережливый",
  "бизнесвуман",
  "блэк кэт энерджи",
  "бунтарь",
  "вегетарианец",
  "верит в чудеса",
  "всегда занята",
  "гринфлаг",
  "душа компании",
  "живет в Pinterest",
  "застенчивый",
  "карьерист",
  "книжный червь",
  "кокетливый",
  "кофехолик",
  "кулинар",
  "лежебока",
  "любит детей",
  "любит приключения",
  "матчахолик",
  "на массанаборе",
  "на подсчете калорий",
  "не отвечает на сообщения",
  "ненавидит звонки",
  "неряха",
  "поп-звезда",
  "перфекционист",
  "редфлаг",
  "садовод",
  "скептик",
  "соня",
  "социально неловкий",
  "светский красавец",
  "ферритин — 10",
  "фэшн-икона",
  "художник",
  "чистюля",
  "шутник",
  "эмо",
  "эмоциональный",
  "голден ретривер энерджи"
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

const downloadOverlay = document.getElementById("downloadOverlay");
const downloadImage = document.getElementById("downloadImage");
const closeDownloadBtn = document.getElementById("closeDownloadBtn");

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
    "белые": "#ebe7df",
    "блонд": "#c9ad78",
    "русые": "#8a6a4f",
    "темные": "#4a342d",
    "рыжие": "#c85a24",
    "вишнево-красные": "#4b1421",
    "черные": "#151515"
  };

  const eyeColors = {
    "светло-серые": "#eef1f5",
    "серые": "#909aa6",
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
    "каскад": {
      width: "210px",
      height: "190px",
      top: "36px",
      radius: "48% 48% 34% 34%"
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
    "волнистое каре": {
      width: "206px",
      height: "164px",
      top: "46px",
      radius: "44% 44% 20% 20%"
    },
    "растрепанный пучок": {
      width: "186px",
      height: "132px",
      top: "58px",
      radius: "48% 48% 26% 26%"
    },
    "высокий хвост": {
      width: "196px",
      height: "150px",
      top: "44px",
      radius: "48% 48% 24% 24%"
    },
    "сликбэк": {
      width: "182px",
      height: "120px",
      top: "58px",
      radius: "52% 52% 20% 20%"
    },
    "бигуди": {
      width: "212px",
      height: "182px",
      top: "34px",
      radius: "54% 54% 36% 36%"
    },
    "полотенце": {
      width: "188px",
      height: "124px",
      top: "54px",
      radius: "44% 44% 22% 22%"
    },
    "очень кудрявые": {
      width: "230px",
      height: "190px",
      top: "30px",
      radius: "56% 56% 42% 42%"
    },
    "очень короткие": {
      width: "172px",
      height: "102px",
      top: "62px",
      radius: "54% 54% 26% 26%"
    }
  };

  const eyeShapes = {
    "без ресниц": {
      width: "104px",
      top: "144px",
      height: "26px"
    },
    "короткие ресницы": {
      width: "108px",
      top: "142px",
      height: "30px"
    },
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
    },
    "маленькие глаза": {
      width: "98px",
      top: "145px",
      height: "24px"
    },
    "большие глаза": {
      width: "124px",
      top: "139px",
      height: "36px"
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
  if (state.leftHand !== "ничего") details.push(`левая: ${state.leftHand}`);
  if (state.rightHand !== "ничего") details.push(`правая: ${state.rightHand}`);

  detailsLayer.textContent = details.length ? details.join(" · ") : "детали";

  syncFinalPortrait();
}

function syncFinalPortrait() {
  finalFaceLayer.style.background = faceLayer.style.background;
  finalFaceLayer.style.borderRadius = faceLayer.style.borderRadius;
  finalFaceLayer.style.width = faceLayer.style.width;
  finalFaceLayer.style.height = faceLayer.style.height;
  finalFaceLayer.style.top = faceLayer.style.top;
  finalFaceLayer.textContent = "";

  finalEyesLayer.style.color = eyesLayer.style.color;
  finalEyesLayer.style.width = eyesLayer.style.width;
  finalEyesLayer.style.height = eyesLayer.style.height;
  finalEyesLayer.style.top = eyesLayer.style.top;
  finalEyesLayer.textContent = "";

  finalHairLayer.style.background = hairLayer.style.background;
  finalHairLayer.style.width = hairLayer.style.width;
  finalHairLayer.style.height = hairLayer.style.height;
  finalHairLayer.style.top = hairLayer.style.top;
  finalHairLayer.style.borderRadius = hairLayer.style.borderRadius;
  finalHairLayer.textContent = "";

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
    if (!resultCard || !downloadOverlay || !downloadImage) return;

    downloadBtn.textContent = "готовим карточку...";
    downloadBtn.disabled = true;

    const canvas = await html2canvas(resultCard, {
      backgroundColor: "#f4f0e9",
      scale: 3,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    });

    const imageUrl = canvas.toDataURL("image/png");

    downloadImage.src = imageUrl;
    downloadOverlay.classList.remove("hidden");

    downloadBtn.textContent = "скачать карточку";
    downloadBtn.disabled = false;
  } catch (error) {
    downloadBtn.textContent = "скачать карточку";
    downloadBtn.disabled = false;
    alert("Не получилось подготовить карточку. Попробуй сделать скриншот.");
  }
}

function closeDownloadPreview() {
  downloadOverlay.classList.add("hidden");
}

function shareInTelegram() {
  const text = encodeURIComponent(
    "собери своего персонажа в CHARACTER EDITOR by malakhovaa_"
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
  state.leftHand = "ничего";
  state.rightHand = "ничего";
  state.traits = [];

  document.querySelectorAll(".option-grid button, .trait-button").forEach((button) => {
    button.classList.remove("active");
  });

  setDefaultActiveButtons();
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

if (closeDownloadBtn) {
  closeDownloadBtn.addEventListener("click", closeDownloadPreview);
}

if (downloadOverlay) {
  downloadOverlay.addEventListener("click", (event) => {
    if (event.target === downloadOverlay) {
      closeDownloadPreview();
    }
  });
}

initTelegram();
setupTabs();
setupOptionButtons();
renderTraits();
setDefaultActiveButtons();
updatePortrait();
updateTraitsCounter();
