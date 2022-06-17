const searchButton = document.getElementById('seach-button');
const searchText = document.getElementById('seach-text');
const url = new URL('messages/search', document.location.origin);
let latestEtag = -1;

function renderMessage(messages, sectionId) {
  if (!messages) return;
  const messagesSection = document.getElementById(sectionId);
  messagesSection.innerText = '';
  messages.forEach((message) => {
    // {id ,from, text}
    const container = document.createElement('div');
    container.innerText = `${message.timestamp} - ${message.id} - ${message.from} - ${message.text}`;
    messagesSection.appendChild(container);
  });
}
setInterval(() => {
  fetch('/messages/latest')
    .then((response) => {
      for (const pair of response.headers.entries()) {
        const key = pair[0];
        const value = pair[1];
        if (key == 'etag') {
          if (value != latestEtag) {
            latestEtag = value;
            return response.json();
          } else {
            return undefined;
          }
        }
      }

      // return response.json();
    })
    .then((messages) => renderMessage(messages, 'messages-section'));
}, 1000);
//adding functionality to the search button
// caputure the content of the text input
// fetch to the search endpoint     search-result-section

searchButton.addEventListener('click', (event) => {
  const text = searchText.value;
  url.searchParams.set('text', text);
  fetch(url)
    .then((response) => response.json())
    .then((messages) => renderMessage(messages, 'search-result-section'));
});
