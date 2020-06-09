// // libraries:
var request = require('request');

// auth keys:
const SECRET_KEY = '3c259e6d9c0fa1b0e9c6b22e3e3ec46bc36767ce';
const PROJECT_API_KEY = 46053042
const BASE_URL = 'https://insights.opentok.com/graphql'

// //query to fire:
const usageDataQuery = '{\n  project(projectId: 46053042) {\n    projectData(\n      start: "2020-06-01T04:19:01.056Z",\n      interval: AUTO,\n      sdkType: [JS, IOS, ANDROID],\n      groupBy: [SDK_TYPE]\n    ) {\n      resources {\n        intervalStart,\n        intervalEnd,\n        sdkType,\n        usage {\n          streamedPublishedMinutes,\n          streamedSubscribedMinutes\n        }\n      }\n    }\n  }\n}';

// custom claims: (iat: current time and exp: expiry time : 3 mins)
const claims = {
    "iss": PROJECT_API_KEY,
    "ist": "project",
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000) + (3 * 60),
    "jti": "jwt_nonce"
};

//generate token:
var jwt = require('jsonwebtoken');
var token = jwt.sign(claims, SECRET_KEY);

//post request options with custom header and JWT token and query for usage data in the body:
var options = {
  'method': 'POST',
  'url': BASE_URL,
  'headers': {
    'X-OPENTOK-AUTH': token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: usageDataQuery,
    variables: {}
  })
};

//post request:
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});