import { useState } from 'react'

export default function Quiz(props) {
	const [checkResult, setCheckResult] = useState(false)
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
