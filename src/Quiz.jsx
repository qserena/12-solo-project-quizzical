import { useState, useEffect } from 'react'

export default function Quiz() {
	const [checkResult, setCheckResult] = useState(false)

	useEffect(() => {
		let ignore = false

		fetch(
			'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
		)
			.then((res) => res.json())
			.then((data) => {
				if (!ignore) {
					console.log(data)
				}
			})

		return () => {
			ignore = true
		}
	}, [])

	function startNewQuiz() {
		setCheckResult(false)
	}
	return (
		<div className="quiz--container">
			<div className="quiz--questions">
				<p>Questions here</p>
			</div>
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
	)
}
