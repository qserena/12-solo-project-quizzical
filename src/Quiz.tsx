import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Question from './Question'

export default function Quiz() {
    const [checkResultView, setCheckResultView] = useState(false)
    const [questions, setQuestions] = useState<QuestionItem[]>([])
    const [score, setScore] = useState(0)
    const [fullScore, setFullScore] = useState(false)

    type QuestionItem = {
        key: string
        question: string
        correct_answer: string
        incorrect_answers: string[]
        result: boolean
    }

    useEffect(() => {
        let ignore = false

        if (!checkResultView && !ignore) {
            ignore = true
            setScore(0)
            fetch(
                'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
            )
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.results)
                    composeQuestions(data.results)
                })
                .catch((err) => console.log(err))
        }

        return () => {
            ignore = true
        }
    }, [checkResultView])

    useEffect(() => {
        if (score > 2 && score === questions.length) {
            setFullScore(true)
        } else {
            setFullScore(false)
        }
    }, [score])

    function composeQuestions(results: QuestionItem[]) {
        if (!results?.length) {
            return
        }

        let newArr: QuestionItem[] = []

        for (let i = 0; i < results.length; i++) {
            newArr[i] = {
                ...results[i],
                key: nanoid(),
                result: false,
            }
        }

        setQuestions(newArr)
    }

    function evaluateAnswers() {
        setCheckResultView(true)
        let sum = 0
        for (let q of questions) {
            if (q.result) {
                sum++
            }
        }
        setScore(sum)
    }

    function startNewQuiz() {
        setCheckResultView(false)
    }

    function setResult(key: string, result: boolean) {
        questions.forEach((q) => {
            if (q.key === key) {
                q.result = result
            }
        })
    }

    const questionElements = questions.map((questionItem) => (
        <Question
            key={questionItem.key}
            question={questionItem}
            setQuestionResult={(result) => setResult(questionItem.key, result)}
            evaluateAnswers={checkResultView}
        />
    ))

    return (
        <div className="quiz--container">
            {fullScore && <Confetti />}
            <div className="quiz--inner-container">
                <div className="quiz--questions">{questionElements}</div>
                <div className="quiz--footer">
                    {checkResultView ? (
                        <>
                            <h3>
                                You scored {score}/{questions.length} correct
                                answers
                            </h3>
                            <button
                                className="blue-btn footer-btn"
                                onClick={startNewQuiz}
                            >
                                Play again
                            </button>
                        </>
                    ) : (
                        <button
                            className="blue-btn footer-btn"
                            id="check-answers-btn"
                            onClick={evaluateAnswers}
                        >
                            Check answers
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
