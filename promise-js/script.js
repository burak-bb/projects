function getDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
        let deckId = data.deck_id
        $('.deck').attr('id', `${deckId}`)
        return deckId
    })
}

function getCard() {
    const deckId = $('.deck').attr('id')
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
        let newCard =  data.cards[0].image
        $('.deck').append($('<img>').attr('src', `${newCard}`));
        if (data.remaining == 0) {
            $('.get-card').remove()
        }

    })
}

$('.get-card').click(function() {
    getCard();
})

window.onload = getDeck;