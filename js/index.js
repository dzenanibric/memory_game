const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const shuffleCards = () => {
    let restricted_index = [];
    const game_field = document.querySelector('.container__game');

    const cards_stack = [
        'blue',
        'red',
        'green',
        'black',
        'purple',
        'maroon',
        'gray',
        'yellow',
        'blue',
        'red',
        'green',
        'black',
        'purple',
        'maroon',
        'gray',
        'yellow',
    ];

    for (let i = 0; i < cards_stack.length; i++) {
        let random_index = getRandomInt(0, cards_stack.length);

        let j = 0;
        while (j < restricted_index.length) {
            if (restricted_index[j] === random_index) {
                random_index = getRandomInt(0, cards_stack.length);
                j = 0;
            }
            else {
                j++;
            }
        }

        const card = document.createElement('div');

        card.setAttribute('id', cards_stack[random_index]);
        card.setAttribute('class', 'card');
        card.setAttribute('number', random_index);
        card.setAttribute('finished', 'false');
        card.style.boxShadow = '0px 0px 5px gray';

        game_field.appendChild(card);

        restricted_index.push(random_index);
    }
}

const showCard = (card, cards) => {
    card.style.background = card.getAttribute('id');

    cards.forEach(card => card.style.zIndex = '-1');

    setTimeout(() => {
        card.style.background = 'transparent';
        cards.forEach(card => {
            if(card.getAttribute('finished') === 'true'){
                card.style.zIndex = '-1';
            }
            else{
                card.style.zIndex = '0';
            }
        });
    }, 2000);
}

const gameHandler = () => {
    const start_button = document.getElementById('start-game-btn');
    const message = document.querySelector('.container__message');
    let points_field = document.getElementById('points');
    let selected_cards = [];

    start_button.addEventListener('click', () => {
        const all_cards = document.querySelectorAll('.card');
        
        message.innerText = '';
        all_cards.forEach(card => {
            card.remove();
        });

        let points = 0;
        points_field.innerText = points;

        shuffleCards();

        start_button.disabled = true;
        start_button.style.background = 'gray';
        start_button.textContent = 'START GAME';

        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('click', ()=>{

                showCard(card, cards);
                selected_cards.push(card);

                if(selected_cards.length === 2){
                    if(selected_cards[0].getAttribute('id') === selected_cards[1].getAttribute('id') && selected_cards[0].getAttribute('number') !== selected_cards[1].getAttribute('number')){
                        points++;
                        points_field.innerText = points;
                        setTimeout(()=>{
                            selected_cards[0].style.background = selected_cards[0].getAttribute('id');
                            selected_cards[1].style.background = selected_cards[1].getAttribute('id');
                            selected_cards[0].setAttribute('finished', 'true');
                            selected_cards[1].setAttribute('finished', 'true');
                            selected_cards[0].style.zIndex = '-1';
                            selected_cards[1].style.zIndex = '-1';
                            selected_cards = [];

                            if(points === 1){
                                message.innerText = 'Congratulations! You have successfully completed the game!';
                                start_button.disabled = false;
                                start_button.style.background = 'whitesmoke';
                                start_button.textContent = 'START GAME AGAIN';                          
                            }
                        }, 2000);
                    }
                    else{
                        selected_cards = [];
                    }
                }
            });
        });
    });
}

gameHandler();