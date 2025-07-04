/* jshint esversion: 11 */
/*jshint -W033 */
// world1.js - Kaboom.js platformer game for Django

import kaboom from "../libs/kaboom.mjs"

// Get next level redirect URL from Django template
const nextLevelUrl = document.querySelector("main").dataset.nextUrl

/**
* Retrieves CSRF token from cookies.
* @returns {string} The CSRF token if found otherwise, an empty string.
*/
function getCSRFToken(){
    const cookies = document.cookie.split('')
    for (let cookie of cookies){
        const [key, value] = cookie.trim().split('=')
        if (key === "csrftoken") return value
    }
    return ''
}

// Helper function to reset game session
async function resetGameSession() {
    try {
        const response = await fetch('/game/api/reset-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            }
        })

        if (!response.ok) {
            throw new Error('Failed to reset game session')
        }

    } catch (error) {
        throw error
    }
}

// Flag to prevent duplicate saves
let scoreSaved = false
/**
 * Sends the player's score for a specific level to the server via a POST request.
 * @param {string} level - The identifier of the game level for which the score is being submitted.
 * @param {number} currentScore - The player's score to be saved for the specified level.
 * @returns {Promise} This function does not return a value, but used to log the server response or error to the console during dev.
*/
async function postScore(level, currentScore){
  
    try {
        const res = await fetch("/game/api/save-score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({
                level: level,
                score: currentScore
            })
        })
        const data = await res.json()
        scoreSaved = true
        return data
    } catch (err) {
        throw err
    }
}

// DOM element for UI updates.
const levelLabel = document.getElementById('levelId')
const highscoreLabel = document.getElementById('highscore')

// Global flags for touchscreen events
let touchLeft = false
let touchRight = false
let touchDown = false
let touchJump = false

// Get previous total score from Django template
const previousScore = parseInt(document.querySelector("main").dataset.previousScore || "0")
let totalScore = previousScore

// Update UI with carried-over score
highscoreLabel.innerText = totalScore

/**
 * Update UI and score during game
 */
function collectPoints(points = 1){
    totalScore += parseInt(points)
    highscoreLabel.innerText = totalScore
}

// Kaboom Game - 
// Code from kaboom's platformer playground and Code with Ania on YT
// Uses media query detection for mobile and medium screens
const isMobile = window.matchMedia("(max-width: 550px)").matches
const isMedium = window.matchMedia("(min-width: 551px) and (max-width: 1024px)").matches

if (isMobile) {
    kaboom({
        font: "monospace",
        scale: 1,
        background: [136, 136, 223],
        width: 550,
        height: 500,
        letterbox: true
    })
} else if (isMedium) {
    kaboom({
        font: "monospace",
        scale: 1,
        background: [136, 136, 223],
        width: 900,
        height: 600,
        letterbox: true
    })
} else {
    kaboom({
        font: "monospace",
        scale: 1,
        background: [136, 136, 223],
        width: 1400,
        height: 700,
        letterbox: true,
    })
}


// Load assets

// imgur sprites - See Readme.md for credits
loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('goomba', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-top-right-no', 'hj2GK4n.png')
loadSprite('pipe-top-left-no', 'ReTPiWY.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-goomba', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
loadSprite('peach', 'cWy5D45.png')

// Enable gravity manually (required in v3000+)
setGravity(2400)

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
            destScale = 3
            timer = time
            isBig = true
        },
    }
}

// Constants for Speed
const MOVE_SPEED = 240
const JUMP_FORCE = 900
const BIG_JUMP_FORCE = 1200
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 800


const LEVELS = [
    [
        '................................................................................',
        '................................................................................',
        '.....................==.........................................................',
        '................................................................................',
        '.........................==.....................................................',
        '................................................................................',
        '................................................................................',
        '........%....=*=%=..............................................................',
        '..............................NO................................................',
        '.........................NO...()................................-+..............',
        '.........................()...()...........^....^...............()..............',
        '==================================================================   ===========',
        '==================================================================   ===========',
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
        'N': () => [sprite('pipe-top-left-no'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }),],
        'O': () => [sprite('pipe-top-right-no'), area(), body({ isStatic: true }), anchor("bot"),
    offscreen({ hide: true }),],
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
}

scene("World1", ({ levelId, score } = { levelId:0, score : 0 }) => {

    //add level to scene
    const level = addLevel(LEVELS[0], levelConf)
    levelLabel.innerText = levelId + 1

    // Use passed score if provided, otherwise keep existing totalScore
    if (score !== undefined) {
        totalScore = score
        highscoreLabel.innerText = totalScore
    } else {
        return
    }

    //Player
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

    let canUsePipe = false

    player.onCollide("pipe", () => {
        canUsePipe = true
    })
    /** 
     * From Kaboom.js documentation:
     * Registers an event that runs once frame when 2 game objs with certain tags stops colliding.
     */
    player.onCollideEnd("pipe", () => {
        canUsePipe = false
    })

    // Single global key handler for down key to prevent duplicate postScore
    onKeyPress('down', () => {
        if (canUsePipe) {
            // play("sfx")
            canUsePipe = false // Prevent multiple uses
            go("win", { totalScore })
        }
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
    
	// player grows big onCollide with a "Mushroom" obj
	player.onCollide("mushroom", (m) => {
        destroy(m)
		// as we defined in the big() component
		player.biggify(5)
		// play("sfx")
	})
    
	player.onHeadbutt((obj) => {
        // grows mushroom if player's head bumps into an obj with "mushroom-surprise" tag
        if (obj.is("mushroom-surprise")) {
            const mushroom = level.spawn("#", obj.tilePos.sub(0, 1))
            mushroom.jump()
            destroy(obj)
            level.spawn("}", obj.tilePos.add(0,0))
            // play("sfx")
        }

        // releases coin if player's head bumps into an obj with "coin-surprise" tag
        // then changes surprise box to unboxed - from Ania Kubow
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

    // DOM buttons' events
    onUpdate(() => {
        if (touchLeft) {
            player.move(-MOVE_SPEED, 0)
        }
        if (touchRight) {
            player.move(MOVE_SPEED, 0)
        }
        if (touchJump) {
            if (player.isGrounded()) {
                player.jump(CURRENT_JUMP_FORCE)
            }
            touchJump = false // Only jump once per tap
        }
        if (touchDown && canUsePipe) {
            canUsePipe = false
            go("win", { totalScore })
        }
    })
})

scene("lose", ({ totalScore }) => {
    add([
        text(`YOU LOST.\nSCORE: ${totalScore}\nPRESS ANY KEY OR TAP THE SCREEN TO PLAY AGAIN`, {size: 32, 
        align: "center", 
        width: 400,}),
        pos(width()/2, height()/2),
        anchor("center"),
    ])
    
    // Save both level score and total score
    postScore("World 1 - Game Over", totalScore)
    
    const goToNext = async () => {
        await resetGameSession()
        window.location.href = '/game/world1/?new=true'
    }
    onKeyPress(goToNext)
    onClick(goToNext)
})

scene("win", ({ totalScore }) => {
    add([
        text(`YOU WON\nSCORE: ${totalScore}\nCONGRATS!\nPRESS ANY KEY OR TAP THE SCREEN TO CONTINUE`, {size: 32, 
        align: "center", 
        width: 400,}),
        pos(width()/2, height()/2),
        anchor("center"),
    ])
    
    postScore("World 1 - Completed", totalScore)
    

    const goToNext = () => {
        if (typeof nextLevelUrl !== "undefined" && nextLevelUrl) {
            window.location.href = nextLevelUrl
        }
    }

    onKeyPress(goToNext)
    onClick(goToNext)
})

go("World1")


// attach event listeners to DOM buttons
function bindArrowButton(el, direction) {

    const start = () => {
        if (direction === "left") touchLeft = true
        else if (direction === "right") touchRight = true
        else if (direction === "down") touchDown = true
        else if (direction === "up") touchJump = true
    }

    const stop = () => {
        if (direction === "left") touchLeft = false
        else if (direction === "right") touchRight = false
        else if (direction === "down") touchDown = false
        else if (direction === "up") touchJump = false
    }

    el.addEventListener("mousedown", start)
    el.addEventListener("mouseup", stop)
    el.addEventListener("mouseleave", stop)

    el.addEventListener("touchstart", (e) => {
        e.preventDefault()
        start()
    })

    el.addEventListener("touchend", (e) => {
        e.preventDefault()
        stop()
    })

    el.addEventListener("touchcancel", (e) => {
        e.preventDefault()
        stop()
    })
}

// Bind DOM buttons
bindArrowButton(document.getElementById("left-arrow1"), "left")
bindArrowButton(document.getElementById("right-arrow1"), "right")
bindArrowButton(document.getElementById("up-arrow1"), "up")
bindArrowButton(document.getElementById("down-arrow1"), "down")