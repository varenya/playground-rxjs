import $ from 'jquery';

const $title = $('#title');
const $results = $('#results');

let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;

$title.on("keyup", e => {
    const title = e.target.value;
    if (lastQuery === title) {
        return;
    }
    lastQuery = title;
    if (lastTimeout)
        window.clearTimeout(lastTimeout);
    let ourQueryid = ++nextQueryId;
    window.setTimeout(() => {
        getItems(title).then(items => {
            if (ourQueryid != nextQueryId)
                return;
            $results.empty();
            const $items = items.map(item => $('<li />').text(item));
            $results.append($items);
        })
    }, 500);
});

const getItems = (title) => {
    console.log(`Querying for ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, 'text', `Another ${Math.random()}`])
        }, 500 + (Math.random() * 1000))
    })
}
