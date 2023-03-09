const apiKey = 'd60f3946-774e-4214-bb41-2a13f5f07683';
const searchButton = document.querySelector('#search-button');
const searchTerm = document.querySelector('#search-term');
const definition = document.querySelector('#definition');

searchButton.addEventListener('click', () => {
const word = searchTerm.value.trim().toLowerCase();
  if (word !== '') {
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${"d60f3946-774e-4214-bb41-2a13f5f07683"}`)
      .then(response =>response.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Multiple possible definitions, so display them all
definition.innerHTML = data.map(d => `<p>${d.shortdef.join('; ')}</p>`).join('');
        } else if (data.shortdef) {
          // Only one definition, so display it
definition.innerHTML = `<p>${data.shortdef.join('; ')}</p>`;
        } else {
          // No definition found
definition.innerHTML = `<p>No definition found for "${word}".</p>`;
        }
      })
      .catch(error => {
console.error(error);
definition.innerHTML = `<p>An error occurred while retrieving the definition for "${word}".</p>`;
      });
  }
});
