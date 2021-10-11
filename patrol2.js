// custom component controlling enemy patrol movement
export default function patrol(speed = 100 * 4, dir2 = 1, wasd = 60) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, side) => {
				if (side === "left" || side === "right") {
					speed = -speed;
				}
			});
            this.on("collide", (obj, side) => {
				if (side === "up" || side === "down") {
					speed = -speed;
				}
			});
		},
		update() {
			this.move(dir(1).scale(speed));
		},
	};
}