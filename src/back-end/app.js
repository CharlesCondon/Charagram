require('dotenv').config();
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require("express"); 
const cors = require("cors");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
        apikey: `${process.env.IBM_KEY}`,
    }),
    serviceUrl: `${process.env.IBM_URL}`,
});

const app = express();
// const corsOption = {
//     origin: "https://charlesgram.vercel.app"
// }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/home', cors(), (req,res) => {
    //console.log('home hit')
    console.log(req)
    const analyzeParams = {
        'text': `${req.body.text}`,
        'features': {
            'sentiment': {
                'document': true
            }
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(analysisResults)
            res.status(200).send(analysisResults.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
            if (err.code === 422) {
                res.status(200).send("Sorry the post isn't long anough to evaluate :(")
            }
        });
})
app.get('/home/post', cors(), (req,res) => {
    const analyzeParams = {
        'text': `${req.body.text}`,
        'features': {
            'sentiment': {
                'document': true
            }
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            res.status(200).send(analysisResults.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
            if (err.code === 422) {
                res.status(200).send("Sorry the post isn't long anough to evaluate :(")
            }
        });
})

module.exports = app