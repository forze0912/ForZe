import kaboom from "kaboom";
import patrol from './patrol'
const JUMP_FORCE = 1000;
const SPEED = 900;
const FALL_DEATH = 2400;
const FLOOR_HEIGHT = 48;

kaboom({
	fullscreen: true,
	debugger: false
});


loadSprite("portal", "portal.a830cee5.png");
loadSprite("bean", "bean.2ecb9859.png")
loadSprite("ghost", "googoly.82de79a6.png")
loadSprite("spike", "spike.ab04267c.png")
loadSprite("grass", "grass.276f4b80.png")
loadSprite("coin" , "coin.9d799bbd.png")
scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		origin("center"),
		keyPress("space", () => go("game")),
		mouseClick(() => go("game"))
	])
})


const LEVELS = [
	[
		"=             $              ",
		"=             =              ",
		"=                            ",
		"=             =              ",
		"=    ^        =    <         ",
		"=============================@",
	],
	[
		"=                            ",
		"=                            ",
		"=                            ",
		"=                            ",
		"=      <  ^  <   ^  <  ^  <  ",
		"=============================@",
	],

];

scene("won", () => {
	add([
		text("You Won"),
		pos(center()),
		origin("center"),
	])

	keyPress("space", () => go("game")),
		mouseClick(() => go("game"))
})

const levelConf = {
	width: 64,
	height: 64,
	"=": () => [
		sprite("grass"),
		solid(),
		area(),
	],

	"*": () => [
		rect(32, 32),
		solid(),
		area(),
		patrol(),
		color(0, 0, 0, 1),
		"enemy"
	],
	"@": () => [
		sprite("portal"),
		area({
			scale: 0.5,
		}),
		origin("bot"),
		pos(0, -12),
		solid(),
		"portal",
	],
	"^": () => [
		sprite("spike"),
		solid(),
		area(),
		scale(2),
		"danger"
	],
	"<": () => [
		sprite("ghost"),
		solid(),
		area(),
		patrol(),
		"enemy"
	],
	"$": () => [
		sprite("coin"),
		area(),
		"coin"
	]

}



scene("game", ({
	levelId,
	coins
} = {
	levelId: 0,
	coins: 0
}) => {

	const level = addLevel(LEVELS[levelId ?? 0], levelConf);

	const player = add([
		sprite("bean"),
		pos(80, 104),
		solid(),
		body(),
		area(),
	]);

	var coinLabel = add([
		text(`${coins} coins`),
		pos(24, 24),
		fixed(),
	])

	player.collides("coin", (c) => {
		if(c.is("coin")) {
			destroy(c)
			coins = coins + 1
			coinLabel.text = `${coins} coins`
		}
	})

	player.collides("portal", () => {
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			});
		} else {
			go("won");
		}
	});

	player.collides("danger", () => {
		go("lose")
	})

	player.collides("enemy", (l) => {
		if (player.grounded()) {
			go('lose')
		} else {
			if (l.is("enemy")) {
				destroy(l)
				player.jump(JUMP_FORCE)
			}
		}
	})

	player.on("ground", (l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
			coins = coins + 1
			coinLabel.text = `${coins} coins`
		}
	})

	player.action(() => {
		camPos(player.pos);
	});

	player.action(() => {
		// center camera to player
		camPos(player.pos);
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("lose");
		}
	});

	const speed = 600
	keyDown("left", () => {
		player.move(-speed, 0)
	})

	keyDown("right", () => {
		player.move(speed, 0)
	})

	keyDown("down", () => {
		player.move(dir(90).scale(speed))
	})

	keyPress("space", () => {
		if (player.grounded()) {
			player.jump();
		}
	});

})

go('game')