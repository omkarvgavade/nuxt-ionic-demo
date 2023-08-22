export default class SolitaireGame extends Phaser.Scene {
  constructor() {
    super({ key: "SolitaireGame" });
    this.stockCards = [];
    this.tempCards = [];
    this.placeholders = []; // Array to store placeholders
    this.originalImagePosition = { x: 0, y: 0 }; // Initial position for dragged image
  }

  preload() {
    this.load.atlas(
      "cards",
      "assets/atlas/cards.png",
      "assets/atlas/cards.json"
    );
  }
  create() {
    const frames = this.textures.get("cards").getFrameNames();
    console.log(frames);
    this.add.rectangle(200, 100, 75, 125, 0x33cc33);

    for (let i = 0; i < 24; i++) {
      const pickedRandomCard = Phaser.Math.RND.pick(frames);
      frames.splice(frames.indexOf(pickedRandomCard), 1);
      const card1 = this.add.image(200, 100, "cards", "back").setInteractive();
      const scaleX = 75 / card1.width;
      const scaleY = 125 / card1.height;
      card1.setScale(scaleX, scaleY);
      card1.setData("frame", pickedRandomCard);
      this.stockCards.push(pickedRandomCard);

      card1.on("pointerdown", (pointer) => {
        this.flipCard(card1);
      });
    }

    this.placeholders = [];

    const placeholder1 = this.add
      .rectangle(500, 100, 75, 125, 0x33cc33)
      .setInteractive();
    const placeholder2 = this.add
      .rectangle(600, 100, 75, 125, 0x33cc33)
      .setInteractive();
    const placeholder3 = this.add
      .rectangle(700, 100, 75, 125, 0x33cc33)
      .setInteractive();
    const placeholder4 = this.add
      .rectangle(800, 100, 75, 125, 0x33cc33)
      .setInteractive();
    this.placeholders.push(
      placeholder1,
      placeholder2,
      placeholder3,
      placeholder4
    );

    this.add.rectangle(200, 250, 75, 125, 0x33cc33);
    this.add.rectangle(300, 250, 75, 125, 0x33cc33);
    this.add.rectangle(400, 250, 75, 125, 0x33cc33);
    this.add.rectangle(500, 250, 75, 125, 0x33cc33);
    this.add.rectangle(600, 250, 75, 125, 0x33cc33);
    this.add.rectangle(700, 250, 75, 125, 0x33cc33);
    this.add.rectangle(800, 250, 75, 125, 0x33cc33);
  }

  flipCard(card1) {
    const scaleX = 75 / card1.width;
    const scaleY = 125 / card1.height;

    // Remove previous card2 if it exists
    // if (this.card2) {
    //   this.card2.destroy();
    // }

    this.card2 = this.add
      .image(300, 100, "cards", card1.getData("frame"))
      .setInteractive();

    this.card2.setScale(scaleX, scaleY);
    this.input.setDraggable(this.card2);

    this.originalImagePosition = { x: this.card2.x, y: this.card2.y };

    card1.setVisible(false);
    this.setDragEvents(); // Add this line to set up drag events for card2
  }

  setDragEvents() {
    this.input.on("dragstart", (pointer, gameObject) => {
      this.children.bringToTop(gameObject);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
      this.placeholders.forEach((placeholder) => {
        if (placeholder.getBounds().contains(pointer.x, pointer.y) && !placeholder.getData("hasImage")) {
          this.placeImageInPlaceholder(gameObject, placeholder);
        }
      });

      if (!gameObject.getData("placed")) {
        this.restoreImagePosition(gameObject);
      }
    //   console.log(gameObject)
    });
  }

  placeImageInPlaceholder(image, placeholder) {
    image.x = placeholder.x;
    image.y = placeholder.y;
    image.setData("placed", true);
    placeholder.setData("hasImage", true); // Mark placeholder as having an image
  }

  restoreImagePosition(image) {
    image.x = this.originalImagePosition.x;
    image.y = this.originalImagePosition.y;
    image.setData("placed", false);
  }
}
