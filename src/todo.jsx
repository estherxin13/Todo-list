import { Button, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { db } from './firebase_config';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles(theme => ({

    root: {
        margin: 'auto',
        width: '100%',
        maxWidth: 360,
        '&&':{
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
    button: {
        display: 'flex',
    },
}));

function Todo({ title, inProgress, id }) {
    const classes = useStyles();

    function toggle(event) {
        db.collection("todos").doc(id).update({
            inProgress: !inProgress
        })
    }

    function deleteTodo() {
        db.collection("todos").doc(id).delete();
    }

    return (
        <>

            {inProgress &&
                <div className={classes.button}>
                    <ListItem className={classes.root}>
                        <ListItemText
                            primary={title}
                            secondary="to be finished" />
                        </ListItem>
                    <div>
                        <Button onClick={toggle}>
                            {inProgress ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
                        </Button>
                        <Button onClick={deleteTodo}>
                            <DeleteIcon />
                        </Button>
                    </div>
                </div>
            }

        </>
    );
}

export default Todo;
