import React from 'react';
import './touch.less';
import $ from 'jquery';

export default class touch extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.nowDate = new Date().getTime();
		this.setTop();
	}

	setTop() {
		let time = new Date().getTime() - this.nowDate,
			top = $('html, body').scrollTop(),
			go = false;
		if (top != 0) {
			$('html, body').scrollTop(0);
			go = true;
		}
		if (time < 1000 || go) setTimeout(() => this.setTop(), 2);
	}

	addTouchEvent() {
		let pxy;
		TouchEvent.add('#touch', (e) => {
			pxy = e.targetTouches[0];
		});

		this.move = (e) => {
			if (!pxy) return;
			let dy = pxy.clientY - e.targetTouches[0].clientY;
			this.props.sync(dy);

			if (dy > 200) {
				this.removeTouchEvent();
				this.props.scrollUp();
			}
		};

		this.end = (e) => {
			this.props.up();
		};

		this.refs.touch.addEventListener('touchmove', this.move, { passive: false });
		document.addEventListener('touchend', this.end);
	}

	removeTouchEvent() {
		TouchEvent.remove('.touch');
		this.refs.touch.removeEventListener('touchmove', this.move);
		document.removeEventListener('touchend', this.end);
		this.refs.touch.style.display = 'none';
	}

	show() {
		this.refs.touch.style.display = 'block';
	}

	render() {
		return <div ref='touch' id='touch'></div>;
	}
}
