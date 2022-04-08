import styled from "styled-components";

export const EditButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgba(18, 178, 7, 0.744);
  margin: 2px;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
  @media (max-width: 378px) {
    font-size: 8px;
  }
`;

export const EditInput = styled.input`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  font-size: 15px;
  margin: 0 auto;
  width: auto;
  background-color: #868484c7;
  ::placeholder {
    color: white;
  }
  @media (max-width: 768px) {
    font-size: 8px;
    padding: 4px;
    width: 40px;
  }
`;

export const DeleteButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgba(253, 7, 7, 0.704);
  margin: 2px;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
  @media (max-width: 378px) {
    font-size: 8px;
  }
`;

export const CancelButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: #e8e8e8b7;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
`;
