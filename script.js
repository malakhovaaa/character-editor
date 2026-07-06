document.addEventListener("DOMContentLoaded", () => {
  console.log("CHARACTER EDITOR TEST JS LOADED");

  const faceLayer = document.getElementById("faceLayer");
  const eyesLayer = document.getElementById("eyesLayer");
  const hairBackLayer = document.getElementById("hairBackLayer");
  const hairFrontLayer = document.getElementById("hairFrontLayer");

  console.log("faceLayer:", faceLayer);
  console.log("eyesLayer:", eyesLayer);
  console.log("hairBackLayer:", hairBackLayer);
  console.log("hairFrontLayer:", hairFrontLayer);

  if (faceLayer) {
    faceLayer.style.backgroundImage =
      'url("/assets/avatar/base/base_skin_very_light_oval.png")';
  }

  if (eyesLayer) {
    eyesLayer.style.backgroundImage =
      'url("/assets/avatar/eyes/eyes_no_lashes_light_gray.png")';
    eyesLayer.style.transform = "translateY(-50px) scale(0.52)";
    eyesLayer.style.transformOrigin = "center center";
  }

  if (hairBackLayer) {
    hairBackLayer.style.backgroundImage =
      'url("/assets/avatar/hair/hair_straight_light_brown_back.png")';
  }

  if (hairFrontLayer) {
    hairFrontLayer.style.backgroundImage =
      'url("/assets/avatar/hair/hair_straight_light_brown_front.png")';
  }
});
