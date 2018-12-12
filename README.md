# Image classifier using Tensorflow.js and ar.js

It was inspired by [Tensorflow.js example code](https://github.com/google/emoji-scavenger-hunt)

1. Create data and Save to client/training/data
2. Retrain MobileNet model on own data using Docker

```
cd client/training
docker build -t model-builder .
docker run -v /path/to/data:/data -it model-builder
```

3. Build client source

```
cd client
npm run build
```

4. Run

```
npm start
```
