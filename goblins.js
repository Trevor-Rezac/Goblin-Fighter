export const goblinArr = [
    { 
        name: 'Grok',
        hp: `${Math.ceil(Math.random() * 10)}`,
        img_url: `./assets/goblin-${getRandomNumber()}.png`
    },
    {
        name: 'Krog',
        hp: `${Math.ceil(Math.random() * 10)}`,
        img_url: `./assets/goblin-${getRandomNumber()}.png`
    },
];


function getRandomNumber() {
    const index = Math.floor(Math.random() * 4);
    return index;
}

