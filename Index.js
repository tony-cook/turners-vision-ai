const express = require('express')
const automl = require('@google-cloud/automl');
const fs = require('fs');
const cors = require('cors');
const app = express();

require('dotenv').config()
app.use(cors())
app.use(express.json({limit: '50mb'}));

app.post('/',(req,res) => {

  const resData = []
  // Create client for prediction service.
  const client = new automl.PredictionServiceClient();

  const projectId = "able-groove-341421";
  const computeRegion = "us-central1";
  const modelId = "ICN5964558110591811584";
  const scoreThreshold = "0.5";

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Read the file content for prediction.
  const contentTest = req.body.image
  const params = {};

  if (scoreThreshold) {
    params.score_threshold = scoreThreshold;
  }
  if(contentTest) {
    checker ()
  }


  async function checker () {
    const payload = {};
    payload.image = {imageBytes: contentTest};


  const [response] = await client.predict({
      name: modelFullId,
      payload: payload,
      params: params,
    });

    const resGoogleApi = response.payload[0].displayName
    resData.push(resGoogleApi)
    res.send(resData)
    };
})

app.listen('8080', function() {
    console.log('API is ready!')
})