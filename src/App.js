import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    win: "",
    lose: "",
    clicked: [],
  };

  handleShuffle = () => {
    let shuffledFriends = shuffle(friends);
    this.setState({ friends: shuffledFriends });
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ 
        clicked: this.state.clicked.concat(id) 
      });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      win: "",
      lose: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ 
        topScore: newScore 
      });
    }
    else if (newScore === 12) {
      this.setState({ 
        win: "You win!" 
      });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      lose: "You lost, Start Over",
      clicked: []
    });
    this.handleShuffle();
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          win={this.state.win}
          lose={this.state.lose}
        />

        <Title>
          Click on each picture only once!
        </Title>

            {this.state.friends.map(friend => (
              
                <FriendCard
                  key={friend.id}
                  handleShuffle={this.handleShuffle}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  id={friend.id}
                  image={friend.image}
                />
            
            ))}
       
      </Wrapper>
    );
  }
}

export default App;