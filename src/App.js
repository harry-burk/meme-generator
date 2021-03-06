import './assets/scss/App.scss';
import AppHeader from './components/AppHeader.js';
import AppForm from './components/AppForm.js';

// App root
function App() {
  	return (
  	  	<div className="App">  	  		
  	  		<AppHeader/>
  	  		<AppForm/>
  	  	</div>
  	);
}

export default App;