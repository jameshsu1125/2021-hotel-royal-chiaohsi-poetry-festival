module.exports = {
	Loader: {
		index: 0,
		max: 173,
		add() {
			this.index++;

			if (this.index == this.max) {
				this.end();
			} else if (this.index > this.max) {
				console.log(this.index, this.max);
			}
			return (this.index / this.max) * 100;
		},
		end() {
			console.log('end');
		},
	},
	Sensor_g: 20,
};
