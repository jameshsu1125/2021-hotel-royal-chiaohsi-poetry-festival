import React from 'react';
import './main.less';

import Background from './background';
import Loading from './../Loading/main';
import Menu from './../Component/menu/main';
import Home from './../Home/main';
import Poetry from './../Poetry/main';
import { TouchEvent, LocalStorage } from 'lesca';

export default class main extends React.Component {
	constructor(props) {
		super(props);

		this.state = { home: false, loading: true, poetry: false };
		//this.state = { home: false, loading: false, poetry: true };

		TouchEvent.init();
		if (LocalStorage.get('data') == null || LocalStorage.get('data') == undefined) {
			let dat = [];
			for (let i = 0; i < 12; i++) {
				dat.push({
					index: i,
					readed: false,
				});
			}
			LocalStorage.set('data', JSON.stringify(dat));
			this.data = dat;
		} else {
			this.data = JSON.parse(LocalStorage.get('data'));
		}

		//? get un-read poetry index
		let unread = this.data.filter((i) => !i.readed);
		this.unread_index = 0; //unread[Math.floor(Math.random() * unread.length)].index;
	}

	home_distory() {
		this.setState({ home: false });
	}

	home_enter() {
		this.setState({ poetry: true }, () => {
			this.refs.poetry.in();
		});
	}

	componentDidMount() {
		if (this.state.poetry) this.refs.poetry.in();
	}

	append_home() {
		if (this.state.home) return <Home ref='home' update={this.loading_update.bind(this)} distory={this.home_distory.bind(this)} enter={this.home_enter.bind(this)} />;
	}

	loading_update() {
		this.refs.loading.update();
	}

	loading_ready() {
		this.setState({ home: true, menu: true, poetry: true });
	}

	loading_finished() {
		this.refs.home.in();
		this.refs.menu.in();
		this.setState({ loading: false, poetry: false });
	}

	append_loading() {
		if (this.state.loading) return <Loading ref='loading' ready={this.loading_ready.bind(this)} finished={this.loading_finished.bind(this)} />;
	}

	append_menu() {
		if (this.state.menu) return <Menu ref='menu' update={this.loading_update.bind(this)} />;
	}

	append_poetry() {
		if (this.state.poetry) {
			return <Poetry ref='poetry' index={this.unread_index} />;
		}
	}

	render() {
		return (
			<div id='index'>
				<Background />
				{this.append_poetry()}
				{this.append_home()}
				{this.append_menu()}
				{this.append_loading()}
			</div>
		);
	}
}
