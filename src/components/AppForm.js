import {useState, useEffect} from 'react'

function AppForm() {	
	// We initialise the 'meme' state with blank values
	const [meme, setMeme] = useState({
		topText: '',
		bottomText: '',
		randomImage: '',		
	})	

	// We setup the newImage function, which runs when the button is clicked (and when allMemes is changed, which only happens once — as an initial side-effect)
	function newImage () {
		setMeme(prevMeme => {
			return {				
				...prevMeme, // We spread in the previous values for the text
				randomImage: allMemes.length && allMemes[ Math.floor(Math.random() * allMemes.length) ].url // and use some maths to select a random image from the allMemes array
			}
		})
	}

	// This function is triggered when text changes are made, and updates the value of the corresponding H2 with the value of the input field being changed
	function handleChange (e) {
		const {name, value} = e.target // we destructure the event.target object beforehand, for ease of use

		setMeme(prevMeme => ({
			...prevMeme, 
			[name]: value // variables must be written as computed properties when used as the key
		}))
	}

	// Now we setup the 'allMemes' state, which will house the array of images gained from the API
	// As these are controlled by the API (outside React), it is a side effect, so we must use useEffect()
	const [allMemes, setAllMemes] = useState([])
	useEffect(() => {
		fetch('https://api.imgflip.com/get_memes') // we fetch the page response from the api
			.then(res => res.json()) // we resolve the response into JSON format
			.then(data => setAllMemes(data.data.memes)) // we set allMemes to the relevant array from the API, using the new 'data' variable to drill down and only take what we need
	}, [])

	// Finally, we must use one more side-effect to trigger newImage at the very end of the process. This ensures allMemes contains data, which allows us to render the first random image
	useEffect(() => {
		if (allMemes.length) { // this is triggered a few times as the page loads, some before allMemes is populated, therefore we avoid errors by only triggering newImage when the component has allMemes data
			newImage()
		}
	}, [allMemes]) // we only want to use this effect if allMemes changes, which only happens once, when it's set in the effect above

  	return (
  	  	<div className="app-form py-2">
  	  		<div className="container">
  	  			<div className="row">
  	  				<div className="col-3 offset-3">
  	  					<input name="topText" type="text" placeholder="Upper Text" onChange={handleChange} value={meme.topText} />
  	  				</div>
  	  				<div className="col-3">
  	  					<input name="bottomText" type="text" placeholder="Lower Text" onChange={handleChange} value={meme.bottomText} />
  	  				</div>
  	  				<div className="col-6 offset-3">
  	  					<button className="mb-3 mt-1" onClick={newImage}>Get a new meme image</button>
  	  				</div>
  	  			</div>
  	  			<div className="row">
  	  				<div className="col-6 offset-3">
  	  					<div className="meme">
			                <img src={meme.randomImage} className="meme--image" />
			                <h2 className="meme--text top">{meme.topText}</h2>
			                <h2 className="meme--text bottom">{meme.bottomText}</h2>
			            </div>  	  					
  	  				</div>
  	  			</div>
  	  		</div>
  	  	</div>
  	);
}

export default AppForm;