import kaboom from "../libs/kaboom.mjs"

// Get next level redirect URL from Django template
const nextLevelUrl = document.querySelector("main").dataset.nextUrl

/**
* Retrieves CSRF token from cookies.
* @returns {string} The CSRF token if found; otherwise, an empty string.
*/
function getCSRFToken(){
    const cookies = document.cookie.split(';')
    for (let cookie of cookies){
        const [key, value] = cookie.trim().split('=')
        if (key === "csrftoken") return value
    }
    return ''
}

/**
 * Sends the player's score for a specific level to the server via a POST request.
 * @param {string} level - The identifier of the game level for which the score is being submitted.
 * @param {number} score - The player's score to be saved for the specified level.
 * @param {number} totalScore - cumulative across all levels.
 * @returns {Promise} This function does not return a value, but logs the server response or error to the console.
*/
function postScore(level, score = null){
    fetch("/game/api/save-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ 
            level: level, 
            score: totalScore || score
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Score saved:", data)
        return data
    })
    .catch(err => {
        console.log("Error saving score:", err)
        throw err
    })
}

// DOM element for UI updates.
const levelLabel = document.getElementById('levelId')
levelLabel.innertext = "World 1"
const highscoreLabel = document.getElementById('highscore')

// Get previous total score from Django template
const previousScore = parseInt(document.querySelector("main").dataset.previousScore || "0")
let totalScore = previousScore

// Update UI with carried-over score
highscoreLabel.innerText = totalScore

/**
 * Update UI and score during game
 */
function collectPoints(points = 1){
    totalScore += points
    highscoreLabel.innerText = totalScore
    return totalScore
}

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
// loadSprite('peach', '../static/media/peach-sprite.png')
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

scene("World1", ({ score } = { score:0}) => {

    //add level to scene
    const level = addLevel(LEVELS[0], levelConf);
    levelLabel.innertext = "World 1"

    // Use passed score if provided, otherwise keep existing totalScore
    if (score !== undefined) {
        totalScore = score
        highscoreLabel.innerText = totalScore
        console.log(`World1 restarted with score: ${totalScore}`)
    } else {
        console.log(`World1 started fresh with score: ${totalScore}`)
    }

    //Player
    const player = add([
        sprite('mario'),
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
            go('lose', { totalScore })
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
        go("lose", { totalScore })
        // play("sfx")
    })

    player.onCollide("pipe", () => {
        onKeyPress('down', () => {
            // play("sfx")
            go("win", { totalScore });
        })
    })

    player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.2)
            collectPoints(10)
			destroy(l)
            // play("sfx")
		}
	})

    player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose", { totalScore })
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
		collectPoints(1)
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

scene("lose", ({ totalScore }) => {
    add([
        text(`YOU LOST.\nSCORE: ${totalScore}\nPRESS ANY KEY TO PLAY AGAIN`),
        pos(width()/2, height()/2),
        anchor("center"),
    ])
    
    // Save both level score and total score
    postScore("world1", totalScore)
    onKeyPress(() => {
        go("World1", { totalScore: 0, levelId:0 })
    })
})

scene("win", ({ totalScore }) => {
    add([
        text(`YOU WON\nSCORE: ${totalScore}\nCONGRATS!`),
        pos(width()/2, height()/2),
        anchor("center"),
    ])
    
    // Save both level score and total score
    postScore("World 1", totalScore)
        onKeyPress(() => {
            if (nextLevelUrl) {
                window.location.href = nextLevelUrl
            } else {
                console.error("nextLevelUrl is not defined")
            }
        })
})

go("World1")