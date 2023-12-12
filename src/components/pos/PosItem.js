import { useState } from 'react';
import styled from 'styled-components';

const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc((100vh - 40px) / 2);
  padding: 20px 0;
`;

const ItemContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
  &:hover {
    transform: scale(1.1) rotate(2deg);
  }
`;

const PlusContainer = styled(ItemContainer)`
  font-size: 50px;
  margin-right: 0;
`;

function PosItem() {
  const [containers, setContainers] = useState([]);

  const handleAddContainer = () => {
    const newContainers = [...containers];
    newContainers.unshift({});
    setContainers(newContainers);
  };

  return (
    <ItemDiv>
      {containers.map((_, index) => (
        <ItemContainer >
          <div>
            <span>{index + 1}</span>
          </div>
        </ItemContainer>
      ))}
      <PlusContainer onClick={handleAddContainer}>
        <div>
          <span>+</span>
        </div>
      </PlusContainer>
    </ItemDiv>
  );
}

export default PosItem;
