const VIEWPORT = { width: 1920, height: 1080 };

// Avatars (img urls) list to add players
const players = [
];

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x90c7ff,
  autoDensity: true,
  resolution: 1,
});
const tickerOrigin = { minFPS: app.ticker.minFPS, maxFPS: app.ticker.maxFPS };

document.body.appendChild(app.view);

let inTitle = true;

const resWidth = res => res.texture.baseTexture.width * app.renderer.width / VIEWPORT.width;
const resHeight = res => res.texture.baseTexture.height * app.renderer.height / VIEWPORT.height;
const posX = val => val * app.renderer.width / VIEWPORT.width;
const posY = val => val * app.renderer.height / VIEWPORT.height;

PIXI.Loader.shared
  .add('s', '/assets/s.png')
  .add('title', '/assets/title.png')
  .add('titleCanvas', '/assets/title-canvas.png')
  .add('titleStars', '/assets/title-stars.png')
  .add('titleStart', '/assets/title-start.png')
  .add('background', '/assets/background.png')
  .add('cloud', '/assets/cloud.png')
  .add('castleIslandMini', '/assets/castle-island-mini.png')
  .add('flagY0', '/assets/flag-y-0.png')
  .add('flagY1', '/assets/flag-y-1.png')
  .add('flagY2', '/assets/flag-y-2.png')
  .add('swampBubble0', '/assets/swamp-bubble-0.png')
  .add('swampBubble1', '/assets/swamp-bubble-1.png')
  .add('swampBubble2', '/assets/swamp-bubble-2.png')
  .add('swampBubble3', '/assets/swamp-bubble-3.png')
  .add('castle', '/assets/castle.png')
  .add('playerCanvas', '/assets/player-canvas.png')
  .add('playerHeart0', '/assets/player-heart-0.png')
  .add('playerHeart1', '/assets/player-heart-1.png')
  .add('playerSkull', '/assets/player-skull.png');

players.forEach((playerImg, i) => PIXI.Loader.shared.add('player' + i, playerImg));

PIXI.Loader.shared.load((loader, resources) => {
  const cloud = new PIXI.Sprite(resources.cloud.texture);
  cloud.width = resWidth(resources.cloud);
  cloud.height = resHeight(resources.cloud);
  cloud.y = posY(238);
  cloud.x = -cloud.width;
  app.stage.addChild(cloud);

  const background = new PIXI.Sprite(resources.background.texture);
  background.width = app.renderer.width;
  background.height = app.renderer.height;
  app.stage.addChild(background);

  const cAnimation = { step: 0, originY: posY(101), maxs: [posY(91), posY(111)] };
  const castleContainer = new PIXI.Container();
  castleContainer.width = resWidth(resources.castle);
  castleContainer.height = resHeight(resources.castle);
  castleContainer.y = cAnimation.originY;
  castleContainer.x = posX(1416);
  app.stage.addChild(castleContainer);

  const flagsYTextures = [];
  for (let i = 0; i < 3; i++) {
    flagsYTextures.push(resources['flagY' + i].texture);
  }
  flagsYTextures.push(resources.flagY1.texture);

  const flagsY = new PIXI.AnimatedSprite(flagsYTextures);
  flagsY.width = resWidth(resources.flagY0);
  flagsY.height = resHeight(resources.flagY0);
  flagsY.animationSpeed = 0.08;
  flagsY.y = posY(30);
  flagsY.x = posX(165);
  flagsY.gotoAndPlay(0);
  castleContainer.addChild(flagsY);

  const castle = new PIXI.Sprite(resources.castle.texture);
  castle.width = resWidth(resources.castle);
  castle.height = resHeight(resources.castle);
  castle.y = 0;
  castle.x = 0;
  castleContainer.addChild(castle);

  const cimAnimation = { step: 0, originY: posY(705), maxs: [posY(695), posY(715)] };

  const castleIslandMini = new PIXI.Sprite(resources.castleIslandMini.texture);
  castleIslandMini.width = resWidth(resources.castleIslandMini);
  castleIslandMini.height = resHeight(resources.castleIslandMini);
  castleIslandMini.y = cimAnimation.originY;
  castleIslandMini.x = posX(1830);
  app.stage.addChild(castleIslandMini);

  const swampBubbleTextures = [];
  for (let i = 0; i < 4; i++) {
    swampBubbleTextures.push(resources['swampBubble' + i].texture);
  }

  for (let i = 0; i < 3; i++) {
    const swampBubble = new PIXI.AnimatedSprite(swampBubbleTextures);
    swampBubble.width = resWidth(resources.swampBubble0);
    swampBubble.height = resHeight(resources.swampBubble0);
    swampBubble.animationSpeed = 0.08;
    swampBubble.x = [posX(890), posX(1185), posX(1060)][i];
    swampBubble.y = [posY(910), posY(930), posY(1021)][i];
    swampBubble.gotoAndPlay(Math.random() * 4);
    app.stage.addChild(swampBubble);
  }

  if (players.length) {
    const playersPos = {
      originX: posX(10),
      originY: posY(10),
      x: posX(10),
      y: posY(10),
      marginX: posX(10),
      marginY: posY(10),
      avatarWidth: posX(80),
      avatarHeight: posY(80),
      avatarX: posX(11),
      avatarY: posY(11),
      canvasWidth: resWidth(resources.playerCanvas),
      canvasHeight: resHeight(resources.playerCanvas),
      heartWidth: resWidth(resources.playerHeart0),
      heartHeight: resHeight(resources.playerHeart0),
    }

    players.forEach((playerImg, playerIndex) => {
      const playerContainer = new PIXI.Container();
      playerContainer.x = playersPos.x;
      playerContainer.y = playersPos.y;
      playerContainer.width = playersPos.canvasWidth;
      playerContainer.height = playersPos.canvasHeight;

      const playerAvatar = new PIXI.Sprite(resources['player' + playerIndex].texture);
      playerAvatar.width = playersPos.avatarWidth;
      playerAvatar.height = playersPos.avatarHeight;
      playerAvatar.x = playersPos.avatarX;
      playerAvatar.y = playersPos.avatarY;
      playerContainer.addChild(playerAvatar);

      const playerCanvas = new PIXI.Sprite(resources.playerCanvas.texture);
      playerCanvas.width = playersPos.canvasWidth;
      playerCanvas.height = playersPos.canvasHeight;
      playerCanvas.x = 0;
      playerCanvas.y = 0;
      playerContainer.addChild(playerCanvas);

      let skullOn = false;
      const playerSkull = new PIXI.Sprite(resources.s.texture);
      playerSkull.width = resWidth(resources.playerSkull);
      playerSkull.height = resHeight(resources.playerSkull);
      playerSkull.x = playersPos.avatarX;
      playerSkull.y = playersPos.avatarY;
      playerSkull.interactive = true;
      playerSkull.buttonMode = true;
      playerSkull.on('pointerdown', () => {
        skullOn = !skullOn;
        playerSkull.texture = resources[skullOn ? 'playerSkull' : 's'].texture;
      });
      playerContainer.addChild(playerSkull);

      for (let i = 0; i < 3; i++) {
        let heartType = 1;
        const playerHeart = new PIXI.Sprite(resources.playerHeart1.texture);
        playerHeart.width = playersPos.heartWidth;
        playerHeart.height = playersPos.heartHeight;
        playerHeart.x = posX(98);
        playerHeart.y = posX(11) + (i * (playersPos.heartHeight - 2));
        playerHeart.interactive = true;
        playerHeart.buttonMode = true;
        playerHeart.on('pointerdown', () => {
          heartType = heartType === 1 ? 0 : 1;
          playerHeart.texture = resources['playerHeart' + heartType].texture;
        });

        playerContainer.addChild(playerHeart);
      }

      app.stage.addChild(playerContainer);

      playersPos.x += playersPos.canvasWidth + playersPos.marginX;

      if (playersPos.x + playersPos.canvasWidth > app.renderer.width) {
        playersPos.y += playersPos.canvasHeight + playersPos.marginY;
        playersPos.x = playersPos.originX;
      }
    });
  }

  const initMainTicker = () => app.ticker.add(() => {
    cloud.x = cloud.x >= app.renderer.width ? -cloud.width : cloud.x + 0.5;

    castleContainer.y += cAnimation.step === 0 ? -0.07 : 0.07;
    cAnimation.step = cAnimation.step === 0 && castleContainer.y <= cAnimation.maxs[0]
      ? 1 : cAnimation.step;
      cAnimation.step = cAnimation.step === 1 && castleContainer.y >= cAnimation.maxs[1]
      ? 0 : cAnimation.step;

      castleIslandMini.y += cimAnimation.step === 0 ? -0.1 : 0.1;
      cimAnimation.step = cimAnimation.step === 0 && castleIslandMini.y <= cimAnimation.maxs[0]
        ? 1 : cimAnimation.step;
      cimAnimation.step = cimAnimation.step === 1 && castleIslandMini.y >= cimAnimation.maxs[1]
        ? 0 : cimAnimation.step;
  });

  const titleContainer = new PIXI.Container();
  titleContainer.x = 0;
  titleContainer.y = 0;
  titleContainer.width = app.renderer.width;
  titleContainer.height = app.renderer.height;
  app.stage.addChild(titleContainer);

  const titleBackground = new PIXI.Graphics();
  titleBackground.beginFill(0x90c7ff);
  titleBackground.drawRect(0, 0, app.renderer.width, app.renderer.height);
  titleBackground.endFill();
  titleContainer.addChild(titleBackground);

  const titleStars = new PIXI.Sprite(resources.titleStars.texture);
  titleStars.x = posX(523);
  titleStars.y = 0;
  titleStars.width = resWidth(resources.titleStars);
  titleStars.height = resHeight(resources.titleStars);
  titleContainer.addChild(titleStars);

  const title = new PIXI.Sprite(resources.title.texture);
  title.width = resWidth(resources.title);
  title.height = resHeight(resources.title);
  title.x = (app.renderer.width - title.width) / 2;
  title.y = posX(295);
  titleContainer.addChild(title);

  const titleCanvas = new PIXI.Sprite(resources.titleCanvas.texture);
  titleCanvas.width = resWidth(resources.titleCanvas);
  titleCanvas.height = resHeight(resources.titleCanvas);
  titleCanvas.x = (app.renderer.width - titleCanvas.width) / 2;
  titleCanvas.y = posX(562);
  titleCanvas.interactive = true;
  titleCanvas.buttonMode = true;
  titleContainer.addChild(titleCanvas);

  const titleStart = new PIXI.Sprite(resources.titleStart.texture);
  titleStart.width = resWidth(resources.titleStart);
  titleStart.height = resHeight(resources.titleStart);
  titleStart.x = (app.renderer.width - titleStart.width) / 2;
  titleStart.y = posX(650);
  titleStart.interactive = true;
  titleStart.buttonMode = true;
  titleContainer.addChild(titleStart);

  const titleTicker = () => (titleStart.visible = !titleStart.visible);
  app.ticker.add(titleTicker);
  app.ticker.minFPS = 2;
  app.ticker.maxFPS = 2;

  const destroyTitle = () => {
    app.ticker.remove(titleTicker);
    app.ticker.minFPS = tickerOrigin.minFPS;
    app.ticker.maxFPS = tickerOrigin.maxFPS;

    titleContainer.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    });

    initMainTicker();
  }

  titleCanvas.on('pointerdown', () => destroyTitle());
  titleStart.on('pointerdown', () => destroyTitle());
});
