const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote-btn");
const translateBtn = document.getElementById("translate-btn");
const aloudBtn = document.getElementById("aloud-btn");
const loader = document.getElementById("loader");

let quoteList = [];
let quote = '';

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function newQuote() {
    const LONG_QUOTE_LENGTH = 120;
    quote = quoteList[Math.floor(Math.random()*quoteList.length)];

    /* Generate quote.textVi */
    quote.currentLanguage = 'en';
    const urlTranslate = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ "en" + "&tl=" + "vi" + "&dt=t&q=" + encodeURI(quote.text);
    const resTranslate = await fetch(urlTranslate);
    const targetText = await resTranslate.json();
    quote.textVi = '';
    targetText[0].forEach((value, index) => {
        quote.textVi += value[0]; //sentence
    })

    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > LONG_QUOTE_LENGTH) {
        quoteText.classList.add('long-text');
    } else {
        quoteText.classList.remove('long-text');
    }
    quoteText.textContent = quote.text;
    aloudQuote();
}

async function getQuotes() {
    const QUOTE_URL = "https://type.fit/api/quotes";
    try {
        showLoadingSpinner();
        const response = await fetch(QUOTE_URL);
        quoteList = await response.json();
        newQuote();
        removeLoadingSpinner();
    } catch (error) {

    }
}

function tweetQuote() {
    const tweet = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweet, '_blank');
}

async function translateQuote() {
    if (quote.currentLanguage === 'en') {
        quoteText.textContent = quote.textVi;
        quote.currentLanguage = 'vi';
    } else {
        quoteText.textContent = quote.text;
        quote.currentLanguage = 'en';
    }
    aloudQuote();
}

function aloudQuote() {
    speechSynthesis.cancel();
    const speechSynthesisObj = new SpeechSynthesisUtterance(quoteText.textContent + '...' + authorText.textContent);
    const voices = window.speechSynthesis.getVoices();
    if (quote.currentLanguage === 'en') {
        speechSynthesisObj.voice = voices.find((voice, index) => {
            return voice.lang === 'en-US';
        });
        speechSynthesisObj.rate = 0.75;
        speechSynthesisObj.pitch = 0.75;
    } else {
        speechSynthesisObj.voice = voices.find((voice, index) => {
            return voice.lang === 'vi-VN';
        });
        speechSynthesisObj.rate = 1;
        speechSynthesisObj.pitch = 1;
    }
    speechSynthesis.speak(speechSynthesisObj);
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
translateBtn.addEventListener('click', translateQuote);
aloudBtn.addEventListener('click', aloudQuote);


// On Load
getQuotes();