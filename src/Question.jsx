import { useState, useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import QuizButton from './QuizButton'

export default function Question(props) {
	const [selectedAnswerKey, setSelectedAnswerKey] = useState('')
	const [answers, setAnswers] = useState([])
	const [correctAnswerKey, setCorrectAnswerKey] = useState('')

	useEffect(() => {
		console.log('Saltis!')
		const answerArray = props.question.incorrect_answers.map((ans) => ({
			key: nanoid(),
			answer: ans,
		}))
		const correctAnswer = {
			key: nanoid(),
			answer: props.question.correct_answer,
		}

		setCorrectAnswerKey(correctAnswer.key)
		answerArray.push(correctAnswer)
		setAnswers(answerArray)
	}, [])

	useEffect(() => {
		setResult(selectedAnswerKey === correctAnswerKey)
	}, [selectedAnswerKey])

	function setResult(result) {
		//console.log('Hej: ' + result)
		props.setResult(result)
	}

	function handleClick(key) {
		// console.log('key = ' + key)
		// console.log('selectedAnswerKey = ' + selectedAnswerKey)
		// console.log('correctAnswerKey = ' + correctAnswerKey)
		const newSelectedAnswerKey = key === selectedAnswerKey ? 0 : key
		setSelectedAnswerKey(newSelectedAnswerKey)
	}

	const buttons = answers.map((ans) => (
		<QuizButton
			key={ans.key}
			answer={he.decode(ans.answer)}
			isSelected={ans.key === selectedAnswerKey}
			handleClick={() => handleClick(ans.key)}
			evaluateAnswers={props.evaluateAnswers}
		/>
	))

	return (
		<div>
			<h2>{he.decode(props.question.question)}</h2>
			<div className="buttons">{buttons}</div>
			<hr />
		</div>
	)
}
