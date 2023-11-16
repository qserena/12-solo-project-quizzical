export default function QuizButton(props) {
	const styles = props.evaluateAnswers
		? {
				backgroundColor: 'orange',
				border: 'none',
		  }
		: {
				backgroundColor: props.isSelected ? '#D6DBF5' : '#f5f7fb',
				border: props.isSelected ? 'none' : '0.05em solid #4d5b9e',
		  }
	return (
		<button
			className="answer-btn"
			style={styles}
			onClick={props.handleClick}
			// id={`btn-${props.question.key}-${ans.id}`}
			// onClick={() => toggleSelected(ans.id)}
		>
			{props.answer}
		</button>
	)
}
