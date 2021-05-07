import { Button, Card, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";
import Todo from './todo';

const useStyles = makeStyles(theme => ({

  title: {
    fontSize: 30,

  },
  app: {
    textAlign: 'center'
  },
  textBox: {
    minWidth: 500,
  },
  card: {
    width: 600,
    margin: 'auto',
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
  }

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
      <Card className={styles.card}>
      <div className={styles.title}>My ToDO App 😎</div>
      <form>
        <TextField
          className = {styles.textBox}
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
      {todos.map((title) => (
        <p>
          <Todo 
          title={title.title}
          inProgress={title.inProgress}
          id={title.id}
          />
        </p>
      ))}
      </Card>
    </div>
  );
}

export default App;
