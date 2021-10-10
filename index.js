import kaboom from 'kaboom';
import patrol from "./patrol";

kaboom({
	clearColor: [255,255,255]
})

loadSprite("bean", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/bean.png")
loadSprite("chest", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/chest.png")
loadSprite("ghost", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/ghost.png")
loadSprite("potion", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/potion.png")
loadSprite("invisPot", "https://raw.githubusercontent.com/forze0912/kaboom.github.io/master/sprites/a%20nice%20potion.png")
loadSprite("friend", "https://raw.githubusercontent.com/forze0912/ForZe/master/sprites/favicn.png")

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
		"=                           =",
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

const c = [

	[
		"=============================",
		"=                           =",
		"=             &             =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=             q             =",
		"=                           =",
		"=============================",
],
		[
			"=============================",
			"=                           =",
			"=             &             =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=                           =",
			"=             #             =",
			"=                           =",
			"=============================",
	],
	[
		"=============================",
		"=                           =",
		"=     !                     =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                &          =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=                           =",
		"=             !             =",
		"=                           =",
		"=                           =",
		"=             *             =",
		"=             #             =",
		"=                           =",
		"=============================",
	],
	[
		"=============================",
		"=              w            =",
		"=   ! ! ! ! !    &          =",
		"=                           =",
		"=                           =",
		"=          *                =",
		"=                    *      =",
		"=      *                    =",
		"=                           =",
		"=               *           =",
		"=                           =",
		"=        *                  =",
		"=             !             =",
		"=                           =",
		"=                           =",
		"=             *             =",
		"=             #             =",
		"=                           =",
		"=============================",
	],
	[
		"=============================",
		"=         &    !            =",
		"=        a                  =",
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
		"=       !      *      &     =",
		"=  2                        =",
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

]

const l = {
	height: 64,
	width: 64, 

	"=": () => [
		rect(64, 64),
		color(0,0,0,1),
		solid(),
		area()
	],

	"#": () => [
		sprite("chest"),
		solid(),
		area(),
		scale(0.5),
		"chest"
	],

	"q": () => [
		sprite("chest"),
		solid(),
		area(),
		scale(0.5),
		"dummy"
	],

	"!": () => [
		sprite("potion"),
		area(),
		solid(),
		scale(0.1),
		"potion"
	],

	"&": () => [
		sprite("friend"),
		area(),
		solid(),
		scale(0.5),
		"friend"
	],

	"*": () => [
		sprite("ghost"),
		area(),
		solid(),
		scale(0.5),
		patrol(),
		"enemy",
	],
	"w": () => [
		text("Oh no!"),
		area(),

	],
	"a": () => [
		text("What are we gonna do?"),
		area(),
	],
	"2": () => [
		text("I found a safe spot, just gp through all of these levels!"),
		scale(0.5)
	]
}

scene('camp', ({
	levelID,
	potions,
	health,
	helper,
} = {
	levelID: 0,
	potions: 0,
	health: 30,
	helper: 0
}) => {	

	addLevel(c[levelID ?? 0], l)

	var potion = potions

	const player = add([
		sprite("bean"),
		pos(64, 64),
		area(),
		color(),
		solid(),
	])

	var potionss = add([
		text(potion),
		fixed(),
		pos(1000, 40)
	])
	
	var healths = health

	const helathlabel = add([
		text(health),
		pos(20, 40),
		fixed(),
	])


	player.collides("friend", () => {
		const dia = add([
			text("hi"),
			pos(player.pos.x - 64, player.pos.y),
			scale(0.5),
		])	
		setTimeout(() => {
			dia.text = "there is a person going after you"
			dia.pos(player.pos.x - 128, player.pos.y)
			dia.scale(0.5)
		}, 2000)
		setTimeout(() => {
			dia.text = "you gotta run, i will guide you"
			dia.pos(player.pos.x - 128, player.pos.y)
			dia.scale(0.5)
		}, 4000)


		setTimeout(() => {
			dia.text = "When you see potions, Press Space to use potion! this can explode enemies"
			dia.pos(player.pos.x - 200, player.pos.y)
			dia.scale(0.2)
		}, 4000 + 2000)
			
		setTimeout(() => {
			dia.text = "go to the chest!"
			dia.pos(player.pos.x - 128, player.pos.y)
			dia.scale(0.5)
		}, 8000 + 2000)

			

		setTimeout(() => {
			destroy(dia)
		}, 6000 + 4000)
	})


	const speed = 1000

	player.action(() => {
		camPos(player.pos)
	})

	var e = potions

	player.collides("potion", (p) => {
		if(p.is('potion')) {
			destroy(p)
			e = e + 1
			potionss.text = e
		}
	})

	var checker2 = helper

	keyPress("space", () => {
		if(e === 0){
			return
		} else {
			const explosion = add([
			rect(500, 500),
			area(),
			pos(player.pos),
			origin('center')
		])

		if(levelID === 2) {
			console.log('hi')
		}


		explosion.collides("enemy", (h) => {
			checker2 = checker2 + 1
			if(checker2 === 1) {
				destroy(h)
				add([
					text('good job!'),
					pos(player.pos),
					origin('center')
				])
			} else {
			destroy(h)				
			}

		})

		shake()

		e = e - 1

		potionss.text = e

		burp()

		setTimeout(() => {
			destroy(explosion)
		}, 2000)
		}
		
	})

	player.collides("dummy", () => {
		add([
			rect(64, 64),
			area(),
			pos(0, 832),
			color(0,0,0,1),
			scale(29, 1),
			solid()
		])

		const betray = add([
			sprite("friend"),
			solid(),
			area(),
			pos(1215, 996),
			scale(0.5)
		])

		const hehe = add([
			text("You know that I was the one hunting u down..."),
			pos(742,betray.pos.y),
			scale(0.5),
		])		

		setTimeout(() => {
			hehe.text = "And YOU fell into my trap"
		}, 3000)

		setTimeout(() => {
			hehe.text = "so goodbye and say hello to my bounty reward!"
			destroy(player)
			shake()
		}, 3000 * 2)

	})


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

	player.collides("enemy", (l) => {
		if(l.is("enemy")) {
			healths = healths - 1
			helathlabel.text = healths
			if(healths < 1) {
				go("lose2")
			}
		}
	})

	player.collides("chest", () => {
			if (levelID + 1 < c.length) {
				go("camp", {
					levelID: levelID + 1,
					potions: e,
					health: 30,
					helper: checker2
			})
		} else {
			go("lose2")
		}
	})

})

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
		timer.text = score / 100;
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
			instuctions.text = "touch things to interact with them"
			instuctions.scale = 0.5
		} 
		if(idek === 2) {
			instuctions.text = "Get to level 10!"
			instuctions.scale = 2
		} else {
			go("game")
		}

	})

	mouseClick(() => {
		idek = idek + 1
		if(idek === 1) {
			instuctions.text = "touch things to interact with them"
			instuctions.scale = 0.5
		} 
		if(idek === 2) {
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

scene("lose2", () => {
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

	keyDown(() => {
		go('camp')
	})

	mouseDown(() => {
		go("camp")
	})
})


go("menu")