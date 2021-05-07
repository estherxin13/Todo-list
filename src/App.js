import { Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase"; 

const useStyles = makeStyles(theme => ({

  title: {
    fontSize: 30,

  },
  app: {
    textAlign: 'center'
  }

}));

function App() {

  const [input, setInput] = useState('')

  function addTodo(e) {
    e.preventDefault();
    db.collection("todos").add({
      inProgress: true, 
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(), 
      title: input,
    });
  }

  const styles = useStyles();

  return (
    <div className={styles.app} >
      <div className={styles.title}>My ToDO App 😎</div>
      <form>
        <TextField
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          id="standard-basic"
          label="Write a Todo" />
        <div>
          <Button type="submit" onClick={addTodo} variant="contained" style={{display: 'none'}}>
            Hi
        </Button> 
       </div>
       </form>
    </div>
  );
}

export default App;
