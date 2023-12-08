import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 300px; /* 좌우 길이 조정 */
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin-right: 10px;
`;

const InputField = styled.input`
    flex-grow: 1;
`;

function PosItem() {
    return (
        <ItemContainer>
            <div>
                <Label htmlFor="itemName">품목명:</Label>
                <InputField type="text" id="itemName" />
                <br/>
                <Label htmlFor="itemPrice">가격:</Label>
                <InputField type="text" id="itemPrice" />
            </div>
        </ItemContainer>
    );
}

export default PosItem;
