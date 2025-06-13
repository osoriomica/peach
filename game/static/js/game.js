// Kaboom Game
function startGame(){
    kaboom({
        font: "monospace",
        scale: 2,
        background: [136, 136, 223], 
    });

    // Enable gravity manually (required in v3000+)
    setGravity(1600);
    
    // Speed identifiers
    const moveSpeed = 120;
    const jumpForce = 370;
    const bigJumpForce = 550;
    let currentJumpForce = jumpForce;
    const fallDeath = 400;
    const enemySpeed = 20;
    
    // Game Logic
    let isJumping = true;
    
    // Load assets
    
    // Sprites
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
    loadSprite('blue-goomba', 'SvV4ueD.png');
    loadSprite('blue-surprise', 'RMqCc1G.png');
    

    scene("game", ({level, score}) => {
        var score = 0;

        const maps = [
            [
            '..................................................................................',
            '..................................................................................', 
            '..................................................................................',
            '..................................................................................',
            '..................................................................................', 
            '..................................................................................',
            '..................................................................................',
            '..........%....=*=%=..............................................................',
            '................................-+................................................',
            '...........................-+...()................................-+..............',
            '...........................()...()...........^....^...............()..............',
            '====================================================================   ===========',
            ],
            [
            '£.()............................................................................................................£',
            '£.-+............................................................................................................£',
            '£...............................................................................................................£',    
            '£...............................................................................................................£',
            '£...............................................................................................................£',
            '£...............................................................................................................£',
            '£...............................................................................................................£',
            '£................................................x..............................................................£',
            '£................................................x............................................................-+£',
            '£...............@@@@@........................x...x.....x..................................................-+..()£',
            '£.................................z.................................................z.....................()..()£',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            ],
        ]
    

        const levelCfg = {
            tileWidth: 30,
            tileHeight: 30,
            tiles: {
                '=' : () => [sprite('block'), area(), body({ isStatic: true })],
                '$' : () => [sprite('coin'), area(), 'coin'],
                '%' : () => [sprite('surprise'), area(), body({ isStatic: true }), 'coin-surprise'],
                '*' : () => [sprite('surprise'), area(), body({ isStatic: true }), 'mushroom-surprise'],
                '}' : () => [sprite('unboxed'), area(), body({ isStatic: true })],
                '(' : () => [sprite('pipe-bottom-left'), area(), body({ isStatic: true }), scale(0.5)],
                ')' : () => [sprite('pipe-bottom-right'), area(), body({ isStatic: true }), scale(0.5)],
                '-' : () => [sprite('pipe-top-left'), area(), body({ isStatic: true }), scale(0.5), 'pipe'],
                '+' : () => [sprite('pipe-top-right'), area(), body({ isStatic: true }), scale(0.5), 'pipe'],
                '^' : () => [sprite('evil-shroom'), area(), body({ isStatic: true }), 'dangerous'],
                '#' : () => [sprite('mushroom'), area(), body(), 'mushroom'],
                '!' : () => [sprite('blue-block'), area(), body({ isStatic: true }), scale(0.5)],
                '£' : () => [sprite('blue-brick'), area(), body({ isStatic: true }), scale(0.5)],
                'z' : () => [sprite('blue-goomba'), area(), body({ isStatic: true }), scale(0.5), 'dangerous'],
                '@' : () => [sprite('blue-surprise'), area(), body({ isStatic: true }), scale(0.5), 'coin-surprise'],
                'x' : () => [sprite('blue-steel'), area(), body({ isStatic: true }), scale(0.5)],
        }
        };

        const gameLevel = addLevel(maps[level], levelCfg);
        const scoreLabel = add([
            text(`score: ${score}`, {  size:16, color: [255, 255, 255, 1]  }),
            pos(90,300),
            z(100),
            
        ])

        // Converts the string value to an integer to display correct level 
        // to the user, next to the score.
        add([text('level' + parseInt(level + 1), {  size:16 }), pos(10,300)])

        const player = add([
            sprite('mario'),
            pos(30, 0),
            area(),
            body(),
            anchor('bot'),
        ])
        
        
        // Player Actions
        player.onUpdate(() => {
            camPos(player.pos)
            if(player.pos.y >= fallDeath){
                go('lose', {score: scoreLabel.value})
            }
        })

        onKeyDown('left', () => {
            player.move(-moveSpeed, 0)
        })

        onKeyDown('right', () => {
            player.move(moveSpeed, 0)
        })

        player.onUpdate(() => {
            if(player.isGrounded()){
                isJumping = false
            }
        })

        onKeyPress('space', () => {
            if (player.isGrounded()) {
                player.jump(currentJumpForce)
                isJumping = true
            }
        })

        scene('lose', ({score}) => {
            add([text('your score: 32'), pos(width()/2,height()/2)])
        })
    });

        go("game", {
            level: 0,
            score: 0
        });
}

startGame();