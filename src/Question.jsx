import { useState, useEffect } from 'react'
import he from 'he'

export default function Question(props) {
	const [selectedAnswerId, setSelectedAnswerId] = useState(0)

	const answers = [
		{ answer: 'Italy' },
		{ answer: 'Portugal' },
		{ answer: 'Mexico' },
		{ answer: 'France' },
	]
	useEffect(() => {
		const a = 0
	}, [selectedAnswerId])

	const buttons = answers.map((ans) => (
		<button className="answer-btn">{ans.answer}</button>
	))

	return (
		<div>
			{/* <h2>{he.decode(props.question.question)}</h2> */}
			<h2>{he.decode(props.question.name)}</h2>
			<div className="buttons">{buttons}</div>
			<hr />
		</div>
	)
}
