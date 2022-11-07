import React, {Component,  createRef} from "react";
import ReactDOM from "react-dom";
import "./style.css";

//импортируем React, Component из react , ReactDOM из react-dom, а так же импортируем стили


// применяем классовые компоненты
class Reverse extends Component {
    // функиця возврата введеных секунд в минуты и секунды
    encoding(time) {
      let seconds = time % 60;
      let minutes = Math.floor(time / 60);
      minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
      seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
      return minutes + ':' + seconds;
    }
    render () {
      const {time} = this.props;
      return (
        <div className="display">
          <h1>{this.encoding(time)}</h1>
        </div>
      )
    }
  }
  //получаем экземпляр смортированного элемента
  class Input extends Component {
    onSubmit(event) {
      event.preventDefault();
      const strSeconds = this.refs.seconds.value;
      if(strSeconds.match(/[0-9]/)) {
        this.refs.seconds.value = '';
        this.props.onSetCountdown(parseInt(strSeconds, 10));
      }
    }
    
    //отрисовываем поле ввода
    render() {
      return (
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <h2>Введите время в секундах ↓</h2>
          <input type="text" ref="seconds" placeholder="До премьеры ленты Дедпул3 осталось"/>
          <input type="submit" value="Start"></input>
        </form>
      )
    }
  }
  
  class Button extends Component {
    render() {
      return (
          <button onClick={this.props.onClickHandler}>{this.props.label}</button>    
      );
    }
  }

  //строим функционал на классовых компонентах
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        running: false,
      }
    }

    //вызываем компонент жизненного цикла после обновления компонента
    componentDidUpdate(prevProps, prevState) {
      if(this.state.running !== prevState.running){
        switch(this.state.running) {
          case true:
            this.handleStart();
        }
      }
    }

    //функция запуска таймера
    handleStart() {
      this.timer = setInterval(() => {
        const newCount = this.state.count - 1;
        this.setState(
          {count: newCount >= 0 ? newCount : 0}
        );
      }, 1000);
    }
    // функция приостановки таймера
    handlePause() {
      if(this.timer) {
        clearInterval(this.timer);
        this.setState(
          {isActive: false}
        );
      }
    }
    //функция сброса таймера
    handleReset() {
      this.setState(
        {count: 0}
      );
    }
    
    handleCountdown(seconds) {
      this.setState({
        count: seconds,
        running: true
      })
    }
    
    //рендерим реактивный вывод времени
    render() {
      const {count} = this.state;
      return (
        <div className="container">
          <Reverse time={count}/>
          <Input onSetCountdown={this.handleCountdown.bind(this)}/>
          <Button label="Pause" onClickHandler={this.handlePause.bind(this)}/>
          <Button label="Reset" onClickHandler={this.handleReset.bind(this)}/>
        </div>
      )
    }
  }
  
  //Рендерим классовый компонент
  ReactDOM.render(<App/>, document.getElementById('root'));
