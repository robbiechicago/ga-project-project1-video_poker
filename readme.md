RoHoPoker
=========

RoHoPoker is an online Video Poker game.

Video Poker is different from most poker games in that it is a one player experience.  Your winnings are based directly on the contents of your hand, not on your ability to out-think, out-wit or out-bet your opponents.  Also, a pair lower than jacks does not count as a winning hand.

RoHoPoker is an extremely simple game:

* the player starts with a bank of 100 coins
* in each round, the player decides how many coins to stake, before cards are dealt.
* the player is then dealt five cards
* the player then has the opportunity to hold or swap any or all of the cards
* after the swap / hold, the value of this final hand determines if the player is a winner, and how much they have won

Winning hands are as follows in descending order:

* Royal Flush: 10, J, Q, K, A in a single suit.
* Straight Flush: Any five consecutive cards in a single suit, where the high card is not an ace.
* Four-of-a-Kind: Four cards of the same value.
* Full House: A Three-of-a-Kind and a Pair.
* Flush: Five non-consecutive cards of the same suit.
* Straight: Five consecutive cards of mixed suits.
* Three-of-a-Kind: Three cards of the same value.
* Two Pair: Two pairs.
* Pair (Jacks or higher): A pair of cards at least of Jack value.

The payouts (including stake) are as follows, and are multiplied by the number of coins staked (with the exception of the Royal Flush Jackpot - see below).

* Royal Flush: 250 (5 coins pays 4,000 not the 1,250 expected from 250 x 5)
* Straight Flush: 50
* Four-of-a-Kind: 25
* Full House: 9
* Flush: 6 
* Straight: 4
* Three-of-a-Kind: 3
* Two Pair: 2
* Pair (Jacks or higher): 1

Coding
------
I decided to use JS/jQ DOM minipulation for the game mechanics.  When each round begins, ten random cards are selected from the deck, five or which are shown (upper-row), five are hidden below (lower-row).  So each upper-row's card already has a replacement pre-selected as the round starts.  When the player clicks a card to select it, an event listener adds a class.  When the Deal button is clicked, cards without this class are hidden.  Using the $(this).next function, a hidden card's sibling also has its class changed which displays it on screen.

Other messages are shown and hidden at various points.  For example, a message appears indicating to the player than clicking a card will hold it.

I think this approach has worked well, with some limitations:

* I too often used the css command display: none instead of visibility: hidden, and this initially caused some undesired movement on the page.  
* As as I began to make changes to fix bugs or add in functionality, it became difficult to keep up with the class status of HTML elements
* There is no JS/jQ function to reset an element's DOM status.  This caused problems during development.

The underlying script began fairly well structured but as time was running out it became more messy and not as dry.  With time and better planning I believe I would have done better with this.

Design
------
I decided to use a minimal, clean design which is probably very rare in Video Poker - casino games tend to be bright, colourful and garish. I hand-made the card icons using Photoshop.  My initial intention was to have animation on the dealing of the cards but unfortunately this did not happen due to time constraints.  

Bugs and limitations
--------------------
The following features were not included:

* Multiplayer.  I was intending to include an "enter your name" function when the quit button was clicked to save the final bank.
* I coded in the HTML a payout table but did not have time to make this look nice, so it's hidden.
* As mentioned above, there is no animation or transition when cards are dealt / swapped.

There are a few bugs:

* For some reason, with each new round of the game, the behind-the-scenes creation of the deck and selecting of cards is repeated exponentially.  Watching in the console, the first round works perfectly, the second has two deck creations, the third has four, the fourth has eight and so on.  This would not be a problem, but also the stake has the same multiplier effect.  This makes the bank calculation wrong.
* Due to using display: none instead of visibility: hidden, there is some movement of elements when other elements are added and removed from the browser.

