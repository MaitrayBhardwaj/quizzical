import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Questionnaire from './components/Questionnaire'

function App() {
	const [hasStarted, setHasStarted] = useState(false)

	const startQuiz = () => {
		setHasStarted(true)
	}

	return (
		<div className="app">
			{ !hasStarted ? <SplashScreen startQuiz={startQuiz} /> : <Questionnaire />}
		</div>
	)
}

export default App