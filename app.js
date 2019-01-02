var indico = require("indico.io");
indico.apiKey = "COPY FROM TEXT";
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser"); //to get req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var answerArray = [];
var avg;
var avgHunna;
var avgString = "";
var totalScore = [],
  description = [];
var sequence = Promise.resolve();

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/search", function(req, res) {
  res.render("search");
});

app.get("/pLogin", function(req, res) {
  res.render("pLogin");
});

app.get("/hcpLogin", function(req, res) {
  res.render("hcpLogin");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.all("/skrt", function(req, res) {
  // console.log(req.body);
  // console.log('req :????  ');
  // console.log(req);
  var response = function(res) {
    console.log(res);
  };

  res.render("thank");
  var array = req.body;
  console.log(array["paging"][0]);
  var promise = indico
    .batchSentiment(JSON.stringify(array))
    .then(response)
    .catch(function(err) {
      console.log(err);
    });
});

app.get("/doctor", function(req, res) {
  //do the API call here

  /*
answerArray.forEach(function(text){
  var scores=[];
  description =[];


    sequence = sequence.then(function(){
        return indico.sentiment(text)
    }).then(function(sentiment){
          scores.push(sentiment)
          description.push('sentiment')
          // console.log(sentiment + ' indico sentiment for ' + text)
    }).then(function(){
      return indico.emotion(text)
    }).then(function(emotion){
      for(var key in emotion) {
        var value = emotion[key];
        scores.push(value);
        description.push(key)
        // console.log(key + " " + value + ' indico emotion for ' +text)
      }
    }).then(function(){
      return indico.personality(text)
    }).then(function(perso){
      for(var key in perso) {
        var value = perso[key];
        scores.push(value)
        description.push(key)
        // console.log(key + " " + value + ' indico personality for ' +text)

      }
      totalScore.push(scores);
      console.log("total score array: " + totalScore);

      }).catch(function(err){
        console.log(err + ' failed to load!')
    })
})
*/

  //var test = await promiseA();
  var test2 = [];
  var total = 0;
  avg = 0;
  var response = function(res) {
    //console.log(res);
    //fill up array
    for (var i = 0; i < res.length; i++) {
      test2[i] = res[i];
    }
  };

  var promiseA = indico
    .batchSentiment([
      answerArray[0],
      answerArray[1],
      answerArray[2],
      answerArray[3],
      answerArray[4],
      answerArray[5],
      answerArray[6],
      answerArray[7]
    ])
    .then(response)
    //console.log(res[1]) // [ 0.07808824238341827, s0.813400530597089 ]
    //test=res[1];
    .catch(function(err) {
      console.log("err: ", err);
    });

  var promise2 = promiseA.then(function(res) {
    //process array from promiseA
    console.log(test2[2]);

    for (var j = 0; j < test2.length; j++) {
      total += test2[j];
    }

    console.log("total: " + total);
    avg = total / test2.length;
    console.log("avg: " + avg);
  });
  res.render("doctor", { answerArray: answerArray });
});

app.get("/thank", function(req, res) {
  var query = req.query.search;
  answerArray[0] = req.query.q1;
  answerArray[1] = req.query.q2;
  answerArray[2] = req.query.q3;
  answerArray[3] = req.query.q4;
  answerArray[4] = req.query.q5;
  answerArray[5] = req.query.q6;
  answerArray[6] = req.query.q7;
  answerArray[7] = req.query.q8;
  res.render("thank");
});

app.get("/final", function(req, res) {
  avgHunna = avg * 100;
  if (avgHunna < 35) {
    avgString =
      ", which is very low. Their answers reflect very negative thoughts as well as high amounts of fear and sadness.";
  } else if (avgHunna > 35 && avgHunna < 65) {
    avgString =
      ", which is moderately low. Their answers reflect some negative thoughts, with some sadness and surprise. However, there is some joy in the answers.";
  } else if (avgHunna > 65 && avgHunna < 85) {
    avgString =
      ", which is within healthy ranges. Their answers reflect positive thoughts, with joy and surprise. While there is some sadness, it's not enough to be alarmed at.";
  } else {
    avgString =
      ", which is very high. Their answers reflect very positive thoughts, joy, and some surprise.";
  }

  res.render("final", { avgHunna: avgHunna, avgString: avgString });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
