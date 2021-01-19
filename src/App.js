import React from 'react';
import Axios from 'axios';
import Questions from './components/Questions';
import './App.css';
import Carousel from 'react-elastic-carousel';

const breakPoints = [
  { width: 550, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      AnswerText:""
    };
  }

  componentDidMount() {
    Axios("https://localhost:44306/api/quiz")
      .then(
        (result) => {
          console.log(result.data);
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
            <div className="inner-box-content">
              <Carousel breakPoints={breakPoints}>
              {items.map(item => (
                  <Questions  data={item} />
              ))}
              </Carousel>
            </div>
          
        </div>
      );
    }
  }
}

export default App;
