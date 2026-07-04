function updatePortrait() {
  const testBaseFace = "assets/avatar/base/base_skin_light_oval.png";
  const testEyes = "assets/avatar/eyes/eyes_no_lashes_brown.png";

  const faceLayer = document.getElementById("faceLayer");
  const eyesLayer = document.getElementById("eyesLayer");
  const hairLayer = document.getElementById("hairLayer");
  const detailsLayer = document.getElementById("detailsLayer");

  if (faceLayer) {
    faceLayer.textContent = "";
    faceLayer.style.backgroundImage = `url("${testBaseFace}")`;
  }

  if (eyesLayer) {
    eyesLayer.textContent = "";
    eyesLayer.style.backgroundImage = `url("${testEyes}")`;
  }

  if (hairLayer) {
    hairLayer.textContent = "";
    hairLayer.style.backgroundImage = "none";
  }

  if (detailsLayer) {
    detailsLayer.textContent = "";
    detailsLayer.style.backgroundImage = "none";
  }
}
