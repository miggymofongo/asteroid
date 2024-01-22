let facts = {
    dob: 'Nov 30',
    'favorite game': 'Kingdom Hearts',
    birthplace: 'Leominster, Massachusettes, USAmerikkka',
    age: "30"
};

function factAlert(key) {
    alert(facts[key]);
}



document.addEventListener('DOMContentLoaded', function() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            let currentQuoteIndex = 0;
            const quoteBanner = document.getElementById('quoteBanner');
            const quoteText = quoteBanner.querySelector('blockquote p');
    
            function updateQuote() {
                quoteText.textContent = quotes[currentQuoteIndex];
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            }
    
            updateQuote();
            setInterval(updateQuote, 5000);
        })
        .catch(error => console.error('Error loading JSON:', error));
});


    




