import styled from "styled-components";
export const FilterExport = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

export const Input = styled.input`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  margin: 20px;
  width: 400px;
  background-color: rgb(240, 243, 245);
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  border-color: rgb(171, 171, 171);
  background-color: rgb(255, 252, 252);
  color: rgb(0, 0, 0);
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  margin: 20px;
  :hover {
    color: rgb(0, 0, 0);
    background-color: rgba(12, 176, 0);
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
