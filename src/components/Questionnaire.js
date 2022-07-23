import { useState, useEffect } from 'react'
import axios from 'axios'
import Confetti from 'react-confetti'

import Question from './Question'
import Spinner from './Spinner'

function Questionnaire() {
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const [hasLoaded, setHasLoaded] = useState(false)

	const getQuestions = () => {
		setHasLoaded(false)
		axios.get('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
			.then(res => {
				const reqQuestions = res.data.results
				setQuestions(() => {
					return reqQuestions.map(ques => {
						return {
							quesText: ques.question,
							choices: [...ques.incorrect_answers, ques.correct_answer],
							isCorrect: false
						}
					})
				})
				setHasLoaded(true)
			})
	}

	useEffect(getQuestions, [])

	const toggleCorrect = (id, markTo) => {
		setQuestions(prevQuestions => {
			return prevQuestions.map((ques, idx) => {
				return idx === id ? {...ques, isCorrect: markTo} : ques
			})
		})
	}

	const questionElements = questions.map((question, idx) => (
		<Question 
			quesText={question.quesText} 
			choices={question.choices}
			toggleCorrect={(markTo = false) => toggleCorrect(idx, markTo)}
			key={idx}
			isCompleted={isCompleted}
		/>
	))

	const evaluateResult = () => {
		let count = 0
		questions.forEach(ques => {
			ques.isCorrect && count++
		})
		setIsCompleted(true)
		setScore(count)
	}

	const resetQuiz = async () => {
		getQuestions()
		setIsCompleted(false)
	}

	return (
		<div className="questionnaire">
			{ isCompleted && <Confetti /> }
			{
				hasLoaded ? 
				<div className="questions">
					{questionElements}
				</div> :
				<Spinner />
			}
			<div className="scoring">
				{ isCompleted && <p className="totalScore">You scored {score}/5!</p> }
				<button className="btn" onClick={isCompleted ? resetQuiz : evaluateResult}>
					{isCompleted ? "Play again" : "Check answers"}
				</button>
			</div>
		</div>
	)
}

export default Questionnaire