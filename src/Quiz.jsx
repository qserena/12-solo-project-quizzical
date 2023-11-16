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
			// fetch(

			// 	'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
			// )
			fetch('https://api.imgflip.com/get_memes')
				.then((response) => response.json())
				.then((result) => {
					if (!ignore) {
						// setQuestions(data.results)
						composeQuestions(result.data.memes)
						//console.log(result.data.memes)
					}
				})
			// .then((res) => {
			// 	//console.log(res)
			// 	res.json()
			// })
			// .then((data) => {
			// 	if (!ignore) {
			// 		// setQuestions(data.results)
			// 		//composeQuestions(data.results)
			// 		console.log(data)
			// 	}
			// })
		}

		return () => {
			ignore = true
		}
	}, [checkResult])

	function composeQuestions(results) {
		let newArr = []
		const answerz = [
			{ id: 1, answer: 'Italy' },
			{ id: 2, answer: 'Portugal' },
			{ id: 3, answer: 'Mexico' },
			{ id: 4, answer: 'France' },
		]
		for (let i = 0; i < 5; i++) {
			newArr[i] = {
				...results[i],
				key: nanoid(),
				answers: answerz,
			}
		}
		console.log(newArr)
		setQuestions(newArr)
		//setQuestions(results)
		// const selectedArr = newArr.map((item) => ({
		// 	key: item.key,
		// 	id: 0,
		// }))
		// setSelectedAnswers(selectedArr)
	}

	function startNewQuiz() {
		setCheckResult(false)
	}

	function setSelected(key, selectedAnswerId) {
		console.log(key + ' ' + selectedAnswerId)
	}

	const questionElements = questions.map((question) => (
		// <Question
		// 	key={question.key}
		// 	question={question}
		// 	answers={question.answers}
		// 	setSelected={(id) => setSelected(question.key, id)}
		// 	selected={question.selectedId}
		// />
		<Question
			key={question.key}
			question={question}
			answers={question.answers}
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
							onClick={() => setCheckResult(true)}
						>
							Check answers
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
