import * as tfc from "@tensorflow/tfjs-core";
import "./index.css";
import { MobileNet } from "./mobilenet";

const snapshotCanvas = document.getElementById("snapshot");
const captureButton = document.getElementById("capture");
const contentElement = document.getElementById("content");
const closeButton = document.getElementById("close");
const loaderElement = document.getElementById("loader");
const imageObj = new Image();

closeButton.addEventListener("click", () => {
  contentElement.style.display = "none";
});

captureButton.addEventListener("click", async () => {
  contentElement.style.display = "none";
  loaderElement.style.display = "block";

  const player = document.getElementsByTagName("video")[0];
  const context = snapshot.getContext("2d");

  context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
  imageObj.src = snapshotCanvas.toDataURL();

  const mobileNet = new MobileNet();
  console.time("Loading of model");
  await mobileNet.load();
  console.timeEnd("Loading of model");

  const pixels = tfc.fromPixels(snapshotCanvas);
  console.time("prediction");
  let result = mobileNet.predict(pixels);
  const topK = mobileNet.getTopKClasses(result, 1);
  console.log(topK[0].label);
  console.timeEnd("prediction");

  loaderElement.style.display = "none";
  mobileNet.dispose();
});
