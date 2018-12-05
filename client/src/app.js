import * as tfc from "@tensorflow/tfjs-core";
import './index.css';
import { MobileNet } from "./mobilenet";

var snapshotCanvas = document.getElementById("snapshot");
var captureButton = document.getElementById("capture");
var contentElement = document.getElementById("content");
var iknowButton = document.getElementById("iknow");
var loaderElement = document.getElementById("loader");
var imageObj = new Image();

iknowButton.addEventListener("click", function() {
  console.log("?");
  contentElement.style.display = "none";
});

// captureButton.addEventListener('click', async () => {
//   contentElement.style.display = "none";
//   loaderElement.style.display = "block";

//   var player = document.getElementsByTagName('video')[0];
//   var context = snapshot.getContext('2d');

//   context.drawImage(player, 0, 0, snapshotCanvas.width,
//       snapshotCanvas.height);
//   imageObj.src = snapshotCanvas.toDataURL();

//   const mobileNet = new MobileNet();
//   console.time('Loading of model');
//   await mobileNet.load();
//   console.timeEnd('Loading of model');

//   const pixels = tfc.fromPixels(snapshotCanvas);

//   console.time('prediction');
//   let result = mobileNet.predict(pixels);
//   const topK = mobileNet.getTopKClasses(result, 1);
//   console.log(topK[0].label);
//   console.timeEnd('prediction');

//   loaderElement.style.display = "none";
//   const model = document.getElementById("3d-model");
//   const src = topK[0].label;
//   switch(src) {
//     case 'pen':
//       model.setAttribute("scale", "0.1 0.1 0.1");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'laptop':
//       model.setAttribute("scale", "0.5 0.5 0.5");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'monitor':
//       model.setAttribute("scale", "0.03 0.03 0.03");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'mouse':
//       model.setAttribute("scale", "0.07 0.07 0.07");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'note':
//       model.setAttribute("scale", "0.4 0.4 0.4");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'smartphone':
//       model.setAttribute("scale", "0.3 0.3 0.3");
//       model.setAttribute("src", "#" + src);
//       break;
//     case 'keyboard':
//       model.setAttribute("scale", "0.1 0.1 0.1");
//       model.setAttribute("src", "#" + src);
//       break;
//     default:
//       model.setAttribute("scale", "1 1 1");
//       model.setAttribute("src", "#" + src);
//       break;
//   }

//   mobileNet.dispose();
// });
