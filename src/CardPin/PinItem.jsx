import React from "react";
import PropTypes from "prop-types";

const PinItem = React.forwardRef((props, ref) => {
  const handleKeyUp = (e) => {
    console.log(e.code);
    switch (e.code) {
      case "Backspace": {
        props.handleBackspace(e.target.value);
        break;
      }
      case "ShiftLeft":
      case "Tab":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
        break;
      default: {
        props.handleChange(e.target.value);
      }
    }
  };
  return (
    <input
      ref={ref}
      style={{
        width: "5rem",
        height: "1.25rem",
        padding: "0.25rem",
        margin: "0.25rem",
        textAlign: "center"
      }}
      maxLength={props.maxLength}
      onKeyUp={handleKeyUp}
    />
  );
});

PinItem.propTypes = {
  maxLength: PropTypes.number,
  handleChange: PropTypes.func,
  handleBackspace: PropTypes.func
};

PinItem.defaultProps = {
  maxLength: 1
};
export default PinItem;
