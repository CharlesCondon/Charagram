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
            res.send(analysisResults.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
            if (err.code === 422) {
                res.send("Sorry the post isn't long anough to evaluate :(")
            }
        });
})
app.post('/home/post', cors(), (req,res) => {
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
            res.send(analysisResults.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
            if (err.code === 422) {
                res.send("Sorry the post isn't long anough to evaluate :(")
            }
        });
})

module.exports = app