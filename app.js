// import functions and grab DOM elements
import { renderGoblin } from './renderGoblin.js';
import { goblinArr } from './goblins.js';

const form = document.querySelector('form');
const heroInputEl = document.getElementById('hero-name-input');
const heroNameBtn = document.getElementById('update-hero-name-btn');
const heroNameEl = document.getElementById('hero-name');
const heroHPEl = document.getElementById('hero-HP');
const heroDropdown = document.getElementById('hero-dropdown');
const heroImg = document.querySelector('#hero-img');
const goblinListEl = document.getElementById('goblin-list-container');
const defeatedGoblinsEl = document.querySelector('.defeated-goblins');




let heroHP = 10;
let defeatedGoblins = 0;


heroNameBtn.addEventListener('click', () => {
    const heroName = heroInputEl.value;
    heroNameEl.textContent = `${heroName}`;

    if (heroInputEl.value === '') {
        const defaultName = 'Hero';
        heroNameEl.textContent = defaultName;
    } 

    heroInputEl.value = '';
    heroHPEl.textContent = `${heroHP}`;
});
  
heroDropdown.addEventListener('change', () => {
    const id = heroDropdown.value;
    heroImg.src = `./assets/hero-${id}.png`;
    
});
  
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let goblinName = data.get('goblin-name-input');

    const newGoblin = {
        name: (goblinName === '') ? `Goblin #${Math.floor(Math.random() * 1000)}` : goblinName,
        hp: `${Math.ceil(Math.random() * 10)}`,
        img_url: `./assets/goblin-${getRandomNumber()}.png`
    };

    goblinArr.push(newGoblin);
    goblinListEl.textContent = '';
    displayGoblins();
    form.reset();
});

function displayGoblins() {
    goblinListEl.textContent = '';

    for (let goblin of goblinArr) {
        const goblinEl = renderGoblin(goblin);

        if (goblin.hp > 0) {
            goblinEl.addEventListener('click', () => {

              // 50% chance to hit a goblin, else alert miss
                if (Math.random() < .5) {
                    goblin.hp--;
                    alert(`You hit ${goblin.name}!`);
                } else {
                    alert(`${goblin.name} dodged your attack!`);
                }
                
              // 50% chance of goblin hits hero, else alert miss
                if (Math.random() < .5) {
                    heroHP--;
                    alert(`${goblin.name}'s counter attack hit you!`);
                } else {
                    alert(`${goblin.name}'s counter attack missed you!`);
                }
                
              // when goblin is defeated, increase defeatedGoblin, count, increase player health
                if (goblin.hp === 0) {
                    defeatedGoblins++;
                    alert(`You defeated ${goblin.name} and have become stronger!`);
                    heroHP = heroHP + 2;
                }
                  
              // when hero is defeated, alert game over
                if (heroHP === 0) {
                    alert('Goblins overtook the castle! GAME OVER!');

                }  

                heroHPEl.textContent = heroHP;
                defeatedGoblinsEl.textContent = `You have defeated ${defeatedGoblins} ${(defeatedGoblins === 1) ? 'goblin!' : 'goblins!'}`;
                

                displayGoblins();
            });
        } 

        // when goblin is defeated, displays goblin differently
        if (goblin.hp <= 0) {
            goblinEl.classList.add('deadGoblin');
        }

        // when hero is defeated, display hero differently  
        if (heroHP <= 0) {
            heroImg.classList.add('game-over');
            goblinEl.classList.add('deadGoblin');
            document.body.style.backgroundImage = "url('./assets/castle-burning.png')";
            goblinListEl.style.display = 'none';
        }

        goblinListEl.append(goblinEl);
    }
}

function getRandomNumber() {
    const index = Math.floor(Math.random() * 4);
    return index;
}

displayGoblins();