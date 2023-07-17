
// PART 1 

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

let favoriteNum = 19
baseURL = 'http://numbersapi.com'

let fact = {
async data() {
    let response = await axios.get(`${baseURL}/${favoriteNum}/trivia?notfound=floor&fragment?json`)
console.log('response:', response)
}}

fact.data();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.


let multipleNums = [1, 2, 3, 4]

let dataFacts = {

async multNumsData() {
let multData = await axios.get(`${baseURL}/${multipleNums}/trivia?notfound=floor&fragment?json`)
console.log(multData)
}}

dataFacts.multNumsData()

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.



let theseDataFacts = {
async manyFacts() {
let promises = []

for(let i=0; i < multipleNums.length; i++) {
 promises.push(axios.get(`${baseURL}/${multipleNums[i]}/trivia?notfound=floor&fragment=json`));
}

let facts = await Promise.all(promises)
let factsDiv = document.getElementById('facts')

facts.forEach(function(f) {
factsDiv.innerHTML += (`<p>${(f.data)}</p>`)
})

return;
}

}

theseDataFacts.manyFacts()


// PART 2 

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let deckBaseURL = 'https://deckofcardsapi.com/api/deck'


let getCardData = {
async getCard()  {
    let card = await axios.get(`${deckBaseURL}/new/draw/?count=1`)
    console.log(card.data.cards[0].value.toLowerCase(), 'of', card.data.cards[0].suit.toLowerCase())
}}

getCardData.getCard()

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.
let getCardsData = {
async getCards() {
    let firstCard = await axios.get(`${deckBaseURL}/new/draw/?count=1`)
    let deckId = await firstCard.data.deck_id
    let secondCard = await axios.get(`${deckBaseURL}/${deckId}/draw/?count=1`)

    console.log('first card:', firstCard.data.cards[0].value.toLowerCase(), 'of', firstCard.data.cards[0].suit.toLowerCase(), 'second card:', secondCard.data.cards[0].value.toLowerCase(), 'of', secondCard.data.cards[0].suit.toLowerCase())
    }
}

getCardsData.getCards()
// .then(firstCardData => {
//     let deck_id = firstCardData.deck_id
//     let secondCard = $.getJSON(`${deckBaseURL}/${deck_id}/draw/?count=1`);

//     return secondCard

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let $cards = $('#cards')
let $btn = $('button')
let thisDeckId = null;

let cardDeckData = {
    async createCardDeck() {
        let deck = await axios.get(`${deckBaseURL}/new/shuffle/`)
        console.log('deck:', deck)
        let deckId = await deck.data.deck_id
        $btn.show().on('click', async function() {
            let newCard = await axios.get(`${deckBaseURL}/${deckId}/draw/`)
            console.log('newCard:', newCard)
            let cardSrc = newCard.data.cards[0].image;
            console.log('cardSrc:', cardSrc)

            $cards.append(
                $('<img>', {
                    src: cardSrc,
                  })
            )

            if(newCard.data.remaining == 0) {
                $btn.remove()
                $cards.append('You have gone through the entire deck!!')
            }
        })
        }
    };

cardDeckData.createCardDeck()
