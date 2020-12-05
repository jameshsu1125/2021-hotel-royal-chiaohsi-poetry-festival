import React from 'react';
import './main.less';
import './article.less';

import Article from './article';
import Canvas3D from './../Canvas3d/main';

import Data from './data';

export default class poetry extends React.Component {
	constructor(props) {
		super(props);
		this.canvas3D = new Canvas3D();
		this.canvas3D.particles.faded = () => this.addTouchEvent();
	}

	removeTouchEvent() {
		TouchEvent.remove('.touch');
		this.refs.touch.removeEventListener('touchmove', this.move);
		document.removeEventListener('touchend', this.end);
		this.refs.touch.style.display = 'none';
	}

	addTouchEvent() {
		this.refs.article.add_arrow();

		let pxy;
		TouchEvent.add('.touch', (e) => {
			pxy = e.targetTouches[0];
		});

		this.move = (e) => {
			if (!pxy) return;
			let dy = pxy.clientY - e.targetTouches[0].clientY;
			this.canvas3D.particles.update_uPy(dy);

			if (dy > 300) {
				this.removeTouchEvent();
				this.canvas3D.particles.tween_uPy(5000, 'easeInOutExpo', 2000);
				this.refs.article.scrollUp();
			}
		};

		this.end = (e) => {
			this.canvas3D.particles.tween_uPy();
		};

		this.refs.touch.addEventListener('touchmove', this.move, { passive: false });
		document.addEventListener('touchend', this.end);
	}

	in() {
		this.refs.main.style.display = 'block';
		this.refs.article.in();
	}

	append_poetry() {
		return <Article ref='article' canvas={this.canvas3D} data={Data[this.props.index]} />;
	}

	render() {
		return (
			<div ref='main' id='poetry'>
				{this.append_poetry()}
				<div ref='touch' className='touch'></div>
			</div>
		);
	}
}
