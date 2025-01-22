function render() {
    browser.storage.local.get('blockedUrls').then((data) => {
        const urls = data.blockedUrls || [];
        const urlList = document.getElementById('list');
        while(urlList.firstChild){
            urlList.removeChild(urlList.firstChild);
        }
        urls.forEach((url, index) => {
            const li = document.createElement('li');
            li.textContent = url;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.style.marginLeft = '1rem';
            removeButton.onclick = () => remove(index);
            li.appendChild(removeButton);
            urlList.appendChild(li);
        });
    });
}

function add(input) {
    if (!input) return;
    const url = input.value.trim()
    input.value = '';
    if (!url) return;
    browser.storage.local.get('blockedUrls').then((data) => {
        const urls = data.blockedUrls || [];
        urls.push(url);
        browser.storage.local.set({ blockedUrls: urls }).then(render);
    });
}

function remove(index) {
    browser.storage.local.get('blockedUrls').then((data) => {
        const urls = data.blockedUrls || [];
        urls.splice(index, 1);
        browser.storage.local.set({ blockedUrls: urls }).then(render);
    });
}

document.getElementById('form').onsubmit = (e) => {
    e.preventDefault();
    add(document.getElementById('input'));
};

render();