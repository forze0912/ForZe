import kaboom from 'kaboom';
import patrol from "./patrol.js";
kaboom({
	fullscreen : true
})

loadSprite("bean", "bean.2ecb9859.png")
loadSprite("grass", "grass.276f4b80.png")
loadSprite("chest", "chest.93e35047.png")
loadSprite("ghost", "ghost.5367f5e7.png")


scene("win", () => {
	add([
		text("You Won!\rPress me to play!"),
		pos(center()),
		origin("center")
	])

	mouseDown(() => {
		go("game")
	})
})

scene("lose", () => {
	add([
		text("You Lose\rPress me to play!"),
		pos(center()),
		origin("center")
	])

	mouseDown(() => {
		go("game")
	})
})

const levels = [
	[
		"=============================",
		"=               *           =",
		"=         =                 =",
		"===========          *      =",
		"=                 *         =",
		"=             *     *       =",
		"=     =========             =",
		"=             =   *         =",
		"=             =             =",
		"=             =      *      =",
		"=             =             =",
		"=             =  *          =",
		"=             =      *      =",
		"=             =         *   =",
		"=             ===== =========",
		"=    *   *      *  #  *     =",
		"=                           =",
		"=============================",
	],
	[
		"=============================",
		"=                           =",
		"=                           =",
		"=*                          =",
		"=             *             =",
		"=*                          =",
		"=             *             =",
		"=*                          =",
		"=             *             =",
		"=*                          =",
		"=             *             =",
		"=*                          =",
		"=             =====         =",
		"=*                =         =",
		"=                 =         =",
		"=*          =  #  =         =",
		"=           =     =         =",
		"=============================",
	]
	
]
const levelConf = {
	// grid size
	width: 64,
	height: 64,

	"=": () => [
	  rect(64, 64),
	  area(),
	  solid(),
	  color(0,0,0,1),
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
  };

scene("game", ({ levelId } = { levelId: 0 }) => {

	const level = addLevel(levels[levelId ?? 0], levelConf);

	var health = 30

	const helathlabel = add([
		text(health),
		pos(20, 40),
		fixed(),
	])

	const player = add([
		sprite("bean"),
		pos(32, 0),
		area(),
		solid(),
	])

	player.action(() => {
		camPos(player.pos)
	})

	player.collides("enemy", () => {
		health = health - 1
		helathlabel.text = health
		if(health === 0) {
			go("lose")
		}
	})

	player.collides("chest", () => {
		if(levelId + 1 < levels.length) {
			go("game", {
				levelId: levelId + 1
			})
		} else {
			go("win")
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

go("game")