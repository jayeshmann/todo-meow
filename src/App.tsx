import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { useStateValue } from './state';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AllInclusiveTwoToneIcon from '@material-ui/icons/AllInclusiveTwoTone';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    bottom: {
      width: '100vw',
    },
  })
);

const App: React.FC = () => {
  const [{ todos }] = useStateValue();
  const [tab, setTab] = React.useState(1);
  const classes = useStyles();
  const todosLength = todos.length;

  return (
    <React.Fragment>
      <CssBaseline>
        <Paper variant="outlined">
          <Container maxWidth="sm" style={{ height: '100vh' }}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h2">Todo Meow</Typography>
              </Grid>
              <AddTodoForm todosLength={todosLength} />

              {todosLength ? (
                todos.map((todo) => {
                  return (
                    <List key={todo.id} className={classes.root}>
                      <TodoItem key={todo.id} todo={todo} />
                    </List>
                  );
                })
              ) : (
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ height: '50vh' }}
                >
                  <Typography variant="h4">Nothing to see here!</Typography>
                </Grid>
              )}

              <Box position="fixed" bottom={0}>
                <BottomNavigation
                  value={tab}
                  onChange={(_event, newValue) => {
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
              </Box>
            </Grid>
          </Container>
        </Paper>
      </CssBaseline>
    </React.Fragment>
  );
};

export default App;
