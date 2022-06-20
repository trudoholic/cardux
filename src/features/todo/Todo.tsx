import { useState } from "react";
// Material-UI Imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// Other Imports
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import { addTodo, removeTodo, setTodoStatus, todoListStatus } from "./todoSlice";

function Todos() {
    //React Hooks
    const [todoDescription, setTodoDescription] = useState("");

    //React Redux Hooks
    const todoList = useAppSelector(todoListStatus);
    const dispatch = useAppDispatch();

    //Rendering
    return (
        <Container maxWidth="xs">
            <Typography style={{ color: "silver", textAlign: "center" }} variant="h3">
                Redux List App
            </Typography>
            <TextField
                variant="outlined"
                label="To Do Item"
                fullWidth
                onChange={(e) => setTodoDescription(e.target.value)}
                value={todoDescription}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                    dispatch(addTodo(todoDescription));
                    setTodoDescription("");
                }}
            >
                Add Item
            </Button>
            <List>
                {todoList.map(todo => (
                    <ListItem key={todo.id}>
                        <ListItemText
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                        >
                            {todo.description}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    dispatch(removeTodo(todo.id));
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Checkbox
                                edge="end"
                                value={todo.completed}
                                onChange={() => {
                                    dispatch(
                                        setTodoStatus({ completed: !todo.completed, id: todo.id })
                                    );
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Todos;