import React from 'react';
import Button from '@material-ui/core/Button';

class Stopwatch extends React.Component {
    state = {
        status: false,
        runningTime: 0
    };

    handleClick = () => {
        this.setState(state => {
          if (state.status) {
            clearInterval(this.timer);
          } else {
            const startTime = Date.now() - this.state.runningTime;
            this.timer = setInterval(() => {
              this.setState({ runningTime: (Date.now() - startTime)});
            });
          }
          return { status: !state.status };
        });
      };

      handleReset = () => {
        clearInterval(this.timer); // new
        this.setState({ runningTime: 0, status: false });
      };

      componentWillUnmount() {
        clearInterval(this.timer);
      }

      render() {
        const { status, runningTime } = this.state;
        return (
            <div>
                {/* <p>{Math.floor(runningTime/1000)}ms</p> */}
                <p>{(runningTime/1000).toFixed(2)}s</p>
                <Button onClick={this.handleClick}> {status ? "STOP" : "START"} </Button>
                <Button onClick={this.handleReset}>Reset</Button>
            </div>
        )
    }
}

export default Stopwatch;
