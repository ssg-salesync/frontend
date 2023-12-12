import { useState } from 'react';

function PosCategory() {
    
    // useState로 상태저장
    const [categories, setCategories] = useState([]);
    

    // 카테고리 추가
    const addCategory = () => {
        const newCategories = [...categories, ''];
        setCategories(newCategories);
    };

    // 버튼 클릭 이벤트 핸들러
    const handlerCategoryChange = (idx, e) => {
        const newCategories = [...categories];
        newCategories[idx] = e.target.value;
        setCategories(newCategories);
    };

    // 카테고리 삭제 버튼
    const deleteCategory = (idx) => {
        const newCategories = [...categories];
        newCategories.splice(idx, 1);
        setCategories(newCategories);
    };

    return (
        <>
            <h1>카테고리</h1>
            <div>
                {categories.map((category, idx) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => handlerCategoryChange(idx, e)}
                            // placeholder="카테고리를 입력하세요"
                            style={{ marginRight: '5px' }}
                        />
                        <button type="button" onClick={() => deleteCategory(idx)}>X</button>
                    </div>
                ))}
                <button type='button' onClick={addCategory}>+</button>
            </div>
        </>
    );
};

export default PosCategory;