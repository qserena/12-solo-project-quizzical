import { useState, useEffect } from 'react'
import he from 'he'
import QuizButton from './QuizButton'

export default function Question(props) {
	const [selectedAnswerId, setSelectedAnswerId] = useState(0)
	const [selectedStates, setSelectedStates] = useState([])

	// useEffect(() => {
	// 	const btn = document.getElementById(
	// 		`btn-${props.question.key}-${selectedAnswerId}`
	// 	)
	// 	console.log(btn)
	// 	const styles = {
	// 		backgroundColor: '#D6DBF5',
	// 		border: 'none',
	// 	}
	// 	if (btn) {
	// 		btn.style = styles
	// 		btn.classList.add('selected')
	// 	}
	// }, [selectedAnswerId])

	useEffect(() => {
		const btn = document.getElementById(
			`btn-${props.question.key}-${selectedAnswerId}`
		)
		console.log(btn)
		// const styles = {
		// 	backgroundColor: '#D6DBF5',
		// 	border: 'none',
		// }
		// if (btn) {
		// 	btn.style = styles
		// 	btn.classList.add('btn-selected')
		// }
	}, [selectedAnswerId])

	function toggleSelected(id) {
		console.log('id = ' + id)
		setSelectedAnswerId(id)
		props.setSelected(id)
		// const btn = document.getElementById(
		// 	`btn-${props.question.key}-${selectedAnswerId}`
		// )
		// console.log(btn)
		// const styles = {
		// 	backgroundColor: '#D6DBF5',
		// 	border: 'none',
		// }
		// if (btn) {
		// 	btn.style = styles
		// 	btn.classList.add('selected')
		// }
	}

	function handleClick(id) {
		console.log('id = ' + id)
		setSelectedAnswerId(id)
		props.setSelected(id)
		// const btn = document.getElementById(
		// 	`btn-${props.question.key}-${selectedAnswerId}`
		// )
		// console.log(btn)
		// const styles = {
		// 	backgroundColor: '#D6DBF5',
		// 	border: 'none',
		// }
		// if (btn) {
		// 	btn.style = styles
		// 	btn.classList.add('selected')
		// }
	}

	console.log(props.answers)

	const buttons = props.answers.map((ans) => (
		// <button
		// 	key={ans.id}
		// 	className={
		// 		ans.id === selectedAnswerId
		// 			? 'answer-btn btn-selected'
		// 			: 'answer-btn'
		// 	}
		// 	style={{ backgroundColor: '#D6DBF5', border: 'none' }}
		// 	id={`btn-${props.question.key}-${ans.id}`}
		// 	onClick={() => toggleSelected(ans.id)}
		// >
		// 	{ans.answer}
		// </button>
		<QuizButton
			answer={ans.answer}
			isSelected={ans.id === selectedAnswerId}
			handleClick={() => handleClick(ans.id)}
		/>
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
