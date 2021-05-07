import { Box, Button, Divider, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";
import Todo from './todo';
import TodoDone from './TodoDone';

const useStyles = makeStyles(theme => ({

  title: {
    marginBottom: theme.spacing(5),
  },
  app: {
    textAlign: 'center',
    margin: theme.spacing(5),
  },
  textBox: {
    minWidth: 500,
    marginBottom: theme.spacing(5),
  },
  card: {
    width: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    borderRadius: 10,
  },
  cards: {
  display: 'flex',
},
cardDone: {
  width: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  marginRight: theme.spacing(5),
  marginLeft: theme.spacing(5),
  borderRadius: 10,
  // backgroundColor: 'rgb(191,221,219,60%)'
},

}));

function App() {
  const styles = useStyles();

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getData();
  }, [])

  function getData() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          inProgress: doc.data().inProgress,
        }))
      );
    });
  }
  function addTodo(e) {
    e.preventDefault();
    db.collection("todos").add({
      inProgress: true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: input,
    });
    setInput("");
  }


  return (
    <div className={styles.app} >
      <div className={styles.title}><h1>Esther Xin's To-Do List</h1></div>
      <form>
        <TextField
          className={styles.textBox}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          id="standard-basic"
          label="Write a Todo" />
        <div>
          <Button type="submit" onClick={addTodo} variant="contained" style={{ display: 'none' }}>
            Hi
        </Button>
        </div>
      </form>
      <div className={styles.cards}>
      <Box boxShadow={3} className={styles.card}>
        <h3>in progress</h3>
        <Divider variant="middle" />
        {todos.map((title) => (
          <p>
            <Todo
              title={title.title}
              inProgress={title.inProgress}
              id={title.id}
            />
          </p>
        ))}
      </Box>
      <Box boxShadow={3} className={styles.cardDone}>
        <h3>done</h3>
        <Divider variant="middle" />
        {todos.map((title) => (
          <p>
            <TodoDone
              title={title.title}
              inProgress={title.inProgress}
              id={title.id}
            />
          </p>
        ))}
      </Box>
      </div>
    </div>
  );
}

export default App;
