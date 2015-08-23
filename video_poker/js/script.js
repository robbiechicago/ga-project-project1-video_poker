$(document).ready(function(){
  console.log("Ready to go, RoHo");

//constructor function to make the individual cards
function card(value, number, suit, name){
  this.value = value;
  this.number = number;
  this.suit = suit;
  this.name = name;
}

//create a deck array using the card constructor
function deckArray() {
  this.numbers = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  this.suits = ['D','H','S','C'];
  var cards = [];
    
  for(var i = 0, iLen = this.suits.length; i < iLen; i++) {
    for(var j = 0, jLen = this.numbers.length; j < jLen; j++) {
      cards.push(new card(j+2, this.numbers[j], this.suits[i], this.numbers[j] + this.suits[i]));
    }
  }
  return cards;
}

//assign a deck to a variable deck
var deck = deckArray();
var randTen = [];
var aRandTen = tenRandomCards();


console.log(deck[25]);

//create five random cards
//THIS IS NOT RIGHT!  NEED TO USE ARRAYS AND ARRAY LENGTH TO ASSURE NO DUPLICATION, YO
// var card1 = Math.floor(Math.random()*52)
// var card2 = Math.floor(Math.random()*52)
// var card3 = Math.floor(Math.random()*52)
// var card4 = Math.floor(Math.random()*52)
// var card5 = Math.floor(Math.random()*52)

function tenRandomCards() {
  for (var i = 0; i < 10; i++) {
    var randIndex = Math.floor(Math.random()*deck.length);
    var randCard = deck[randIndex];
    console.log(randCard);
    deck.splice(randIndex,1);
    randTen.push(randCard);
  }
}

console.log(deck);
console.log(randTen);















})