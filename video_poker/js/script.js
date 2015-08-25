$(document).ready(function(){
  console.log("Ready to go, RoHo");

//-------------------------------------------------------------------------------------
//DECK CREATION, CARD DEALING AND GAME MECHANICS
//-------------------------------------------------------------------------------------

//constructor function to make the individual cards
function card(value, number, suit, name){
  this.value = value;
  this.number = number;
  this.suit = suit;
  this.name = name;
}

//create a deck array using the card constructor
function deckArray() {
  this.numbers = ['2','3','4','5','6'/*,'7','8','9','10','J','Q','K','A'*/];
  this.suits = ['D','H'/*,'S','C'*/];
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
    var val = parseInt(selectedCard.value);
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

//-------------------------------------------------------------------------------------
//FINDING WINNERS
//-------------------------------------------------------------------------------------

//fire off all the win checking functions
function winChecker() {
  valCounter();
  suCounter();
  straightFinder();
  winnerPicker();
}

// counts the distinct card values. Creates an object which returns each value and the corresponding count.  This is used in the next function which looks for 2s, 3s and 4s.
var counter = {};
function valCounter() {
  $(finalVals).each(function() {
    var num = $(this)[0];
    counter[num] = counter[num] + 1 || 1;
  });
  console.log(counter);
  kindAndHouseFinder(counter);
}

//using the above object to find 2s, 3s and 4s
var valCounts = [];
function kindAndHouseFinder(counter) {
  //create an array of values from the counter object
  valCounts = $.map(counter, function(v, i) {
    return v;
  });
  if (valCounts.length === 5) {
    kindResult = "five";
  } else if (valCounts.length === 4) {
    kindResult = "pair";
  } else if (valCounts.length === 3) {
    if ($.inArray(3,valCounts) !== -1) {
      kindResult = "three"
    } else {
      kindResult = "two-pair"
    };
  } else {
    if ($.inArray(3,valCounts) !== -1) {
      kindResult = "full-house"
    } else {
      kindResult = "four"
    };
  }
  console.log(kindResult);
  console.log(valCounts);
};

//does the same as val counter but for suits.  Counts how many of each suit there are.  Of course, we only care about one single suit - the next function looks at that
var suitCounter = {};
function suCounter() {
  $(finalSuits).each(function() {
    var num = $(this)[0];
    suitCounter[num] = suitCounter[num] + 1 || 1;
  });
  console.log(suitCounter);
  flushFinder(suitCounter);
};

//takes the suits count object, creates an array and hopes to find a length of 1 which indicates that all five cards have the same suit.  kerching!
var suitCounts = [];
function flushFinder(suitCounter) {
  //create an array of values from the counter object
  suitCounts = $.map(suitCounter, function(v, i) {
    return v;
  });
  if (suitCounts.length === 1) {
    flushResult = "flush";
  } else {
    flushResult = "noflush";
  }
  console.log("flush? " + flushResult);
}

//looks for all instances of (i+1)-i = 1, ie the difference between all integers is 1 and therefore we got ourselves a straight
function straightFinder() {
  if(finalVals.length === 5) {
    var straights = []; 
    straights = finalVals.sort(function(a, b){return a-b});
    for (var i = 0; i < 4; i++) {
      if (straights[i + 1] - straights[i] !== 1) {
        straightResult = "nostraight"
        console.log("straight? " + straightResult);
        return straightResult;
      };     
    };
  };
  straightResult = "straight"
  console.log("straight? " + straightResult); 
  return straightResult; 
}

var finalResult;
function winnerPicker() {
  
}





















})