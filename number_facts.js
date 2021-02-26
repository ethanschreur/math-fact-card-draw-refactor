let submit = document.querySelector('#enter');
$(submit).click(async (evt) => {
	let num = $(evt.target).prev().val();
	try {
		let resp = await axios.get(`http://numbersapi.com/${num}?json`);
		displayMessage(resp.data.text);
	} catch (err) {
		displayMessage(err);
	}
});

function displayMessage(msg) {
	$('#message').empty();
	$('#message').append(msg);
}

let numbersList = [];
let second_submit = document.querySelector('#second-enter');
$(second_submit).click((evt) => {
	num = $(evt.target).prev().val();
	numbersList.push(num);
	$('#numbers-list').empty();
	for (let i of numbersList) {
		$('#numbers-list').append(i);
		$('#numbers-list').append(', ');
	}
});
let facts = [];
$('#enter-list').click(async () => {
	promises = [];
	try {
		for (let num of numbersList) {
			let p = await axios.get(`http://numbersapi.com/${num}?json`);
			promises.push(p.data.text);
		}
		for (let text of promises) {
			displaylistfacts(text);
		}
	} catch (err) {
		console.log(err);
	}
});

function displaylistfacts(msg) {
	$('#list-facts').append(msg);
	$('#list-facts').append('<br>');
}

$('#clear-list').click(() => {
	promises = [];
	numbersList = [];
	$('#list-facts').empty();
	$('#numbers-list').empty();
});

$('#third-enter').click(async (evt) => {
	let num = $(evt.target).prev().val();
	let promiseList = [];
	try {
		for (let i = 0; i < 4; i++) {
			let resp = await axios.get(`http://numbersapi.com/${num}?json`);
			promiseList.push(resp.data.text);
		}
		for (let text of promiseList) {
			displayfourofone(text);
		}
	} catch (err) {
		console.log(err);
	}
});

function displayfourofone(msg) {
	$('#four-facts').append(msg);
	$('#four-facts').append('<br>');
}

$('#third-clear').click(() => {
	$('#four-facts').empty();
});
async function getCard() {
	let rp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${rp.data.deck_id}/draw/?count=1`);
	console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
}

getCard();

let two_cards = [];
let deck_id;

async function getTwoCards() {
	let resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	deck_id = resp.data.deck_id;
	let first = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	two_cards.push(`${first.data.cards[0].value} of ${first.data.cards[0].suit}`);
	let second = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	two_cards.push(`${second.data.cards[0].value} of ${second.data.cards[0].suit}`);
	console.log(two_cards);
}
getTwoCards();

let the_deck_id;

document.addEventListener('DOMContentLoaded', async function() {
	let resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	the_deck_id = resp.data.deck_id;
	console.log('asdfas', the_deck_id);
});
$('#draw').click(async () => {
	let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${the_deck_id}/draw/?count=1`);
	$('#cards').empty();
	$('#cards').append(`<img src='${resp.data.cards[0].image}'>`);
});
