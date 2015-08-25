$(document).ready(function(){
  console.log("Ready to go, RoHo");

//-------------------------------------------------------------------------------------
//START GAME
//-------------------------------------------------------------------------------------

$('#start-button').click(starter);

var origDiv;
function starter() {
  origDiv = $('#card-hole').clone;
  $(this).css('display', 'none');
  $('.card-holder').css('display', 'inline-block');
  bank = 100;
  stakeSelect();
}

function stakeSelect() {
  $('#bank').text(bank);
  $('#stake-text').css('display', 'block');
  $('.stake-box').click(function(){
    stake = $(this).data('stake');
    console.log(stake);
    $('#stake-text').css('display', 'none');
    $('.stake-box').css('display', 'none');
    $('.deal').css('display', 'inline');
    upperLine();
  });
};

function upperLine() {
  $('.card-hidden').removeClass('card-hidden').addClass('upper-card chuck');
  $('#message-text').css('visibility', 'visible');
  $('#results').css('display', 'block');
  bank = bank - stake;
  $('#results').html("<p>Stake = " + stake + " coins.  Bank = " + bank +" coins.</p>");
  deckMaker();
};

//-------------------------------------------------------------------------------------
//DECK CREATION, CARD DEALING AND GAME MECHANICS
//-------------------------------------------------------------------------------------

//constructor function to make the individual cards
function card(value, number, suit, name, image){
  this.value = value;
  this.number = number;
  this.suit = suit;
  this.name = name;
  this.image = image;
}

//create a deck array using the card constructor
function deckArray() {
  this.numbers = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  this.suits = ['D','H','S','C'];
  this.images = [
                '<img src="images/2D.png">',
                '<img src="images/3D.png">',
                '<img src="images/4D.png">',
                '<img src="images/5D.png">',
                '<img src="images/6D.png">',
                '<img src="images/7D.png">',
                '<img src="images/8D.png">',
                '<img src="images/9D.png">',
                '<img src="images/10D.png">',
                '<img src="images/JD.png">',
                '<img src="images/QD.png">',
                '<img src="images/KD.png">',
                '<img src="images/AD.png">',
                '<img src="images/2H.png">',
                '<img src="images/3H.png">',
                '<img src="images/4H.png">',
                '<img src="images/5H.png">',
                '<img src="images/6H.png">',
                '<img src="images/7H.png">',
                '<img src="images/8H.png">',
                '<img src="images/9H.png">',
                '<img src="images/10H.png">',
                '<img src="images/JH.png">',
                '<img src="images/QH.png">',
                '<img src="images/KH.png">',
                '<img src="images/AH.png">',
                '<img src="images/2S.png">',
                '<img src="images/3S.png">',
                '<img src="images/4S.png">',
                '<img src="images/5S.png">',
                '<img src="images/6S.png">',
                '<img src="images/7S.png">',
                '<img src="images/8S.png">',
                '<img src="images/9S.png">',
                '<img src="images/10S.png">',
                '<img src="images/JS.png">',
                '<img src="images/QS.png">',
                '<img src="images/KS.png">',
                '<img src="images/AS.png">',
                '<img src="images/2C.png">',
                '<img src="images/3C.png">',
                '<img src="images/4C.png">',
                '<img src="images/5C.png">',
                '<img src="images/6C.png">',
                '<img src="images/7C.png">',
                '<img src="images/8C.png">',
                '<img src="images/9C.png">',
                '<img src="images/10C.png">',
                '<img src="images/JC.png">',
                '<img src="images/QC.png">',
                '<img src="images/KC.png">',
                '<img src="images/AC.png">'
                ]
  var cards = [];
  var imgcounter = 0;
  for(var i = 0, iLen = this.suits.length; i < iLen; i++) {
    for(var j = 0, jLen = this.numbers.length; j < jLen; j++) {
      cards.push(new card(j+2, this.numbers[j], this.suits[i], this.numbers[j] + this.suits[i], this.images[imgcounter]));
      imgcounter++;
    }
  }
  return cards;
}

//assign a deck to a variable deck
var deck;
var randTen = [];
var aRandTen;
function deckMaker() {
  deck = deckArray();
  randTen = [];
  aRandTen = tenRandomCards();
}

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
    // $(this).html(randTen[i].name);
    $(this).html(randTen[i].image);
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
  finalCards = [];
  finalVals = [];
  finalSuits = [];
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
  counter = {};
  $(finalVals).each(function() {
    var num = $(this)[0];
    counter[num] = counter[num] + 1 || 1;
  });
  console.log(counter);
  kindAndHouseFinder(counter);
}

//using the above object to find 2s, 3s and 4s
var valCounts = [];
var pairVal;
function kindAndHouseFinder(counter) {
  //create an array of values from the counter object
  valCounts = [];
  pairVal = '';
  valCounts = $.map(counter, function(v, i) {
    return v;
  });
  if (valCounts.length === 5) {
    kindResult = "singles";
  } else if (valCounts.length === 4) {
    kindResult = "pair";
    //get value of pair
    for (var key in counter) {
      if (counter[key] === 2) {
        pairVal = key;
        console.log(pairVal)
      };
    };
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
  suitCounter = {};
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
  suitCounts = [];
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
    console.log("straights: " + straights);
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


//-------------------------------------------------------------------------------------
//RETURNING WINNERS AND PRIZE AMOUNTS
//-------------------------------------------------------------------------------------


var finalResult;
var prize;
function winnerPicker() {
  //ROYAL FLUSH
  if (flushResult === 'flush' && straightResult === 'straight') {
    if (straights[4] === 14) {
      finalResult = 'Royal Flush!';
      stake === 5 ? prize = 800 : 250;
      console.log(finalResult + " - " + prize);
      updateBank(finalResult, prize);
    } else {
      finalResult = 'Straight Flush';
      prize = 50;
      console.log(finalResult + " - " + prize);
      updateBank(finalResult, prize);
    };
  } else if (kindResult === 'four') {
    finalResult = 'Four-of-a-Kind';
    prize = 25;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (kindResult === 'full-house') {
    finalResult = 'Full House!';
    prize = 9;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (flushResult === 'flush') {
    finalResult = 'Flush!';
    prize = 6;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (straightResult === 'straight') {
    finalResult = 'Straight!';
    prize = 4;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (kindResult === 'three') {
    finalResult = 'Three-of-a-Kind!';
    prize = 3;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (kindResult === 'two-pair') {
    finalResult = 'Two Pair!';
    prize = 2;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else if (kindResult === 'pair' && pairVal >= 11 ) {
    finalResult = 'Pair (Jacks or above)!';
    prize = 1;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  } else {
    finalResult = 'Sorry, no win.';
    prize = 0;
    console.log(finalResult + " - " + prize);
    updateBank(finalResult, prize);
  }
}

//-------------------------------------------------------------------------------------
//CREATE AND UPDATE BANK
//-------------------------------------------------------------------------------------

var stake;
var bank;
var payout;

function updateBank(finalResult, prize) {
  payout = stake * prize;
  bank = bank + payout;
  if (finalResult !== 'Sorry, no win.') {
    $('#results').html("<p>Winner!  " + finalResult + "  Bank = " + bank + "</p>");
  } else {
    $('#results').html("<p>" + finalResult + "  Bank = " + bank + "</p>");
  };
  $('.deal').css('display', 'none');
  AgainOrQuit();
};

function AgainOrQuit() {
  $('#message-text').css('visibility', 'hidden');
  $('#play-again').css('display', 'inline-block');
  $('#again').click(playAgain);
  $('#quit').click(quit);
};

function playAgain() {
  // $('#card-hole').html(origDiv);
  $('#results').css('display', 'none');
  $('#play-again').css('display', 'none');
  $('.stake-box').css('display', 'inline-block');
  $('.card-space').each(function(){
    if ($(this).data('card-index') % 2 === 0 || $(this).data('card-index') === 0) {
      $(this).removeClass().addClass("card-space card-hidden");
    } else {
      $(this).removeClass().addClass("card-space lower-card");
    };
  });
  stakeSelect();
};

var leaderboard = {}
function quit() {
  location.reload();
}






})