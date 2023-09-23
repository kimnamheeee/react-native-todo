import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { images } from "../images";
import IconButton from "./IconButton";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? "line-through" : "none"};
`;

const Task = ({ item, deleteTask, toggleTask }) => {
  return (
    <Container>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Contents completed={item.completed}>{item.text}</Contents>
      {item.completed || <IconButton type={images.update} />}
      <IconButton type={images.delete} onPressOut={deleteTask} id={item.id} />
      {/*여기서 deleteTask(item.id)의 형식으로 전달하면 안 되는 이유 -> deleteTask에 id를 전달하는 것이 아니라 deleteTask를 전달해야 하기 때문
      onPressOut에 delteTask(item.id의 형식으로 전달하면 함수 자체가 아니라 return값이 전달되는 것) */}
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
