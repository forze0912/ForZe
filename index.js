import kaboom from 'kaboom';
import patrol from "./patrol";

kaboom({
	fullscreen: true
})

loadSprite("bean", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/bean.png")
loadSprite("chest", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/chest.png")
loadSprite("ghost", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/ghost.png")
loadSprite("potion", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/potion.png")
loadSprite("invisPot", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/a%20nice%20potion.png")

const levels = [
	[
		"=============================",
		"=       !      *            =",
		"=         ====              =",
		"===========     !    *      =",
		"=                 *         =",
		"=             *     *       =",
		"=     =========             =",
		"=             =   *     !   =",
		"=             =             =",
		"=      !      =      *      =",
		"=             =             =",
		"=       ==    =  *          =",
		"=========     =      *      =",
		"=             =         *   =",
		"=             ====   ========",
		"=    *   *      *  #  *     =",
		"=         !  !              =",
		"=============================",
	],
	[
		"=============================",
		"=          !                =",
		"=                           =",
		"=*                          =",
		"=    ====     *             =",
		"=*      =                !  =",
		"=  !!!  =     *             =",
		"=*      =                   =",
		"=========     *   ======    =",
		"=*                = *       =",
		"=             *   =         =",
		"=*                =  !!!  * =",
		"============      =         =",
		"=*         ===  === *       =",
		"=                 ===========",
		"=*          =  #       !    =",
		"=           =               =",
		"=============================",
	],

	[
		"=============================",
		"=                   *  *    =",
		"=      !      =             =",
		"===============             =",
		"=       @     *          !  =",
		"=======================     =",
		"=                           =",
		"=     !                     =",
		"=         *    ==============",
		"=   @  =             @  *   =",
		"=      =      *             =",
		"=      =       =========    =",
		"========       =            =",
		"=   *          =            =",
		"=      =========            =",
		"=   !  =      #             =",
		"=   *  =                    =",
		"=============================",
	],

	[
		"=============================",
		"=     !     *               =",
		"=      *          @         =",
		"=====================       =",
		"=                        !  =",
		"=       @   *   !   *       =",
		"=                           =",
		"=              !            =",
		"=     !               =     =",
		"=         *           =======",
		"=     *          @      *   =",
		"=             *             =",
		"=     !        =========    =",
		"========  @    =            =",
		"=   *          =  *         =",
		"=      =========      *     =",
		"=   !  =      #  *          =",
		"=   *  =   * *     *   *    =",
		"=============================",
	],
	[
		"=============================",
		"=     !     *         *     =",
		"=      *                    =",
		"=                            =",
		"=                        !  =",
		"=    !      *   !   *       =",
		"=                           =",
		"=    *         !            =",
		"=                     =     =",
		"=      *   @          =======",
		"=                       *   =",
		"=           *    ============",
		"=     !                     =",
		"======                *     =",
		"= ***  ===========          =",
		"= ***                       =",
		"= *#*    ! *      *    *    =",
		"=      = *      *    *      =",
		"=============================",
	]

]

const levelConf = {

	width: 64,
	height: 64,

	"=": () => [
		rect(64, 64),
		area(),
		solid(),
		color(0, 0, 0, 1),
		origin("bot"),
	],
	"*": () => [
		sprite("ghost"),
		area(),
		solid(),
		scale(0.5),
		patrol(),
		"enemy",
	],

	"#": () => [
		sprite("chest"),
		area(),
		solid(),
		scale(0.4),
		"chest",
	],

	"!": () => [
		sprite("potion"),
		area(),
		solid(),
		scale(0.1),
		"potion"
	],
	"@": () => [
		sprite("invisPot"),
		area(),
		scale(0.2),
		solid(),
		"invis"
	]
};

scene("game", ({
	levelId,
	healths,
	potionsss,
	thing,
	scores,
} = {
	levelId: 0,
	healths: 30,
	potionsss: 0,
	thing: 1,
	scores: 0
}) => {

	addLevel(levels[levelId ?? 0], levelConf);

	let score = scores;



	var health = healths

	const helathlabel = add([
		text(health),
		pos(20, 40),
		fixed(),
	])

	const things = add([
		text(`Level ${thing}`),
		pos(1300, 40),
		fixed(),
	])

	const player = add([
		sprite("bean"),
		pos(32, 0),
		area(),
		color(),
		solid(),
	])

	player.action(() => {
		camPos(player.pos)
	})

	const timer = add([
		text(score),
		origin("center"),
		pos(1000, 800),
		fixed(),
	])	

	action(() => {
		score++;
		timer.text = score;
	})



	var checker = 1
	player.collides("invis", (p) => {
		if (p.is("invis")) {
			destroy(p)
			checker = 2
			const hehe = add([
				text("You are now invisible and cant take damage"),
				pos(100, 800),
				scale(0.7),
				fixed()
			])
			setTimeout(() => {
				checker = 1
				destroy(hehe)
			}, 5000)
		}
	})

	player.collides("enemy", () => {
		if (checker === 2) return;
		health = health - 1
		shake()
		helathlabel.text = health
		if (health < 0) {
			go("lose", score)
		}
	})

	var explosion = potionsss

	var potionss = add([
		text(explosion),
		fixed(),
		pos(1000, 40)
	])

	player.collides("potion", (p) => {
		if (p.is("potion")) {
			destroy(p)
			explosion = explosion + 1
			potionss.text = explosion
		}
	})

	keyPress("space", () => {
		if (explosion > 0) {
			const explosions = add([
				rect(400, 400),
				area(),
				pos(player.pos),
				origin("center"),
				color(255, 255, 255),

			])

			burp()

			explosions.collides("enemy", (w) => {
				if (w.is("enemy")) {
					destroy(w)
					health = health + 0.5
					helathlabel.text = health
					shake()
				}
			})

			setTimeout(() => {
				destroy(explosions)
			}, 1000)
			shake()
			explosion = explosion - 1
			health = health - 3
			potionss.text = explosion
			helathlabel.text = health
			if (health < 0) {
				if (checker === 2) return;
				destroy(player)
				go("lose", score)
			}
			console.log(explosion)
		}

	})

	var levelsss = Math.floor(Math.random() * 2) + 1


	player.collides("chest", () => {
		if(thing === 10) {
			go("win", score)
		} else {
			if (levelId + 1 < levels.length) {
			go("game", {
				levelId: levelId + 1,
				healths: 30,
				potionsss: explosion,
				thing: thing + 1,
				scores: score
			})
		} else {
			go("game", {
				levelId: levelsss,
				healths: 30,
				potionsss: explosion,
				thing: thing + 1,
				scores: score
			})
		}
	}
		
})

	var speed = 1000

	keyDown("w" || "up", () => {
		player.move(dir(90).scale(-speed))
	})

	keyDown("s" || "down", () => {
		player.move(dir(90).scale(speed))
	})

	keyDown("a" || "up", () => {
		player.move(-speed, 0)
	})

	keyDown("d" || "down", () => {
		player.move(speed, 0)
	})
})

scene("settings", () => {
	add([
		text("Use wasd to move. Press me again! :>"),
		pos(center()),
		origin('center')
	])

	keyDown(() => {
		go('settings2')
	})
	mouseClick(() => {
		go('settings2')
	})
})

scene("settings2", () => {
	var idek = 0
	var instuctions = add([
		text("Hover over potions and press space to use them. Press me again! :>"),
		scale(0.5),
		pos(center()),
		origin('center')
	])

	keyDown(() => {
		idek = idek + 1
		if(idek === 1) {
			instuctions.text = "Get to level 10!"
			instuctions.scale = 2
		} else {
			go("game")
		}
	})

	mouseClick(() => {
		idek = idek + 1
		if(idek === 1) {
			instuctions.text = "Get to level 10!"
			instuctions.scale = 2
		} else {
			go("game")
		}
	})

})

scene("win", (score) => {
	add([
		rect(8000, 80),
		color(0, 0, 0, 1),
		pos(center()),
		origin("center")
	])
	const idk = add([
		text("You Won!\rPress me to play!"),
		pos(center()),
		origin("center")
	])

	add([
		text(score),
		pos(idk.pos.x - 200, idk.pos.y + 64),
		scale(2),
	]);

	keyDown(() => {
		go('game')
	})

	mouseDown(() => {
		go("game")
	})
})

scene("menu", () => {
	add([
		rect(8000, 80),
		color(0, 0, 0, 1),
		pos(center()),
		origin("center")
	])
	add([
		text('Press me to play!'),
		pos(center()),
		origin("center")
	])
	mouseDown(() => {
		go("settings")
	})

	keyDown(() => {
		go('settings')
	})
})

scene("lose", (score) => {
	add([
		rect(10000, 80),
		color(0, 0, 0, 1),
		pos(center()),
		origin("center")
	])

	const fun =	add([
		text("You Lose\rPress me to play!"),
		pos(center()),
		origin("center")
	])

	add([
		text(score),
		pos(fun.pos.x - 200, fun.pos.y + 64),
		scale(2),
	]);

	keyDown(() => {
		go('game')
	})

	mouseDown(() => {
		go("game")
	})
})


go("menu")