import he from 'he'

export default function Question(props) {
	return (
		<div>
			{/* <h2>{he.decode(props.question.question)}</h2> */}
			<h2>{he.decode(props.question.name)}</h2>
			<hr />
		</div>
	)
}
