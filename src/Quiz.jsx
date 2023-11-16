import { useState, useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import Question from './Question'

export default function Quiz() {
	const [checkResult, setCheckResult] = useState(false)
	const [questions, setQuestions] = useState([])
	const [selectedAnswers, setSelectedAnswers] = useState([])

	useEffect(() => {
		let ignore = false

		if (!checkResult) {
			fetch(
				'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
			)
				.then((response) => response.json())
				.then((data) => {
					if (!ignore) {
						console.log(data)
						composeQuestions(data.results)
					}
				})

			// fetch('https://api.imgflip.com/get_memes')
			// 	.then((response) => response.json())
			// 	.then((result) => {
			// 		if (!ignore) {
			// 			composeQuestions(result.data.memes)
			// 		}
			// 	})
		}

		return () => {
			ignore = true
		}
	}, [checkResult])

	function composeQuestions(results) {
		console.log(results)
		if (!results?.length) {
			return
		}
		// let newArr = []
		// const answerz = [
		// 	{ id: 1, answer: 'Italy' },
		// 	{ id: 2, answer: 'Portugal' },
		// 	{ id: 3, answer: 'Mexico' },
		// 	{ id: 4, answer: 'France' },
		// ]
		// for (let i = 0; i < 5; i++) {
		// 	newArr[i] = {
		// 		...results[i],
		// 		key: nanoid(),
		// 		answers: answerz,
		// 		result: false,
		// 	}
		// }
		// //console.log(newArr)
		// setQuestions(newArr)

		let newArr = []

		for (let i = 0; i < results.length; i++) {
			newArr[i] = {
				...results[i],
				key: nanoid(),
				result: false,
			}
		}
		//console.log(newArr)
		setQuestions(newArr)
	}

	function checkResults() {
		setCheckResult(true)
		for (let q of questions) {
			console.log(q.result)
		}
	}

	function startNewQuiz() {
		setCheckResult(false)
	}

	function setSelected(key, selectedAnswerId) {
		console.log(key + ' ' + selectedAnswerId)
	}

	function setResult(id, result) {
		//console.log('id: ' + id + ' result: ' + result)
	}

	const questionElements = questions.map((question) => (
		// <Question
		// 	key={question.key}
		// 	question={question}
		// 	answers={question.answers}
		// 	result={question.result}
		// 	setResult={(result) => setResult(question.id, result)}
		// />

		<Question
			key={question.key}
			question={question}
			setResult={(result) => setResult(question.id, result)}
			evaluateAnswers={checkResult}
		/>
	))

	return (
		<div className="quiz--container">
			<div className="quiz--inner-container">
				<div className="quiz--questions">{questionElements}</div>
				<div className="quiz--footer">
					{checkResult ? (
						<>
							<h3>You scored 3/5 correct answers</h3>
							<button
								className="blue-btn footer-btn"
								onClick={startNewQuiz}
							>
								Play again
							</button>
						</>
					) : (
						<button
							className="blue-btn footer-btn"
							id="check-answers-btn"
							onClick={checkResults}
						>
							Check answers
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
