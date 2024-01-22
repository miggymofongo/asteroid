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
    
            function updateQuote() {
                quoteBanner.textContent = quotes[currentQuoteIndex++];
                if (currentQuoteIndex >= quotes.length) currentQuoteIndex = 0;
            }
    
            updateQuote();
            setInterval(updateQuote, 5000);
        });
});
    




