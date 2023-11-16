import { useState, useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import QuizButton from './QuizButton'

export default function Question(props) {
	const [selectedAnswerKey, setSelectedAnswerKey] = useState('')
	const [answers, setAnswers] = useState([])
	const [correctAnswerKey, setCorrectAnswerKey] = useState('')

	useEffect(() => {
		//console.log(props.question.incorrect_answers)
		const incorrectAnswers = props.question.incorrect_answers.map(
			(ans) => ({
				key: nanoid(),
				answer: ans,
			})
		)
		const correctAnswer = {
			key: nanoid(),
			answer: props.question.correct_answer,
		}
		setCorrectAnswerKey(correctAnswer.key)
		const allAnswers = incorrectAnswers.push(correctAnswer)
		setAnswers(allAnswers)
	}, [])

	useEffect(() => {
		setResult(selectedAnswerKey === correctAnswerKey)
		// const btn = document.getElementById(
		// 	`btn-${props.question.key}-${selectedAnswerId}`
		// )
		// console.log(btn)
		// const styles = {
		// 	backgroundColor: '#D6DBF5',
		// 	border: 'none',
		// }
		// if (btn) {
		// 	btn.style = styles
		// 	btn.classList.add('btn-selected')
		// }
	}, [selectedAnswerKey])

	function setResult(result) {
		//console.log('Hej: ' + result)
		props.setResult(result)
	}

	function handleClick(key) {
		//console.log('id = ' + id)
		const newSelectedAnswerId = key === selectedAnswerKey ? 0 : id
		setSelectedAnswerKey(newSelectedAnswerKey)
	}

	console.log(props.question)

	// const buttons = props.answers.map((ans) => (
	// 	<QuizButton
	// 		key={ans.id}
	// 		answer={ans.answer}
	// 		isSelected={ans.id === selectedAnswerId}
	// 		handleClick={() => handleClick(ans.id)}
	// 	/>
	// ))

	const buttons = answers.map((ans) => (
		<QuizButton
			key={ans.key}
			answer={he.decode(ans.answer)}
			isSelected={ans.key === selectedAnswerKey}
			handleClick={() => handleClick(ans.key)}
			evaluateAnswers={props.evaluateAnswers}
		/>
	))

	// return (
	// 	<div>
	// 		<h2>{he.decode(props.question.name)}</h2>
	// 		<div className="buttons">{buttons}</div>
	// 		<hr />
	// 	</div>
	// )

	return (
		<div>
			<h2>{he.decode(props.question.question)}</h2>
			<div className="buttons">{buttons}</div>
			<hr />
		</div>
	)
}
