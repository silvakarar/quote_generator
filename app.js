const newQuoteBtn = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true
}
// Show new quote
function newQuote(){
    loading();
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

 if (!quote.author) {
    authorText.textContent = 'Unknown'
 } else {
    authorText.textContent = quote.author;
 }
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
} else {
    quoteText.classList.remove('long-quote') 
}
// Set quote, hide loader
quoteText.textContent = quote.text;
complete();
}
// Get Quotes from an API
async function getQuotes(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiURL);
        apiQuotes = await res.json();
        newQuote()
    } catch (error) {
       console.log('no data received'); 
    }
}



// Tweet a quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

//Button event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);


// On load
getQuotes()
