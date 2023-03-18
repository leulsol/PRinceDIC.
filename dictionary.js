// Replace YOUR_API_KEY with your actual API key
const apiKey = "72093e4e-2f3b-4dee-aa24-1c4f82aa3357";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

searchBtn.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (!word) {
    alert("Please enter a word to search");
    return;
  }

  // Send GET request to API endpoint
  fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${"72093e4e-2f3b-4dee-aa24-1c4f82aa3357"}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous results
      resultsContainer.innerHTML = "";

      // Check if word is found in the dictionary
      if (Array.isArray(data)) {
        // Display all definitions and example sentences
        data.forEach((entry) => {
          const def = entry.shortdef?.[0];
          const fl = entry.fl;
          const hwi = entry.hwi?.prs?.[0].mw;
          const example = entry.uros?.[0]?.ure;

          if (def) {
            const result = document.createElement("div");
            result.classList.add("result");
            result.innerHTML = `
              <h2>${word}</h2>
              <p><em>${fl} ${hwi}</em></p>
              <p>${def}</p>
              ${example ? `<p>Example: ${example}</p>` : ""}
            `;
            resultsContainer.appendChild(result);
          }
        });
      } else {
        // Word not found
        const result = document.createElement("div");
        result.classList.add("result");
        result.textContent = `No definitions found for ${word}`;
        resultsContainer.appendChild(result);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while fetching data from the server. Please try again later.");
    });
});
