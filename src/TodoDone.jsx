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
    },
    button: {
        display: 'flex',
    },
    listDone: {
        textDecoration: 'line-through',
    },
    card: {
        width: 600,
        margin: 'auto',
        padding: theme.spacing(5),
        marginTop: theme.spacing(5),
    }
}));

function TodoDone({ title, inProgress, id }) {
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

            {!inProgress &&
                <div className={classes.button}>
                    <ListItem className={classes.root}>
                        <ListItemText className={classes.listDone}
                            primary={title}
                            secondary="finished" />
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

export default TodoDone;
