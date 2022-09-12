document.addEventListener("DOMContentLoaded", function () {
    const results = document.querySelector('.book-list');
    const list = document.querySelector('#list-output');
    const search = document.querySelector('#search-btn');
    const input = document.querySelector('#search-input');
    const bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

    let item, title, author, publisher, bookLink, bookImg;
    let searchData;

    search.addEventListener('click', () => {
        searchBooks();
    });

    addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    const searchBooks = () => {
        list.innerHTML = '';
        //cleans list

        searchData = input.value;

        if (!searchData.trim() == '') {
            fetch(bookUrl + searchData)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.totalItems === 0) {
                        alert('No books found!');
                    } else {
                        results.style.visibility = 'visible';
                        displayResults(resp);
                    }
                })
                .catch((err) => {
                    alert('Something went wrong');
                    console.log(err);
                });
        }
    }

    const displayResults = (resp) => {
        for (let i = 0; i < resp.items.length; i++) {
            item = resp.items[i];
            title = item.volumeInfo.title;
            author = item.volumeInfo.authors ? item.volumeInfo.authors[0] : '';
            publisher = item.volumeInfo.publisher;
            bookLink = item.volumeInfo.previewLink;
            bookImg = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : './img/no-image.png';

            let card = document.createElement('div');
            card.classList.add('card', 'm-2', 'border', 'border-0', 'bg-dark', 'p-2');
            card.style.width = '18rem';
            card.style.height = '100%';
            let img = document.createElement('img');
            img.classList.add('card-img-top', 'img-fluid');
            img.src = bookImg;
            img.style.height = '350px';
            card.appendChild(img);
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.innerHTML = `
            <h4 class="card-title fs-5">${title}</h4>
            <h5 class="card-subtitle mb-2 text-muted fs-5">${author == '' ? publisher : author}</h5>
            <p class="card-text text-secondary fs-6">${publisher}</p>
            <a href="${bookLink}" class="card-link fs-6 text-decoration-none">Book link</a>
            `
            card.appendChild(cardBody);
            list.appendChild(card);
        }
    }

    input.value = '';
});