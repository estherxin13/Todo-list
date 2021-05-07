import { Button, Checkbox, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import {  useState } from 'react';
import { db } from './firebase_config';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({

    root: {
        margin: 'auto',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        display: 'flex',
    }

}));

function Todo({ title, inProgress, id }) {
    const classes = useStyles();

    const [checked, setChecked] = useState(inProgress ? false : true);

    function toggle(event){ 
        setChecked(event.target.checked);
        db.collection("todos").doc(id).update({
            inProgress: !inProgress
        })
    }

    function deleteTodo() {
        db.collection("todos").doc(id).delete(); 
    }

    return (
        <div className={classes.button}>
            <ListItem className={classes.root}>
                <ListItemText primary={title} secondary={inProgress ?
                    "In Progress" : "Done"} />
            </ListItem>
            <div>
                <Checkbox
                    checked={checked}
                    onChange={toggle}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Button onClick={deleteTodo}>
                    <DeleteIcon />
                </Button>
            </div>
        </div>
    );
}

export default Todo;
