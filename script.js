const API = "1a72fd0886464a57bd349c668ea8f2b7";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("ALL"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API}`);
    const data = await res.json();
    combineData(data.articles);
}
function combineData(articles) {
    const container = document.querySelector('#container')
    const template = document.querySelector('.template')

    container.innerHTML = '';

    articles.forEach(element => {
        if (!element.urlToImage) return;
        const cards = template.content.cloneNode(true);
        fillData(cards, element);
        container.appendChild(cards);
    });
    function fillData(cards, element) {
        let newsImg = cards.querySelector('#newsImg');
        let newsTitle = cards.querySelector('h3');
        let newsshort = cards.querySelector('.short');
        let newssummary = cards.querySelector('.summary');

        const date = new Date(element.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });

        newsImg.src = element.urlToImage;
        newsTitle.innerHTML = element.title;
        newssummary.innerHTML = element.description;
        newsshort.innerHTML = `${element.source.name}: ${date} `

        cards.firstElementChild.addEventListener('click', function () {
            window.open(element.url, '_blank');
        });
    }
}
function searchtrend(id) {
    fetchNews(id)
    let lble = document.querySelector('.lble');
    lble.innerText = `${id} News:-`
}
let searchbtn = document.querySelector('button');
let searchtxt = document.querySelector('input');

searchbtn.addEventListener('click', function () {
    const query = searchtxt.value;
    if (!query) return;
    fetchNews(query);
})
searchtxt.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        const query = searchtxt.value;
        if (!query) return;
        fetchNews(query);
    }
})
function reload() {
    window.location.reload();
}