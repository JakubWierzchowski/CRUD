import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 80%;
  display: block;
  border: 1px solid;
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

export default function SelectCategories({ selectCategory }) {
  const options = [
    { value: "Niezbędne", label: "Niezbędne" },
    { value: "Video", label: "Video" },
    { value: "Audio", label: "Audio" },
    { value: "Inne", label: "Inne" },
  ];

  return (
    <>
      <Select onChange={(event) => selectCategory(event.target.value)}>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </>
  );
}
