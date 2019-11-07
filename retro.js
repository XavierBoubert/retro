const VIEWPORT = { width: 1920, height: 1080 };

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x90c7ff,
  autoDensity: true,
  resolution: 1,
});

window.OK = app;

document.body.appendChild(app.view);

const resWidth = res => res.texture.baseTexture.width * app.renderer.width / VIEWPORT.width;
const resHeight = res => res.texture.baseTexture.height * app.renderer.height / VIEWPORT.height;
const posX = val => val * app.renderer.width / VIEWPORT.width;
const posY = val => val * app.renderer.height / VIEWPORT.height;

PIXI.Loader.shared
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
  .load((loader, resources) => {
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

    app.ticker.add(() => {
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
});
