let levelLabel = document.getElementById('levelId')
let highscoreLabel = document.getElementById('highscore')
// Kaboom Game - 
// Code from kaboom's platformer playground and Code with Ania on YT
kaboom({
    font: "monospace",
    scale: 1,
    background: [136, 136, 223],
    width:1400,
    height:700,
    letterbox: true,

});

// Load assets
// Sprites
loadSprite('peach', '../static/media/peach-sprite.png')
loadRoot('https://i.imgur.com/');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('goomba', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
// loadSprite('mario', 'Wb1qfhK.png');
loadSprite('mushroom', '0wMd92p.png');
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

// Enable gravity manually (required in v3000+)
setGravity(2400);

// custom method controlling moving sprites (goomba/mushrooms)
function goombaMoves(speed = 60, dir = 1) {
    return {
        id: "goombaMoves",
        require: [ "pos", "area" ],
        add() {
            this.on("collide", (obj, col) => {
                if (col.isLeft() || col.isRight()) {
                    dir = -dir
                }
            })
        },
        update() {
            this.move(speed * dir, 0)
        },
    }
}

// custom method that makes stuff grow big
function big() {
    let timer = 0
    let isBig = false
    let destScale = 2
    return {
        // method id / name
        id: "big",
        // it requires the scale component
        require: [ "scale" ],
        // this runs every frame
        update() {
            if (isBig) {
                timer -= dt()
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                if (timer <= 0) {
                    this.smallify()
                    CURRENT_JUMP_FORCE = JUMP_FORCE
                }
            }
            this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
        },
        // custom methods
        isBig() {
            return isBig
        },
        smallify() {
            destScale = 2 
            timer = 0
            isBig = false
        },
        biggify(time) {
            destScale = 4
            timer = time
            isBig = true
        },
    }
}

// Constants for Speed
const MOVE_SPEED = 240;
const JUMP_FORCE = 900;
const BIG_JUMP_FORCE = 1300;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 800;


const LEVELS = [
    [
        '..................................................................................',
        '..................................................................................',
        '.......................==..........................................................',
        '..................................................................................',
        '...........................==.....................................................',
        '..................................................................................',
        '..................................................................................',
        '..........%....=*=%=..............................................................',
        '................................-+................................................',
        '...........................-+...()................................-+..............',
        '...........................()...()...........^....^...............()..............',
        '====================================================================   ===========',
    ],
    [
        '£.().............................................................................£',
        '£.-+.............................................................................£',
        '£................................................................................£',
        '£................................................................................£',
        '£................................................................................£',
        '£................................................................................£',
        '£................................................................................£',
        '£.............@@@@............................x..................................£',
        '£.............................................x................................-+£',
        '£.........................................x...x.....x......................-+..()£',
        '£..........................x....z.........x...x.....x.......z..............()..()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ],
]

// Defines each symbol within the maps
const levelConf = {
    tileWidth: 40,
    tileHeight: 40,
    tiles: {
        '=': () => [sprite('block'), area(), body({ isStatic: true }), scale(2), anchor("bot"),
        offscreen({ hide: true }), "platform",],
        '$': () => [sprite('coin'), area(), scale(2), anchor("bot"),
    offscreen({ hide: true }), 'coin'],
        '%': () => [sprite('surprise'), area(), body({ isStatic: true }), scale(2), anchor("bot"),
    offscreen({ hide: true }), 'coin-surprise',],
        '*': () => [sprite('surprise'), area(), body({ isStatic: true }), scale(2), anchor("bot"),
    offscreen({ hide: true }), 'mushroom-surprise'],
        '}': () => [sprite('unboxed'), area(), body({ isStatic: true }), scale(2), anchor("bot"),
    offscreen({ hide: true })],
        '(': () => [sprite('pipe-bottom-left'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true })],
        ')': () => [sprite('pipe-bottom-right'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true })],
        '-': () => [sprite('pipe-top-left'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }), 'pipe'],
        '+': () => [sprite('pipe-top-right'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }), 'pipe'],
        '^': () => [sprite('goomba'), area(), body(), scale(2), anchor("bot"),
    offscreen({ hide: true }), 'enemy', goombaMoves()],
        '#': () => [sprite('mushroom'), area(), body(), scale(2), anchor("bot"),
    offscreen({ hide: true }), 'mushroom', goombaMoves()],
        '!': () => [sprite('blue-block'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }), "platform",],
        '£': () => [sprite('blue-brick'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true })],
        'z': () => [sprite('blue-goomba'), area(), body(), anchor("bot"),
    offscreen({ hide: true }), 'enemy', goombaMoves()],
        '@': () => [sprite('blue-surprise'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }), 'coin-surprise'],
        'x': () => [sprite('blue-steel'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }),],
    },
};

scene("free-game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

    //add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);

    const player = add([
        sprite('peach'),
        pos(100, 90),
        area(),
        body(),
        anchor('bot'),
        big(), // custom method
        scale(1),
    ])


    // Player Actions - runs every frame
    player.onUpdate(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { coins: coins })
        }
    })

    player.onBeforePhysicsResolve((collision) => {
        if (collision.target.is(["platform"]) && player.isJumping()) {
            collision.preventResolution()
        }
    })

    player.onPhysicsResolve(() => {
        // Set the viewport center to player.pos
        camPos(player.pos)
	})

    // if player onCollide with any obj with "danger" tag, lose
    player.onCollide("danger", () => {
        go("lose", { coins: coins })
        // play("sfx")
    })

    player.onCollide("pipe", () => {
        onKeyPress('down', () => {
            // play("sfx")
            if (levelId + 1 < LEVELS.length) {
                go("free-game", {
                    levelId: levelId + 1,
                    coins: coins,
                })
            } else {
                go("win", {coins: coins})
            }

        })
	})

    player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.2)
			destroy(l)
            // play("sfx")
		}
	})

    player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose", { coins: coins })
			// play("sfx")
		}
	})

	// grows mushroom if player's head bumps into an obj with "mushroom-surprise" tag
	player.onHeadbutt((obj) => {
		if (obj.is("mushroom-surprise")) {
			const mushroom = level.spawn("#", obj.tilePos.sub(0, 1))
			mushroom.jump()
            destroy(obj)
            level.spawn("}", obj.tilePos.add(0,0))
			// play("sfx")
		}
	})

	// player grows big onCollide with a "Mushroom" obj
	player.onCollide("mushroom", (m) => {
		destroy(m)
		// as we defined in the big() component
		player.biggify(5)
		// play("sfx")
	})

    // releases coin if player's head bumps into an obj with "coin-surprise" tag
    // then changes surprise box to unboxed - from Ania Kubow
	player.onHeadbutt((obj) => {
		if (obj.is("coin-surprise")) {
			level.spawn("$", obj.tilePos.sub(0, 1))
            destroy(obj)
            level.spawn("}", obj.tilePos.add(0,0))
			// play("sfx")
		}
	})

    // // Collect coins, update score
    let coinPitch = 0
   
    onUpdate(() => {
        if (coinPitch > 0) {
            coinPitch = Math.max(0, coinPitch - dt() * 100)
        }
    })

	player.onCollide("coin", (c) => {
		destroy(c)
		// play("sfw")
		coinPitch += 100
		coins += 1

        highscoreLabel.innertext = coins
        levelLabel.innertext = parseInt(levelId + 1)
	})

    // Player Moves
    onKeyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    onKeyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    function jump() {
        if (player.isGrounded()) {
            player.jump(CURRENT_JUMP_FORCE)
        }
    }

    onKeyPress('space', jump)

    onGamepadButtonPress("south", jump)

	onGamepadStick("left", (v) => {
		player.move(v.x * MOVE_SPEED, 0)
	})

	onKeyPress("f", () => {
		setFullscreen(!isFullscreen())
	})

})

scene("lose", ({ coins }) => {
    add([
        text(`YOU LOST.\nSCORE: ${coins}\nPRESS ANY KEY TO PLAY AGAIN`),
        pos(width()/2, height()/2),
        anchor("center"),
    ])
    onKeyPress(() => go("free-game", { coins: 0, levelId: 0 }))
})

scene("win", ({ coins, levelId }) => {
	add([
 		text(`YOU WON\nSCORE: ${coins}\nCONGRATS!`),
        pos(width()/2, height()/2),
        anchor("center"),
	])
	onKeyPress(() => go("pay-game", { coins: coins, levelId: levelId +1 }))
})

go("free-game")