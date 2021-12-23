import React, { Component } from 'react';
import {Grid, Paper, Box} from "@material-ui/core";
import Cell from './Cell';
import rat from "./img/rat.jpg"
import cheese from "./img/cheese.jpg"

class Path extends Component {

pathIdx = 0;
foundPath = [];

createFoundPath = () => {
    for (let i = 0; i<16; i ++){
        this.foundPath.push(0)
    }

    for (let j=0; j<1; j++){
        if(this.props.maze[j]===0){
            this.foundPath[j] = 2;
        }
    }

    for (let k=0; k<this.props.currentPath.length; k++){
        let x = this.props.currentPath[k][0];
        let y = this.props.currentPath[k][1];
        this.foundPath[4 * x + y] = 1;
    }
    };

    findColor = () => {
        this.pathIdx += 1;
        let result = this.foundPath[this.pathIdx];
        if(result === 2) {
            result = 0;
        }
        else if (result === 0){
            result = 2; 
        }
        if(this.pathIdx === 14){
            this.pathIdx = 0;
        }
        return result;
    };

    render() {
        this.createFoundPath();
        return (
            <div className="gridWrapper">
            <Grid container justifyContent="center" direction="column">
            <span>
            <Grid container justifyContent="center" direction="row">
            <Grid item>
                <Paper>
                <Box height={70} width={70}>
                    <img
                        src={rat}
                        height={60}
                        width={60}
                        alt="rat"/>
                </Box>
                </Paper>
                </Grid>
                <Cell N={this.findColor()}/>
                <Cell N={this.findColor()}/>
                <Cell N={this.findColor()}/>
                </Grid>
            </span>
            <span><Grid container justifyContent="center" direction="row">
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
                </Grid></span>
            <span><Grid container justifyContent="center" direction="row">
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
                </Grid></span>
            <span><Grid container justifyContent="center" direction="row">
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Cell N={this.findColor()}/>
            <Grid item>
                <Paper>
                <Box height={70} width={70}>
                    <img
                        src={cheese}
                        height={30}
                        width={50}
                        alt="cheese"/>
                </Box>
                </Paper>
                </Grid>
                </Grid>
                </span>
                </Grid>       
        </div>
        );
    }
}

export default Path;