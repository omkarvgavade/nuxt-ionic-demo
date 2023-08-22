export default class MemoryCardGame extends Phaser.Scene {
    constructor() {
        super({ key: 'MemoryCardGame' });
        this.cards = [];
        this.tempCards=[];
        this.flippedCards = [];
        this.moves = 0;
        this.canClick = true;
        this.restartButton = null;
        this.movesText = null;
    }

    preload() {
        this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
    }

    create() {
        const buttonOffsetX = 20;

        this.restartButton = this.add.text(buttonOffsetX, 16, 'Restart', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#dc3545',
            padding: {
                x: 12,
                y: 8,
            },
        }).setInteractive();

        this.movesText = this.add.text(buttonOffsetX, 64, 'Moves: 0', {
            fontSize: '24px',
            fill: '#ffffff',
        });

        this.restartButton.on('pointerdown', () => {
            this.restartGame();
        });

        const frames = this.textures.get('cards').getFrameNames();
        let x = 250;
        let y = 100;

        for (let i = 0; i < 8; i++) {
            const card1 = this.add.image(x, y, 'cards', 'back').setInteractive();
            card1.setData('frame', Phaser.Math.RND.pick(frames));
            card1.setData('flipped', false);

            const card2 = this.add.image(x, y + 120, 'cards', 'back').setInteractive();
            card2.setData('frame', card1.getData('frame'));
            card2.setData('flipped', false);

            this.cards.push(card1, card2);

            x += 200;
            if (i === 3) {
                x = 250;
                y += 240;
            }
        }

        this.input.on('gameobjectdown', (pointer, card) => {
            this.onCardClicked(card);
        });
    }

    updateMovesText() {
        this.movesText.setText('Moves: ' + this.moves);
    }

    restartGame() {
        this.canClick = true;
        this.moves = 0;
        this.updateMovesText();
        this.cards.forEach(card => {
            card.setData('flipped', false);
            card.setFrame('back');
            card.setVisible(true);
        });
        this.flippedCards = [];
    }

    onCardClicked(card) {
        console.log(card)
        if (this.canClick && !card.getData('flipped') && this.flippedCards.length < 2) {
            card.setFrame(card.getData('frame'));
            card.setData('flipped', true);
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.time.delayedCall(1000, () => {
                    const [card1, card2] = this.flippedCards;
                    if (card1.getData('frame') === card2.getData('frame')) {
                        card1.setVisible(false);
                        card2.setVisible(false);
                    } else {
                        card1.setFrame('back');
                        card2.setFrame('back');
                        card1.setData('flipped', false);
                        card2.setData('flipped', false);
                    }
                    this.flippedCards = [];
                    this.moves++;
                    this.updateMovesText();
                });
            }
        }
    }
}
