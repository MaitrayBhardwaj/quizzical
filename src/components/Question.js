import { useState, useEffect } from 'react'
import { decode } from 'html-entities'

function Question (props) {
	const randomiseChoices = () => {
		const newChoices = props.choices.map((choice, id) => ({
			option: choice,
			isCorrect: id === props.choices.length - 1 ? true : false,
		}))
		const ans = newChoices.pop()
		const pos = Math.floor(Math.random() * newChoices.length)
		newChoices.splice(pos, 0, ans)
		return newChoices
	}

	const [choices, setChoices] = useState(() => randomiseChoices())
	const [selected, setSelected] = useState(-1)

	useEffect(() => {
		setChoices(randomiseChoices())
		setSelected(-1)
	}, [props.choices])
	
	const toggleSelected = (id) => {
		setSelected(id)
		if(choices[id].isCorrect){
			props.toggleCorrect(true)
		}
		else{
			props.toggleCorrect()
		}
	}

	const choiceElements = choices.map((choice, idx) => {
		const classString = []
		if(props.isCompleted){
			if(choice.isCorrect){
				classString.push('correctChoice')
			}
			else{
				if(selected === idx){
					classString.push('wrongChoice')
				}
				else{
					classString.push('unselectedChoice')
				}
			}
		}
		else{
			if(idx === selected){
				classString.push('selectedChoice')
			}
		}
		return <div 
			className={`choice ${classString.join(" ")}`} 
			onClick={props.isCompleted ? () => {} : () => toggleSelected(idx)}
			key={idx}>
				{decode(choice.option)}
		</div>
	})

	return (
		<div className="question">
			<h2 className="question-text">{decode(props.quesText)}</h2>
			<div className="choices">
				{choiceElements}
			</div>
		</div>
	)
}

export default Question