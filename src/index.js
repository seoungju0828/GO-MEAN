import React from 'react';
import ReactDOM from 'react-dom/client';

// 홈화면 렌더링
import Home from './Pages/Home.js';

// 고민작성 화면 렌더링
// import Write from './Pages/Write.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Home />
    	{/* <Write /> */}
  	</React.StrictMode>
);