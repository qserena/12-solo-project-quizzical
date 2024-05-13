export default function QuizButton(props) {
    let styles = ''
    if (props.evaluateAnswers) {
        if (props.isCorrectAnswer) {
            styles = {
                backgroundColor: '#94D7A2', // green
                border: 'none',
            }
        } else if (props.isSelected) {
            styles = {
                backgroundColor: '#F8BCBC', // red
                border: 'none',
            }
        } else {
            styles = {
                opacity: '0.5',
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
