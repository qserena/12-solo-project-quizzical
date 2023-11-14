import { useState } from 'react'
import Quiz from './Quiz'

function App() {
	const [showQuiz, setShowQuiz] = useState(false)
	function playAgain() {
		setShowQuiz(false)
	}

	return (
		<main>
			{showQuiz ? (
				<Quiz />
			) : (
				<div className="start-screen">
					<h1>Quizzical</h1>
					<button
						className="start-btn"
						onClick={() => setShowQuiz(true)}
					>
						Start quiz
					</button>
				</div>
			)}
		</main>
	)
}

export default App
