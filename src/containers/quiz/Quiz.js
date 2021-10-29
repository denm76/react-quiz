import React , {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component{
    state = {
        results:{},
        isFinished:false,
        activeQuestion:0,
        answerState: null,
        quiz:[
            {
                question:'Какого цвета небо',
                rightAnswerId:2,
                id:1,
                answers:[
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4},
                ]

            },
            {
                question:'В каком году основали Мариуполь?',
                rightAnswerId:4,
                id:2,
                answers:[
                    {text: '1809', id: 1},
                    {text: '1797', id: 2},
                    {text: '1789', id: 3},
                    {text: '1778', id: 4},
                ]

            }
        ]
    }

    onAnswerClickHandler = (answerId) =>{
        //Избежание повторного нажатия на правильный ответ для перехода на вопрос вперед
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success'){
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]; //определяем текущий вопрос
        const results = this.state.results;//Сохраняем значение state.results

        //Если ответ правильный, переключаем на следующий вопрос
        if(question.rightAnswerId === answerId ){
                if (!results[question.id]) {
                    results[question.id] = 'success'
                }

                this.setState({
                    answerState:{[answerId]:'success'},
                    results
                })

                const timeout = window.setTimeout(()=>{
                    //Если опрос закончен
                    if(this.isQuizFinished()){
                        this.setState({
                            isFinished: true
                        })
                    }else{
                        this.setState({
                            activeQuestion:this.state.activeQuestion + 1,
                            answerState:null
                        })
                    }
                },2000)
            }else{
                results[question.id] = 'error'
                this.setState({
                    answerState:{[answerId]:'error'},
                    results //results=results
                })
            }
    }

    retryHandler = () =>{
        this.setState({
            results:{},
            isFinished:false,
            activeQuestion:0,
            answerState: null,
        })
    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return(
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry = {this.retryHandler}
                            />
                           : <ActiveQuiz
                                question = {this.state.quiz[this.state.activeQuestion].question}
                                answers = {this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength = {this.state.quiz.length}
                                answerNumber = {this.state.activeQuestion + 1}
                                state = {this.state.answerState}
                            />
                    }

                </div>
            </div>
        );
    }
}

export default Quiz