import React from 'react';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Background from '../wavy1.jpg';



const theme1 = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  };

function Experiment() {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#4791db'
            }, 
            secondary: {
                main: '#e57373'
            }
        },
        typography: {
          fontFamily: 'Raleway, Arial',
          subtitle1: {
            fontSize: 25,
          },
          body1: {
            fontWeight: 500,
          },
          button: {
            fontStyle: 'italic',
          },
        },
      });

      const pStyle = {
        fontSize: '35px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        textAlign: 'center'
      };

      const bodyStyle = {
        background: 'linear-gradient(45deg, #ffb74d 10%, #64b5f6 90%)',
      }
    return (
        // <div style = {{backgroundImage: "url(" + Background + ")"}}>
        <div style = {bodyStyle}>
            {/*<br /> <br />*/}
            {/*<h1 style = {pStyle}> Kinetic Keys </h1>*/}
            {/* <ThemeProvider theme={theme}>
            </ThemeProvider> */}
            <Divider orientation = "vertical" variant = "fullWidth" />
            <hr width="10" size="450" style = {{backgroundColor: "rgba(89, 183, 189, 0.7)"}}/>
            <hr width = "10" size = "1000%"/>
        </div>
    );
}

export default Experiment;
