import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Dimensions, StatusBar } from "react-native";
import Input from "./components/Input";
import { images } from "./images";
import IconButton from "./components/IconButton";
import Task from "./components/Task";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get("window").width;
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});

  const _addTask = () => {
    alert(`Add: ${newTask}`);
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    //여기서 [ID]는 뭐야? -> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer
    //객체의 속성 이름을 동적으로 생성할 수 있음
    //객체의 속성 이름을 동적으로 생성하려면 대괄호 표기법을 사용해야 함
    //대괄호 표기법을 사용하면 객체의 속성 이름을 동적으로 생성할 수 있음
    //여기서는 ID값을 이름으로 가지는 객체를 생성함
    setNewTask("");
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = (id) => {
    alert(`Delete ${id}`);
    //여기서 id가 undefined로 표시되는 이유는 뭐야? -> Task.js에서 IconButton의 onPressOut에 id를 전달하지 않았기 때문
    //Task.js에서 IconButton의 onPressOut에 id를 전달하지 않으면 undefined로 표시됨
    const currentTasks = Object.assign({}, tasks);
    //const currentTasks = Object.assign({}, tasks);에 대한 설명 -> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    //Object.assign() 메서드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다. 대상 객체를 반환합니다.
    //여기서는 currentTasks에 tasks를 복사함
    //복사를 하는 이유가 뭐야? -> tasks를 직접 수정하면 안 되기 때문
    //왜 직접 수정하면 안 되는데 -> 직접 수정하면 React가 변경된 것을 감지하지 못함
    //useEffect 쓰면 안돼? -> useEffect는 컴포넌트가 렌더링된 후에 실행되는데, 여기서는 렌더링이 끝나기 전에 실행되어야 함
    //렌더링이 끝나기 전에 실행되어야 하는 이유는? -> 렌더링이 끝나기 전에 실행되어야 변경된 것을 감지할 수 있기 때문
    //렌더링이 뭐야? -> https://ko.reactjs.org/docs/rendering-elements.html
    //렌더링은 React 엘리먼트를 DOM 노드에 매핑하고, 업데이트가 필요한 경우에만 업데이트하는 것을 말함
    //여기서는 React 엘리먼트를 DOM 노드에 매핑하는 것이 아니라 React 엘리먼트를 React 엘리먼트에 매핑함
    //React 엘리먼트를 React 엘리먼트에 매핑하는 이유는 뭐야? -> React 엘리먼트를 DOM 노드에 매핑하면 변경된 것을 감지할 수 없기 때문
    //React 엘리먼트를 DOM 노드에 매핑하면 변경된 것을 감지할 수 없는 이유는 뭐야? -> React 엘리먼트를 DOM 노드에 매핑하면 React 엘리먼트를 React 엘리먼트에 매핑하는 과정을 거치지 않기 때문
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _toggleTask = (id) => {
    alert(`Toggle ${id}`);
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    setTasks(currentTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />
        <List width={width}>
          {tasks
            ? Object.values(tasks)
                .reverse()
                .map((item) => (
                  <Task
                    item={item}
                    key={item.id}
                    deleteTask={_deleteTask}
                    toggleTask={_toggleTask}
                  />
                ))
            : null}
        </List>
      </Container>
    </ThemeProvider>
  );
}
