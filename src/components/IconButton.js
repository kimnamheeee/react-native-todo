import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { images } from "../images";

const Icon = styled.Image`
  tint-color: ${({ theme, completed }) =>
    completed ? theme.done : theme.text};})}
  width: 30px;
  height: 30px;
  margin: 10px;
`;
//컴포넌트 자체에 margin을 주어 사용자가 버튼 주위를 누르더라도 작동되도록 함 (정확하게 누르기는 쉽지 않으니까)
//TouchableOpacity가 뭐야? -> https://reactnative.dev/docs/touchableopacity
//TouchableOpacity는 버튼을 누르고 떼는 순간 투명해지는 효과를 줌
//TouchableOpacity는 onPressOut이라는 이벤트를 제공함
//onPressOut은 버튼을 누르고 떼는 순간 작동함

const IconButton = ({ type, onPressOut, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };
  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};
//여기서 onPressOut에 아무런 prop도 전달되지 않으면 뭐가 들어가? -> undefined

export default IconButton;
