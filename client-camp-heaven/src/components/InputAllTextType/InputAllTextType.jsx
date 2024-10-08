import { useRef } from 'react';
import './InputAllTextType.scss';
import { useState } from 'react';

const InputAllTextType = ({
  type,
  value,
  label,
  name,
  onChange,
  allWarehouses,
  show,
}) => {
  const ref = useRef(null);
  const [noLabel, setNoLabel] = useState(true);
  let input;

  if (type === 'search') {
    input = (
      <input
        type={type}
        name={name}
        placeholder="Search..."
        ref={ref}
        className="inputs inputs__search"
        value={value}
        onChange={onChange}
      />
    );
  } else if (type === 'tel' || type === 'email' || type === 'password') {
    input = (
      <input
        type={type}
        name={name}
        placeholder={label}
        defaultValue={value}
        ref={ref}
        className="inputs inputs__userInfo"
      />
    );
  } else if (type === 'description') {
    input = (
      <textarea
        type={type}
        name={name}
        placeholder={label}
        defaultValue={value}
        ref={ref}
        className="inputs inputs__description"
        onChange={onChange}
      />
    );
  } else if (type === 'smallTxt') {
    input = (
      <input
        type={type}
        name={name}
        placeholder={label}
        defaultValue={value}
        ref={ref}
        className="inputs inputs__smallTxt"
        onChange={onChange}
      />
    );
  } else if (type === 'dropDown') {
    input = (
      <select
        name={name}
        className="inputs inputs__dropdown"
        onChange={onChange}
      >
        <option hidden>Please select</option>
        {allWarehouses.map((warehouse, index) => (
          <option key={index}>{warehouse.warehouse_name}</option>
        ))}
      </select>
    );
  } else if (type === 'file') {
    input = (
      <input
        id="imageInput"
        type={type}
        name={name}
        accept="image/*"
        className="inputs__file"
        onChange={onChange}
      />
    );
  }

  return (
    <div>
      {show && (
        <div
          className={`inputs__${
            type === 'search' ? 'label--search' : 'label'
          } `}
        >
          <h3 className="inputs__label--labelHeader">{label}</h3>
        </div>
      )}
      {input}
    </div>
  );
};
export default InputAllTextType;
