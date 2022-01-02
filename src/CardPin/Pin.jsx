import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import PinItem from "./PinItem";

function Pin(props) {
  const { length, perBox, onChange } = props;

  const elements = useRef(new Array(length).fill(""));
  const values = useRef(new Array(length).fill(""));

  useEffect(() => {
    if (elements?.current && elements.current.length !== 0) {
      elements.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    values.current[index] = value;
    if (value.length === perBox && index < length - 1) {
      elements.current[index + 1].focus();
    }
    onChange(values.current.join(" "));
  };

  const handleBackspace = (value, index) => {
    values.current[index] = value;
    if (value.length === 0 && index > 0) {
      elements.current[index - 1].focus();
    }
    onChange(values.current.join(" "));
  };

  const handleRefCallback = (element, index) => {
    elements.current[index] = element;
  };

  const handlePaste = (e) => {
    // THIS WILL ONLY WORK FOR 4 PER BOX
    e.preventDefault();
    values.current = values.current.map((a, i) => {
      elements.current[i].value = "";
      return "";
    });
    const val = e.clipboardData
      .getData("text")
      .match(/.{1,4}/g)
      .filter((a, i) => i < length * perBox);
    console.log(val);
    val.forEach((value, i) => {
      values.current[i] = value;
      elements.current[i].value = value;
      if (value.length < 4) {
        elements.current[i].focus();
      } else if (i < length - 1) {
        elements.current[i + 1].focus();
      }
    });
  };
  return (
    <div onPaste={handlePaste}>
      {values.current.map((item, index) => (
        <PinItem
          maxLength={perBox}
          ref={(n) => handleRefCallback(n, index)}
          key={index}
          handleChange={(value) => handleChange(value, index)}
          handleBackspace={(value) => handleBackspace(value, index)}
        />
      ))}
    </div>
  );
}

Pin.propTypes = {
  length: PropTypes.number.isRequired,
  perBox: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isValid: PropTypes.bool
};

Pin.defaultProps = {
  perBox: 1,
  label: null,
  isValid: null
};

export { Pin };
