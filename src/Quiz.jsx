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

		// fetch(
		// 	'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
		// )
		if (!checkResult) {
			fetch('https://api.imgflip.com/get_memes')
				.then((res) => res.json())
				.then((data) => {
					if (!ignore) {
						// setQuestions(data.results)
						// composeQuestions(data.results)
						composeQuestions(data.data.memes)
						//console.log(data)
					}
				})
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
		for (let i = 0; i < 1; i++) {
			newArr[i] = {
				...results[i],
				key: nanoid(),
				answers: answerz,
			}
		}
		console.log(newArr)
		setQuestions(newArr)
		const selectedArr = newArr.map((item) => ({
			key: item.key,
			id: 0,
		}))
		setSelectedAnswers(selectedArr)
	}

	function startNewQuiz() {
		setCheckResult(false)
	}

	function setSelected(key, selectedAnswerId) {
		console.log(key + ' ' + selectedAnswerId)
	}

	const questionElements = questions.map((question) => (
		<Question
			key={question.key}
			question={question}
			answers={question.answers}
			setSelected={(id) => setSelected(question.key, id)}
		/>
	))

	return (
		<div className="quiz--container">
			<div className="quiz--inner-container">
				<div className="quiz--questions">{questionElements}</div>
				<div className="quiz--footer">
					{checkResult ? (
						<div className="score-container">
							<h3>You scored 3/5 correct answers</h3>
							<button
								className="blue-btn footer-btn"
								onClick={startNewQuiz}
							>
								Play again
							</button>
						</div>
					) : (
						<button
							className="blue-btn footer-btn"
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
