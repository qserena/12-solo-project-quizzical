import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Question from './Question'

export default function Quiz() {
	const [checkResultView, setCheckResultView] = useState(false)
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [fullScore, setFullScore] = useState(false)

	useEffect(() => {
		let ignore = false

		if (!checkResultView && !ignore) {
			ignore = true
			setScore(0)
			fetch(
				'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
			)
				.then((response) => response.json())
				.then((data) => {
					composeQuestions(data.results)
				})
		}

		return () => {
			ignore = true
		}
	}, [checkResultView])

	useEffect(() => {
		if (score > 2 && score === questions.length) {
			setFullScore(true)
		} else {
			setFullScore(false)
		}
	}, [score])

	function composeQuestions(results) {
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

	function evaluateAnswers() {
		setCheckResultView(true)
		let sum = 0
		for (let q of questions) {
			if (q.result) {
				sum++
			}
		}
		setScore(sum)
	}

	function startNewQuiz() {
		setCheckResultView(false)
	}

	function setResult(key, result) {
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
			evaluateAnswers={checkResultView}
		/>
	))

	return (
		<div className="quiz--container">
			{fullScore && <Confetti />}
			<div className="quiz--inner-container">
				<div className="quiz--questions">{questionElements}</div>
				<div className="quiz--footer">
					{checkResultView ? (
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
							onClick={evaluateAnswers}
						>
							Check answers
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
