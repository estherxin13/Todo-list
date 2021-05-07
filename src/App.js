import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({

  title: {
    fontSize: 30,

  },
  app: {
    textAlign: 'center'
  }

}));

function App() {
  const styles = useStyles();

  return (
    <div className={styles.app} >
      <div className={styles.title}>My ToDO App 😎</div>
      <TextField id="standard-basic" label="Write a Todo" />
    </div>
  );
}

export default App;
