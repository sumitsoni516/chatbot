const dialogflow = require('dialogflow');
const uuid = require('uuid');

const express= require('express');
const bodyparser= require('body-parser');
const app = express()
const port = process.env.PORT || 5055 ;

const sessionId = uuid.v4();

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.use(bodyparser.urlencoded({
    extended : false
}))

app.use(express.static(__dirname + '/css'))
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-msg',(req,res) => {

    runSample(req.body.MSG).then( data => {
        res.send({
            Reply : data
        })
    })

})


app.listen(port , ()=>{
    console.log('listening on port '+ port)
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'bot-kvif') {
  // A unique identifier for the given session
  

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename : "./bot-kvif-42c3edd90fbe.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg ,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return  result.fulfillmentText;
}

