var indico = require('indico.io');
indico.apiKey =  '83536cb878ea510712d0f5e24c02510d';

var answerArray = ["I love writing code!", "Alexander and the Terrible, Horrible, No Good, Very Bad Day", "I hate javascript promises"];
// indico.sentiment(test)
var totalSentiment, avgSentiment;

var totalScore =[], description = [];
var sequence = Promise.resolve()



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
      //console.log("total scores: " + totalScore[2]);
      for(var j = 0; j < answerArray.length; j++){
            totalSentiment+=answerArray[j][0];
        }

        //console.log("total: " + total);
        avgSentiment = totalScore/answerArray.length;
        console.log("totalSentiment:" + totalSentiment);
        console.log("avgSentiment: " + avgSentiment);
      }).catch(function(err){
        console.log(err + ' failed to load!')
    })
})