import React from "react";
import styled from "styled-components";

const Select = styled.select`
  display: block;
  border-radius: 8px;
  padding: 6px 10px;
  margin: 10px 0 20px 0;
  font-size: 20px;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default function SelectCategories({ handleInputChange, value, name }) {
  const options = [
    { values: "Niezbędne", label: "Niezbędne" },
    { values: "Video", label: "Video" },
    { values: "Audio", label: "Audio" },
    { values: "Inne", label: "Inne" },
  ];

  return (
    <>
      <Select onChange={handleInputChange} value={value} name={name}>
        {options.map((item) => (
          <option key={item.values} value={item.values}>
            {item.label}
          </option>
        ))}
      </Select>
    </>
  );
}
