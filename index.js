var readlineSync = require('readline-sync');
score = 0;
var username = readlineSync.question('May I have your Name?\n');
console.log("\n")
console.log('Hy ' + username +' I am Bot Thanks for playing game  ');
console.log("\n")
console.log("keep your kwybord CapsLock on good luck......->");
console.log("\n")
function play(question,answer)
{
  var userAnswer = readlineSync.question(question);

  if(userAnswer === answer){
    console.log('right');
    score+10;
  }
  else
  {
    console.log('wrong');
    score-5;
  }
  console.log("............");
}
var List =[questionone, questiontwo, questionthree, questionfour, questionfive, questionsix, questionseven];
var questionone = {
 question: "Q1 if I have 2 apple and "+username +" given two more so how many apple i have in present ?",
  answer: "4",
}
var questiontwo = {
  question : "Q2 Where is Bandhavgarh & Panna National Park located ?",
  answer : "MP",
}
var questionthree = {
  question : "Q3 What are the official languages of india ?",
  answer : "HINDI",
}
var questionfour = {
    question : "Q4 mostly boys favourite colour is ?",
  answer : "BLUE",
}
var questionfive = {
    question : "Q5 How many days are there in a week ?",
  answer : "7",
}
var questionsix = {
    question : "Q6 Name the National Animal of India ?",
  answer : "TIGER",
}
var questionseven = {
    question : "Q7 Name the National fruit of India ?",
  answer : "MANGO",
}
var List =[questionone, questiontwo, questionthree, questionfour, questionfive, questionsix, questionseven];
for(var i = 0;i< List.length; i++){
  var currenthero = List[i];
 play(currenthero.question,currenthero.answer);
}
if(score < 0){
  console.log("batter luck next time")
}
else{
  console.log("you got score is "+ score + " congress");
}
