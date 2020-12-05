var THREE = require('three');
const glslify = require('glslify');
require('jquery-easing');
const Device = require('lesca').UserAgent;
const $ = require('jquery');
require('jquery-easing');

module.exports = {
	uniforms: {
		uTime: { value: 0.0 },
		uDepth: { value: 10.0 },
		uSize: { value: 1.0 },
		uAlpha: { value: 0.0 },
		uPy: { value: 0.0 },
		uPx: { value: 0.0 },
		uPz: { value: 700.0 },
		uRadius: { value: 30.0 },
		uSpeed: { value: 0.1 },
		uMode: { value: 0.0 },
		uMaxTime: { value: 5.0 },
	},
	deg: 0.0,
	layers: [],
	init(Scene, img) {
		this.container = new THREE.Object3D();
		const loader = new THREE.TextureLoader();
		for (let i = 0; i < 100; i++) {
			let count = 1 + Math.random() * 2;
			if (count > 2.9) count = 3 + Math.random() * 2;
			this.layers.push(count);
		}
		loader.load(img, (texture) => {
			this.texture = texture;
			this.width = texture.image.width;
			this.height = texture.image.height;
			this.uniforms.uTextureSize = { value: new THREE.Vector2(this.width, this.height) };
			this.uniforms.uTexture = { value: this.texture };
			this.addPoints(img);
		});
		Scene.add(this.container);
	},
	addImg(img) {
		const loader = new THREE.TextureLoader();
		setTimeout(() => {
			loader.load(img, (texture) => {
				this.uniforms.uTexture.value = texture;
				this.uniforms.uTextureSize.value = new THREE.Vector2(this.width, this.height);
			});
		}, 10);
	},
	fadeIn() {
		this.fade = true;
		this.object3D.material.uniforms.uTime.value = 0.0;
		let time = 5000;
		$(this.uniforms.uAlpha).animate({ value: 1.0 }, time / 2, 'swing');
		$(this.uniforms.uPz).animate({ value: 0.0 }, time, 'easeInExpo');
	},
	addPoints() {
		this.numPoints = this.width * this.height;

		let numVisible = 0,
			threshold = 34;

		const img = this.texture.image;
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;
		ctx.scale(1, -1);
		ctx.drawImage(img, 0, 0, this.width, this.height * -1);

		this.imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		let originalColors = Float32Array.from(this.imgData.data);

		for (let i = 0; i < this.numPoints; i++) {
			if (originalColors[i * 4 + 0] > threshold) numVisible++;
		}

		const material = new THREE.RawShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: glslify(require('./shaders/particle.vert').default),
			fragmentShader: glslify(require('./shaders/particle.frag').default),
			depthTest: false,
			side: THREE.DoubleSide,
			transparent: true,
		});

		var geometry = new THREE.InstancedBufferGeometry();

		const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
		positions.setXYZ(0, -0.5, 0.5, 0.0);
		positions.setXYZ(1, 0.5, 0.5, 0.0);
		positions.setXYZ(2, -0.5, -0.5, 0.0);
		positions.setXYZ(3, 0.5, -0.5, 0.0);
		geometry.setAttribute('position', positions);

		// uvs
		const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
		uvs.setXYZ(0, 0.0, 0.0);
		uvs.setXYZ(1, 1.0, 0.0);
		uvs.setXYZ(2, 0.0, 1.0);
		uvs.setXYZ(3, 1.0, 1.0);
		geometry.setAttribute('uv', uvs);
		geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

		let index = new Uint16Array(numVisible),
			offsets = new Float32Array(numVisible * 3),
			layer = new Uint16Array(numVisible),
			ran = new Uint16Array(numVisible);

		for (let i = 0, j = 0; i < this.numPoints; i++) {
			if (originalColors[i * 4 + 0] <= threshold) continue;
			offsets[j * 3 + 0] = i % this.width;
			offsets[j * 3 + 1] = Math.floor(i / this.width);
			index[j] = i;
			layer[j] = this.layers[Math.floor(Math.random() * this.layers.length)];
			ran[j] = 700 + Math.random() * 3000;
			j++;
		}

		geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(index, 1, false));
		geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
		geometry.setAttribute('layer', new THREE.InstancedBufferAttribute(layer, 1, false));
		geometry.setAttribute('ran', new THREE.InstancedBufferAttribute(ran, 1, false));

		this.object3D = new THREE.Mesh(geometry, material);
		this.container.add(this.object3D);
		this.resize();
		window.addEventListener('resize', () => this.resize());
	},
	update(delta) {
		if (this.object3D) {
			this.object3D.material.uniforms.uTime.value += delta;
			if (this.object3D.material.uniforms.uTime.value > 3 && this.fade) {
				this.fade = false;
				this.faded();
			}
		}
	},
	faded() {},
	update_uPy(v) {
		$(this.uniforms.uPy).clearQueue();
		$(this.uniforms.uPy).stop();
		this.object3D.material.uniforms.uPy.value = v;
	},
	tween_uPy(v = 0.0, easing = 'easeOutExpo', time = 1000) {
		$(this.uniforms.uPy).clearQueue();
		$(this.uniforms.uPy).stop();
		$(this.uniforms.uPy).animate({ value: v }, time, easing);
	},
	resize() {
		if (!this.object3D) return;
		let r;
		if (Device.get() == 'desktop') r = 0.00095;
		else r = 0.0006;
		const s = window.innerHeight * r;
		this.object3D.scale.set(s, s, s);
	},
	updateImageData(img) {
		const loader = new THREE.TextureLoader();
		loader.load(img, (texture) => {
			this.uniforms.uTexture.value = texture;
			this.uniforms.uTextureSize.value = new THREE.Vector2(this.width, this.height);
		});
	},
};
