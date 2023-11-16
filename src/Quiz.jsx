import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'

export default function Quiz() {
	const [checkResult, setCheckResult] = useState(false)
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState('')

	useEffect(() => {
		let ignore = false

		if (!checkResult && !ignore) {
			ignore = true
			console.log('GO')
			fetch(
				'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					composeQuestions(data.results)
				})
		}

		return () => {
			ignore = true
		}
	}, [checkResult])

	function composeQuestions(results) {
		console.log('compose: ' + results)
		if (!results?.length) {
			return
		}

		let newArr = []

		for (let i = 0; i < results.length; i++) {
			newArr[i] = {
				...results[i],
				key: nanoid(),
				result: false,
			}
		}

		setQuestions(newArr)
	}

	function checkResults() {
		setCheckResult(true)
		let sum = 0
		for (let q of questions) {
			if (q.result) {
				sum++
			}
		}
		console.log('sum: ' + sum)
		setScore(sum)
	}

	function startNewQuiz() {
		setCheckResult(false)
	}

	function setResult(key, result) {
		console.log('key: ' + key + ' result: ' + result)
		questions.forEach((q) => {
			if (q.key === key) {
				q.result = result
			}
		})
	}

	const questionElements = questions.map((question) => (
		<Question
			key={question.key}
			question={question}
			setResult={(result) => setResult(question.key, result)}
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
							<h3>
								You scored {score}/{questions.length} correct
								answers
							</h3>
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
