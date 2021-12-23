import React from 'react';
import {Grid, Paper, Box, makeStyles} from "@material-ui/core";

//green color:
const styles1 = {
    paper: {
        background: "#386641", 
    },
};

//red color:
const styles2 = {
    paper: {
        background: "#bc4749",
    },
};

const useStyles1 = makeStyles(styles1);
const useStyles2 = makeStyles(styles2);

const Cell = (props) => {
if(props.N === 0) {
    return <RedCell/>
}
else if(props.N===1){
    return <GreenCell/>
}
else {
    return <WhiteCell/>
}
}

const WhiteCell = () => {
return (
    <Grid item>
        <Paper>
            <Box height={70} width={70}/>
        </Paper>
    </Grid>
);
}

const RedCell = () => {
    const classes = useStyles2()
    return (
        <Grid item>
        <Paper className={classes.paper}>
            <Box height={70} width={70}/>
        </Paper>
    </Grid>
    );

}

const GreenCell = () => {
    const classes = useStyles1()
    return (
        <Grid item>
        <Paper className={classes.paper}>
            <Box height={70} width={70}/>
        </Paper>
    </Grid>
    );
}

export default Cell;