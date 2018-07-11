//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import sports from "./sports.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    sports,
    clickedSports: [],
    score: 0
  };

//click on card. player is taken out of array
  imageClick = event => {
    const currentSports = event.target.alt;
    const SportsAlreadyClicked =
      this.state.clickedSports.indexOf(currentSports) > -1;

//if you click on a player that has already been selected, the game is reset and cards reordered
    if (SportsAlreadyClicked) {
      this.setState({
        sports: this.state.sports.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedSports: [],
        score: 0
      });
        alert("You lose :(");

//if you click on a player, your score is increased and cards reordered
    } else {
      this.setState(
        {
          sports: this.state.sports.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedSports: this.state.clickedSports.concat(
            currentSports
          ),
          score: this.state.score + 1
        },
//if you get all 12 player coorect you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              sports: this.state.sports.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedSports: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.sports.map(sports => (
            <FriendCard
              imageClick={this.imageClick}
              id={sports.id}
              key={sports.id}
              image={sports.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;