import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { useStateValue } from './state';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AllInclusiveTwoToneIcon from '@material-ui/icons/AllInclusiveTwoTone';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import { Todo } from './types';
import { createStyles, makeStyles } from '@material-ui/styles';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    bottom: {
      width: '100vw',
    },
  })
);
const theme = createTheme();
const sayings = ['Nothing to see here!', 'Get on your work!', 'All done!'];

const App: React.FC = () => {
  const [{ todos }] = useStateValue();
  const [tab, setTab] = React.useState(1);
  const [saying, setSaying] = React.useState(sayings[0]);
  const classes = useStyles();

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (tab) {
      case 0:
        return todo.completed === false;
      case 2:
        return todo.completed === true;
      default:
        return todo;
    }
  });
  const todosLength = filteredTodos.length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    switch (tab) {
      case 0:
        setSaying(sayings[2]);
        break;
      case 2:
        setSaying(sayings[1]);
        break;
      default:
        setSaying(sayings[0]);
        break;
    }
  }, [tab, todos]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Paper variant="outlined">
          <Container maxWidth="sm" sx={{ minHeight: '93vh' }}>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h2">Todo Meow</Typography>
              </Grid>
              <Grid item>
                <AddTodoForm todosLength={todosLength} />
              </Grid>

              {todosLength ? (
                filteredTodos.map((todo, i) => {
                  const last = i === todosLength - 1;
                  return (
                    <List key={todo.id} className={classes.root}>
                      <TodoItem key={todo.id} todo={todo} last={last} />
                    </List>
                  );
                })
              ) : (
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: '50vh' }}
                >
                  <Typography variant="h4">{saying}</Typography>
                </Grid>
              )}

              <Paper
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                elevation={3}
              >
                <BottomNavigation
                  value={tab}
                  onChange={(
                    _event: React.SyntheticEvent,
                    newValue: React.SetStateAction<number>
                  ) => {
                    setTab(newValue);
                  }}
                  showLabels
                  className={classes.bottom}
                >
                  <BottomNavigationAction
                    label="Remaining"
                    icon={<ListAltTwoToneIcon />}
                  />
                  <BottomNavigationAction
                    label="All"
                    icon={<AllInclusiveTwoToneIcon />}
                  />
                  <BottomNavigationAction
                    label="Completed"
                    icon={<CheckCircleOutlineTwoToneIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </Grid>
          </Container>
        </Paper>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
