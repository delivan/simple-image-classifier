# Simple Image classifier using Tensorflow.js

1. Create data and Save to `training/data`.

2. Retrain MobileNet model on own data using Docker.

```
cd training
docker build -t model-builder .
docker run -v /path/to/data:/data -it model-builder
```

3. Build and Run

```
npm run build
npm start
```
