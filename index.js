/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tfc from '@tensorflow/tfjs-core';
import {MobileNet} from './mobilenet';

var snapshotCanvas = document.getElementById('snapshot');
var captureButton = document.getElementById('capture');
var imageObj = new Image();

captureButton.addEventListener('click', async () => {
  var player = document.getElementsByTagName('video')[0];  
  var context = snapshot.getContext('2d');

  context.drawImage(player, 0, 0, snapshotCanvas.width,
      snapshotCanvas.height);
  imageObj.src = snapshotCanvas.toDataURL();

  const resultElement = document.getElementById('result');
  resultElement.innerText = 'Loading MobileNet...';

  const mobileNet = new MobileNet();
  console.time('Loading of model');
  await mobileNet.load();
  console.timeEnd('Loading of model');

  const pixels = tfc.fromPixels(snapshotCanvas);

  console.time('First prediction');
  let result = mobileNet.predict(pixels);
  const topK = mobileNet.getTopKClasses(result, 3);
  console.timeEnd('First prediction');

  resultElement.innerText = '';
  topK.forEach(x => {
    resultElement.innerText += `${x.value.toFixed(3)}: ${x.label}\n`;
  });

  console.time('Subsequent predictions');
  result = mobileNet.predict(pixels);
  mobileNet.getTopKClasses(result, 3);
  console.timeEnd('Subsequent predictions');

  mobileNet.dispose();
});
