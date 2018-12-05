import {loadFrozenModel} from '@tensorflow/tfjs-converter';
import * as tfc from '@tensorflow/tfjs-core';
import {IMAGENET_CLASSES} from './imagenet_classes';

const GOOGLE_CLOUD_STORAGE_DIR = 'https://storage.googleapis.com/staging.ai4ar-d2209.appspot.com/saved_model_web/';
const MODEL_FILE_URL = 'tensorflowjs_model.pb';
const WEIGHT_MANIFEST_FILE_URL = 'weights_manifest.json';
const INPUT_NODE_NAME = 'input';
const OUTPUT_NODE_NAME = 'final_result';
const PREPROCESS_DIVISOR = tfc.scalar(255 / 2);

export class MobileNet {
  constructor() { }

  async load() {
    this.model = await loadFrozenModel(
        GOOGLE_CLOUD_STORAGE_DIR + MODEL_FILE_URL,
        GOOGLE_CLOUD_STORAGE_DIR + WEIGHT_MANIFEST_FILE_URL);
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }

  predict(input) {
    const preprocessedInput = tfc.div(
        tfc.sub(input.asType('float32'), PREPROCESS_DIVISOR),
        PREPROCESS_DIVISOR);
    const reshapedInput =
        preprocessedInput.reshape([1, ...preprocessedInput.shape]);
    return this.model.execute(
        {[INPUT_NODE_NAME]:reshapedInput}, OUTPUT_NODE_NAME);
  }

  getTopKClasses(predictions, topK) {
    const values = predictions.dataSync();
    predictions.dispose();

    let predictionList = [];
    for (let i = 0; i < values.length; i++) {
      predictionList.push({value: values[i], index: i});
    }
    predictionList = predictionList.sort((a, b) => {
                           return b.value - a.value;
                         }).slice(0, topK);

    return predictionList.map(x => {
      return {label: IMAGENET_CLASSES[x.index], value: x.value};
    });
  }
}
