import React, { useState, useEffect } from 'react';

// 이미지 파일 (곰곰이, 로딩)
import GomGomE from '../Img/gomgomE.png'; 
import Loding from '../Img/loding.gif';

// 고민작성 화면 CSS 파일
import '../CSS/Write.css';

function Write() {
    // 필요한 Hook 작성
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const [advice, setAdvice] = useState('');
    const [showGomGomE, setShowGomGomE] = useState(false);
    const [isAdviceGiven, setIsAdviceGiven] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const [loading, setLoading] = useState(false);

    // 
    useEffect(() => {
        const inputContent = document.getElementById('Input-Content');

        const handleInput = () => {
            const adviceButton = document.getElementById('Advice-button');
            const solutionButton = document.getElementById('Solution-button');

            if (inputContent.value.trim() !== '') {
                adviceButton.disabled = false;
                solutionButton.disabled = false;
            } else {
                adviceButton.disabled = true;
                solutionButton.disabled = true;
            }
        };

        inputContent.addEventListener('input', handleInput);

        return () => {
            inputContent.removeEventListener('input', handleInput);
        };
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleWriterChange = (e) => {
        setWriter(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 제목, 작성자, 콘텐츠 작성 여부 확인 후, 조언받기 버튼 클릭시 로딩 -> 조언 출력되게 지정
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !writer || !content) {
            setAdvice('');
            alert("모든 입력란을 채워주세요.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setAdvice('친구야, 걱정하지 마. 우리 모두 졸업 후에 똑같은 고민을 했을 거야. 사실 아무도 완벽한 선택을 한 사람은 없어. 먼저 자신의 강점을 파악해봐. 경제학 전공으로 어떤 분야에 관심이 있는지, 어떤 경험을 쌓았는지를 고려해보면 도움이 될 거야. 내 이력서 나 자기소개서 작성하는 것은 귀찮긴 하지만, 이건 너 자신을 어필하는 좋은 기회야. 자신을 어떻게 표현할지 고민 중인데, 너의 열정과 노력, 그리고 적극적인 자세를 강조해봐.');
            setShowGomGomE(true);
            setIsAdviceGiven(true);
            setLoading(false);
        }, 3000);
    };

    // 보관 버튼 클릭시 팝업이 나오고 팝업에 보관함 버튼 클릭시 팝업 닫기 실행 지정
    const handleSave = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const adviceButton = document.getElementById('Advice-button');
        const solutionButton = document.getElementById('Solution-button');
        const inputContent = document.getElementById('Input-Content');

        inputContent.addEventListener('input', () => {
            if (inputContent.value.trim() !== '') {
                adviceButton.style.color = 'white';
                solutionButton.style.color = 'white';
            } else {
                adviceButton.style.color = 'gray';
                solutionButton.style.color = 'gray';
            }
        });

        return () => {
            inputContent.removeEventListener('input', () => { });
        };
    }, []);

    return (
        // 고민작성 컨테이너
        <div className='Write-Container'>
            <div className='Write-Gomean'>
                <form className='Input-Text' onSubmit={handleSubmit}>
                    <input
                        id='Input-Title'
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='제목을 입력하세요'
                    />
                    <input
                        id='Input-Writer'
                        value={writer}
                        onChange={handleWriterChange}
                        placeholder='작성자'
                    />
                    <textarea
                        id='Input-Content'
                        value={content}
                        onChange={handleContentChange}
                        placeholder='어떤 고민을 가지고 있나요?'
                    />
                    <div id='Advice' className="Advice-container">
                        {loading ? (
                            <div className="Loading">
                                <img src={Loding} alt="Loading..." />
                            </div>
                        ) : (
                            advice && <div>{advice}</div>
                        )}
                    </div>

                    {/* 곰곰이 컨테이너 */}
                    {showGomGomE && (
                        <div id='GomGomE'>
                            <img src={GomGomE} className='GomGomE' />
                            &nbsp;
                            곰곰이
                        </div>
                    )}

                    {/* 버튼 */}
                    <button
                        type={isAdviceGiven ? 'button' : 'submit'}
                        id='Advice-button'
                        className={(title && writer && content) ? 'active' : ''}
                        disabled={!title || !writer || !content}
                        onClick={isAdviceGiven ? handleSave : handleSubmit}
                    >
                        {isAdviceGiven ? '보관' : '조언받기'}
                    </button>
                    <button
                        type='button'
                        id='Solution-button'
                        className={(title && writer && content) ? 'active' : ''}
                        disabled={!title || !writer || !content}
                    >
                        해소
                    </button>
                </form>
            </div>

            {/* 팝업창 */}
            {showPopup && (
                <div className='Popup'>
                    <div className='Popup-Content'>
                        <h1>&nbsp;&nbsp;고민이 보관 되었습니다.&nbsp;&nbsp;</h1>
                        <p>저장된 고민을 확인해보세요.</p>
                        <button className='View-button' onClick={handleClosePopup}>보관함</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Write;
