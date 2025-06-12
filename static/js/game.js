// Kaboom Game
function startGame() {
    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        clearColor: [0, 0, 0, 1]
    });
    
    // Speed identifiers
    const moveSpeed = 120;
    const jumpForce = 360;
    const bigJumpForce = 550;
    let currentJumpForce = jumpForce;
    const fallDeath = 400;
    const enemySpeed = 20;

    // Game Logic
    let isJumping = true;

    // Load assets
    loadRoot('https://i.imgur.com/');
    loadSprite('coin', 'WbKxhcd.png');
    loadSprite('evil-shroom', 'KPO3fR9.png');
    loadSprite('brick', 'pogC9x5.png');
    loadSprite('block', 'M6rwarW.png');
    loadSprite('mario', 'Wb1qfhK.png');
    loadSprite('mushroom', 'OwMd92p.png');
    loadSprite('surprise', 'gesQ1KP.png');
    loadSprite('unboxed', 'bdrLpi6.png');
    loadSprite('pipe-top-left', 'ReTPiWY.png');
    loadSprite('pipe-top-right', 'hj2GK4n.png');
    loadSprite('pipe-bottom-left', 'c1cYSbt.png');
    loadSprite('pipe-bottom-right', 'nqQ79eI.png');
    loadSprite('blue-block', 'fVscIbn.png');
    loadSprite('blue-brick', '3e5YRQd.png');
    loadSprite('blue-steel', 'gqVoI2b.png');
    loadSprite('blue-evil-mushroom', 'SvV4ueD.png');
    loadSprite('blue-surprise', 'RMqCc16.png');
    // loadSprite('peach', 'static/media/peach.png');

    scene("game", ({level, score}) => {
        layers(["bg", "obj", "ui"], "obj");

        const maps = [
            [
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '................................................................................................................',
            '==================================================================================================   ===========',
            ],
            [
            ],
        ]
    

        const levelCfg = {
            width: 20,
            height: 20,
            '=': [sprite('block'), solid()],
        };

        const gameLevel = addLevel(maps[level], levelCfg);
        });

        start("game", {
            level: 0,
            score: 0
        });
}

// Start the game on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

