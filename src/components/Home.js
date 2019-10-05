import React from 'react';

import Latest from './Latest';
import LastView from './LastView';
import '../styles/Home.css';

const Home = () => (
	<div className="homeContainer">
		<div />
		<div>
			<Latest />
			<LastView />
		</div>
		<div />
	</div>
);

export default Home;
