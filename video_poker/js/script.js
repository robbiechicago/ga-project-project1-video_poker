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
    console.log("card " + (i+1) + " (index " + i + "): " + randCardName);
    deck.splice(randIndex,1);
    randTen.push(randCard);
  }
  firstFiveCards();
}

function firstFiveCards() {
  $('.card-space').each(function(i) {
    $(this).html(randTen[i].name);
  });
};


$('.card-space').click(held);

function held() {
  if ($(this).hasClass('held')) {
    $(this).removeClass('held').addClass('chuck');
  } else {
    $(this).removeClass('chuck').addClass('held');
  };
};

$('.deal').click(dealer);

function dealer() {
  $('.card-space').each(function() {
    if ($(this).hasClass('chuck')) {
      $(this).removeClass('upper-card').addClass('lower-card');
      $(this).next().removeClass('lower-card').addClass('upper-card');
    };
  });
  getFinalCards();
}

var finalCards = [];
var finalVals = [];
var finalSuits = [];

function getFinalCards() {
  $('.upper-card').each(function() {
    console.log($(this).data('card-index'));
    var selectedIndex = $(this).data('card-index');
    var selectedCard = randTen[selectedIndex];
    var val = selectedCard.value;
    var su = selectedCard.suit;
    finalCards.push(selectedCard);
    finalVals.push(val);
    finalSuits.push(su);
  })
  console.log(finalCards);
  console.log(finalVals);
  console.log(finalSuits);
  winChecker()
}

function winChecker() {
  valCounter();
}

function valCounter() {
  var counter = {};
  $(finalVals).each(function() {
    var num = $(this)[0];
    counter[num] = counter[num] + 1 || 1;
  });
  console.log(counter);
}















})