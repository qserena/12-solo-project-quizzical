import { useState, useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import QuizButton from './QuizButton'

type QuestionProps = {
    question: {
        key: string
        question: string
        correct_answer: string
        incorrect_answers: string[]
    }
    evaluateAnswers: boolean
    setQuestionResult: (result: boolean) => void
}

type AnswerType = {
    key: string
    answer: string
}

export default function Question({
    key,
    question,
    evaluateAnswers,
    setQuestionResult,
}: QuestionProps) {
    const [selectedAnswerKey, setSelectedAnswerKey] = useState('')
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [correctAnswerKey, setCorrectAnswerKey] = useState('')

    useEffect(() => {
        const answerArray: AnswerType[] = question.incorrect_answers.map(
            (ans) => ({
                key: nanoid(),
                answer: ans,
            })
        )
        const correctAnswer: AnswerType = {
            key: nanoid(),
            answer: question.correct_answer,
        }
        setCorrectAnswerKey(correctAnswer.key)

        // Insert correctAnswer at random position
        const numberOfAnswers = answerArray.length + 1
        const randomIndex = Math.floor(numberOfAnswers * Math.random())
        answerArray.splice(randomIndex, 0, correctAnswer)
        setAnswers(answerArray)
    }, [])

    useEffect(() => {
        const result: boolean = Boolean(
            selectedAnswerKey && selectedAnswerKey === correctAnswerKey
        )
        setResult(result)
    }, [selectedAnswerKey])

    function setResult(result: boolean) {
        setQuestionResult(result)
    }

    function handleClick(key: string): void {
        const newSelectedAnswerKey = key === selectedAnswerKey ? '0' : key
        setSelectedAnswerKey(newSelectedAnswerKey)
    }

    const buttons = answers.map((ans) => (
        <QuizButton
            key={ans.key}
            answer={he.decode(ans.answer)}
            isSelected={ans.key === selectedAnswerKey}
            isCorrectAnswer={ans.key === correctAnswerKey}
            handleClick={() => handleClick(ans.key)}
            evaluateAnswers={evaluateAnswers}
        />
    ))

    return (
        <div>
            <h2>{he.decode(question.question)}</h2>
            <div className="buttons">{buttons}</div>
            <hr />
        </div>
    )
}
