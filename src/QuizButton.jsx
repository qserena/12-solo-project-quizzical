export default function QuizButton(props) {
	// if evaluate
	//     if correctAnswer
	//         style = green
	//      else if selected
	//          style = red
	//       else
	//          style = gray
	//  else
	//          style = normal

	let styles = ''
	if (props.evaluateAnswers) {
		if (props.isCorrectAnswer) {
			styles = {
				backgroundColor: 'green',
			}
		} else if (props.isSelected) {
			styles = {
				backgroundColor: 'red',
			}
		} else {
			styles = {
				backgroundColor: 'gray',
			}
		}
	} else {
		styles = {
			backgroundColor: props.isSelected ? '#D6DBF5' : '#f5f7fb',
			border: props.isSelected ? 'none' : '0.05em solid #4d5b9e',
		}
	}

	return (
		<button
			className="answer-btn"
			style={styles}
			onClick={props.handleClick}
		>
			{props.answer}
		</button>
	)
}
