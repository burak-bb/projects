async function getDeck() {
    let deckAPI = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    deckId = deckAPI.data.deck_id
    $('.deck').attr('id', `${deckId}`)
    return deckId
    }

async function getCard() {
    const deckId = $('.deck').attr('id')
    let cardApi = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    let newCard = cardApi.data.cards[0].image
    $('.deck').append($('<img>').attr('src', `${newCard}`));
    if (cardApi.data.remaining == 0) {
        $('.get-card').remove()
    }
}

$('.get-card').click(function() {
    getCard();
})

window.onload = getDeck;