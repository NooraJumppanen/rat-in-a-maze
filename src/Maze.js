import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Paper, Box} from "@material-ui/core"
import Cell from './Cell';
import rat from "./img/rat.jpg"
import cheese from "./img/cheese.jpg"
import Path from './Path';

class Maze extends Component {

    matrix = [2];
    paths = [];
    idx = 0;
    numPaths = 0;
    pathIdx = 0;

    index = () => {
        this.idx += 1;
        return this.matrix[this.idx];
    }

    findColor = (path) => {
        this.pathIdx += 1;
        let result = path[this.pathIdx];
        if (this.pathIdx === 14){
            this.pathIdx = 0; 
        }
        return result;
    }

    generateMatrix = () => {
        for (let i = 0; i < 14; i ++){
            let val = Math.floor(Math.random() * 4);
            if (val === 0) {
                this.matrix.push(0);
            }
            else {
                this.matrix.push(2);
            }
        }
        this.matrix.push(2);
    };

    inMaze = (x, y, visited) => {
        return (
            x >= 0 && x < 4 &&
            y >= 0 && y < 4 &&
            this.matrix[x * 4 + y] > 0 &&
            visited[x * 4 + y] === 0
        );
    };

    calculatePaths = () => {
        let visited = [];
        for (let i = 0; i < 16; i ++){
            visited[i] = 0;
        }  
        this.mazeUtil(visited, 0, 0, []);
        return this.paths;
    };

    mazeUtil = (visited, x, y, currentPath) => {
        if (x === 3 && y === 3) {
            this.numPaths += 1;
            this.paths.push([...currentPath]);
            visited[15] = 0;
            return;
        }

        if (!this.inMaze(x, y, visited)) {
            return;
        }

        visited[4 * x + y] = 1;

        currentPath.push([x + 1, y]);
        this.mazeUtil(visited, x + 1, y, currentPath);
        currentPath.pop();

        currentPath.push([x, y + 1]);
        this.mazeUtil(visited, x, y + 1, currentPath);
        currentPath.pop();

        visited[4 * x + y] = 0;
        return;
    };

    getNumPaths = () => {
        return (
            <div>
                <p>Total paths found = {this.numPaths}</p>
            </div>
        )
    }

    findPaths = () => {
        const displayNumPaths = <this.getNumPaths/>
        
        ReactDOM.render(displayNumPaths, document.getElementById('count'));
        let grids = document.getElementById('routes');

        for (let i = 0; i<this.paths.length; i++) {
            const solution = (
                <Path currentPath = {this.paths[i]} maze = {this.matrix}/>
            );
            const id = Math.random();
            const d = document.createElement('span');
            d.id = id;
            grids.appendChild(d);
            ReactDOM.render(solution, document.getElementById(id));
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        window.location.reload(false);
    }

    render() {
        this.matrix = new Array([]);
        this.matrix = [2];
        this.generateMatrix();
        this.calculatePaths();
    
        return (
            <>
            <h1>Rat in a Maze</h1>
            <p>Noora Jumppanen</p>
            <div className="gridWrapper">
                <Grid container justifyContent="center" direction="column">
                <span>
                <Grid container justifyContent="center" direction="row">
                <Grid item>
                    <Paper>
                    <Box height={70} width={70}>
                        <img
                        src={rat}
                        alt="rat"/>
                    </Box>
                    </Paper>
                    </Grid>
                    <Cell N={this.index()}/>
                    <Cell N={this.index()}/>
                    <Cell N={this.index()}/>
                    </Grid>
                </span>
                <span><Grid container justifyContent="center" direction="row">
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                </Grid></span>
                <span><Grid container justifyContent="center" direction="row">
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                </Grid></span>
                <span><Grid container justifyContent="center" direction="row">
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
                <Cell N={this.index()}/>
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
            <div className="buttonArea">
            <button onClick={this.handleClick}>Generate new maze</button>
            <button onClick={this.findPaths}>Find possible paths</button>
            </div>
            </>
        );
    }
}

export default Maze;