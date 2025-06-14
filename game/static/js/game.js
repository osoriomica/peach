// Kaboom Game - 
// Code from kaboom's platformer playground and Code with Ania on YT
kaboom({
    font: "monospace",
    scale: 1,
    background: [136, 136, 223],
    height: 700,
    width: 700,
    letterbox: true,
});

// Load assets
// Sprites
loadRoot('https://i.imgur.com/');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('goomba', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('mario', 'Wb1qfhK.png');
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

// custom method controlling goomba's movement
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
const ENEMY_SPEED = 60;

const LEVELS = [
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
        '£.().......................................................................................£',
        '£.-+.......................................................................................£',
        '£..........................................................................................£',
        '£..........................................................................................£',
        '£..........................................................................................£',
        '£..........................................................................................£',
        '£..........................................................................................£',
        '£................@@@@............................x.........................................£',
        '£................................................x.......................................-+£',
        '£............................................x...x.....x.............................-+..()£',
        '£.............................x....z.........x...x.....x.......z.....................()..()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
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
    offscreen({ hide: true }), 'mushroom'],
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

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

    //add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);

    const player = add([
        sprite('mario'),
        pos(100, 90),
        area(),
        body(),
        anchor('bot'),
        big(), // custom method
        scale(2),
    ])


    // Player Actions - runs every frame
    player.onUpdate(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: coinsLabel })
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
        go("lose", { score: coinsLabel.text })
        // play("sfx")
    })

    player.onCollide("pipe", () => {
        onKeyPress('down', () => {
            // play("sfx")
            if (levelId + 1 < LEVELS.length) {
                go("game", {
                    levelId: levelId + 1,
                    coins: coins,
                })
            } else {
                go("win")
            }

        })
	})

    player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
            // play("sfx")
		}
	})

    player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose", { score: coinsLabel.text })
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
            mushroom.move()
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

    // Collect coins, update score
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
		coinsLabel.text =  "SCORE: " + coins
	})

    // add score label 
    const coinsLabel = add([
        text("SCORE: " + coins),
        pos(40, 160),
        {value: coins },
        z(100),
        fixed()
    ])

    // Converts the string value to an integer to display correct level 
    // to the user, next to the score.
    const levelLabel = add([
        text("LEVEL - " + parseInt(levelId + 1)),
        pos(40, 90), 
        fixed(),
    ])

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

// Ania's code
// go("game", {
//     level: 0,
//     score: 0
// });

scene("lose", ({ score }) => {
	add([
		text(`YOU LOST. YOUR SCORE IS: ${score}`),
        pos(center)
	])
	onKeyPress(() => go("game"))
})

scene("win", () => {
	add([
		text(`YOU WON. YOUR SCORE IS: ${score}`),
	])
	onKeyPress(() => go("game"))
})

go("game")