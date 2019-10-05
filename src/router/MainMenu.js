import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/MainMenu.css';

import { Contexts } from '../Provider/Provider';

import { FaBars, FaUserCircle } from 'react-icons/fa';

import fire from '../firebase/Firebase';

import LoginModal from '../components/LoginModal';
import SideDraw from '../components/SideDraw';
import cresulant_logo from '../assets/cresulant_logo.png';

class MainMenu extends Component {
	state = {
		user: null,
		userOptions: false
	};

	_handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.props.history.push(`/search/${e.target.value}`);
			// window.location.reload();
		}
	};

	logout = (e) => {
		fire.auth().signOut();
		window.location.reload();
	};

	render() {
		return (
			<Contexts.Consumer>
				{(context) => (
					<div id="navbar">
						<div id="navitems">
							<FaBars onClick={context.state.sidebarToggle} className="mainMenuBar" />
							<NavLink
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginLeft: '10px',
									textDecoration: 'none',
									color: 'white'
								}}
								to="/"
							>
								<img style={{ width: '40px' }} alt="logo" src={cresulant_logo} />
								<div className="navText">Cresulant</div>
							</NavLink>
						</div>
						<div id="mainsearch">
							<input
								className="searchBar"
								onChange={this.props.searchHandler}
								onKeyPress={this._handleKeyPress}
								placeholder="Search here"
								type="text"
							/>
						</div>

						{context.state.user === null ? (
							<LoginModal />
						) : (
							<div>
								<div className="signedInMenu">
									<FaUserCircle
										onClick={() => this.setState({ userOptions: !this.state.userOptions })}
									/>
									<div style={{ fontSize: '15px' }}>{`Hi, ${context.state.user.displayName}`}</div>
								</div>
								{
									<div
										className="userOptions"
										style={
											this.state.userOptions ? (
												{ position: 'absolute', right: '0' }
											) : (
												{ display: 'none' }
											)
										}
									>
										<button onClick={this.logout}>Logout</button>
									</div>
								}
							</div>
						)}
						<SideDraw />
					</div>
				)}
			</Contexts.Consumer>
		);
	}
}

export default MainMenu;
