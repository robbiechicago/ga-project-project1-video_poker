$(document).ready(function(){
  console.log("Ready to go, RoHo");

function card(value, number, suit){
  this.value = value;
  this.number = number;
  this.suit = suit;
}

function deck() {
  this.numbers = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  this.suits = ['D','H','S','C'];
  var cards = [];
    
  for(var i = 0, iLen = this.suits.length; i < iLen; i++) {
    for(var j = 0, jLen = this.numbers.length; j < jLen; j++) {
      cards.push(new card(j+2, this.numbers[j], this.suits[i] ) );
    }
  }
  return cards;
}

var newDeck = new deck();
console.log(newDeck);
console.log(newDeck[25]);














})