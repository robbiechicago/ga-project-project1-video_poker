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

// Get ten random card.  Ensure no duplication.
function tenRandomCards() {
  for (var i = 0; i < 10; i++) {
    var randIndex = Math.floor(Math.random()*deck.length);
    var randCard = deck[randIndex];
    var randCardName = deck[randIndex].name;
    // console.log(randCard);
    console.log("card " + (i+1) + ": " + randCardName);
    deck.splice(randIndex,1);
    randTen.push(randCard);
  }
  firstFiveCards();
}

function firstFiveCards() {
  $('.card-space').each(function(i) {
    $(this).html(randTen[i].name);
    console.log(i);
  });
};

console.log(deck);
console.log(randTen);

$('.card-space').click(held);

function held() {
  if ($(this).hasClass('held')) {
    $(this).removeClass('held');
  } else {
    $(this).addClass('held');
  };
};





















})