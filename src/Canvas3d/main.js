const Scene = require('./scene');
const Camera = require('./camera');
const Renderer = require('./renderer');
const Render = require('./render');
const Particles = require('./particles');

module.exports = function () {
	let img = require('./img/mat.png');
	Particles.init(Scene, img);
	Render.init(Scene, Camera, Renderer, Particles);

	this.render = Render;
	this.particles = Particles;

	this.init = (img) => {
		Particles.addImg(img);
	};

	this.fadeIn = () => {
		Particles.fadeIn();
	};

	return this;
};
