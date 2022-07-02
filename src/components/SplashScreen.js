function SplashScreen(props) {
	return (
		<div className="splash-screen">
			<h1 className="title">Quizzical</h1>
			<p className="desc">Click on the button below to start the quiz.</p>
			<button className="btn" onClick={props.startQuiz}>Start Quiz</button>
		</div>
	)
}

export default SplashScreen