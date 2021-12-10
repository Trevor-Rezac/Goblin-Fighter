export function renderGoblin(goblin) {
    const goblinDiv = document.createElement('div');
    const goblinNameEl = document.createElement('p');
    const goblinHPEl = document.createElement('p');
    const goblinImgEl = document.createElement('img');

    goblinDiv.classList.add('goblin-container');
    goblinNameEl.classList.add('goblin-name');
    goblinHPEl.classList.add('goblin-HP');
    goblinImgEl.classList.add('goblin-img');

    goblinNameEl.textContent = goblin.name;
    goblinHPEl.textContent = goblin.hp < 0 ? 0 : goblin.hp;
    goblinImgEl.src = `${goblin.img_url}`;

    goblinDiv.append(goblinNameEl, goblinHPEl, goblinImgEl);

    return goblinDiv;
}

function getRandomNumber() {
    const index = Math.floor(Math.random() * 2);
    return index;
}

