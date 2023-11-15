import { useState, useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import Question from './Question'

export default function Quiz() {
	const [checkResult, setCheckResult] = useState(false)
	const [questions, setQuestions] = useState([])

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
		for (let i = 0; i < 5; i++) {
			newArr[i] = {
				...results[i],
				key: nanoid(),
			}
		}
		console.log(newArr)
		setQuestions(newArr)
	}

	function startNewQuiz() {
		setCheckResult(false)
	}

	const questionElements = questions.map((question) => (
		<Question question={question} />
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
