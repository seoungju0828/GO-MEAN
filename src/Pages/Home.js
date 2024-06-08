import React, { useState, useEffect } from 'react';

// 이미지 파일 (제목, 쓰레기통)
import title from '../Img/title.png';
import trash1 from '../Img/trash-1.png';
import trash2 from '../Img/trash-2.png';
import trash3 from '../Img/trash-3.png';
import trash4 from '../Img/trash-4.png';
import trash5 from '../Img/trash-5.png';
import trash6 from '../Img/trash-6.png';

// 홈화면 CSS 파일
import '../CSS/Home.css'; 
// 쓰레기통 슬라이드 파일
import CircularCarousel from './CircularCarousel.js';

// 백그라운드 원 색깔 배열
const circleColors = [
    '#597B4A',
    '#98833B',
    '#929292',
    '#8F576F',
    '#5E4E83',
    '#507F85',
];

// 쓰레기통 슬라이드 이미지 배열
const trashImages = [trash1, trash2, trash3, trash4, trash5, trash6];

// 제목 필터값 배열
const filterEffects = [
    '',
    'brightness(1.3) saturate(150%) hue-rotate(310deg) contrast(90%)',
    'brightness(0.95) saturate(0%) hue-rotate(0deg) contrast(100%)',
    'brightness(0.8) saturate(80%) hue-rotate(220deg) contrast(150%)',
    'brightness(0.8) saturate(60%) hue-rotate(190deg) contrast(150%)',
    'brightness(1.0) saturate(120%) hue-rotate(95deg) contrast(90%)'
];

function Home() {
    // 필요한 Hook 작성
    const [curSlide, setCurSlide] = useState(0);
    const [activeComponent, setActiveComponent] = useState('Home');
    const [gradientStyle, setGradientStyle] = useState({
        background: `${circleColors[0]}`
    });

    // 쓰레기통 슬라이드에 맞춰 백그라운드 원의 색이 바뀌도록 지정
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurSlide(prevState =>
                prevState < trashImages.length - 1 ? prevState + 1 : 0
            );
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = curSlide === trashImages.length - 1 ? 0 : curSlide + 1;
            setGradientStyle({
                background: `linear-gradient(to right, ${circleColors[curSlide]}, ${circleColors[nextIndex]})`
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [curSlide]);

    // 배경색을 검은색으로 지정
    useEffect(() => {
        document.body.style.backgroundColor = '#000000';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    // 버튼 누를 시 효과가 보이도록 지정
    const handleButtonClick = component => {
        setActiveComponent(component);
    };

    return (
        <div className="Home">
            {/* 제목 이미지에 슬라이드에 맞춰 필터 입히기 */}
            <div className="Home-Title">
                <img src={title} alt="Title Image" id="Title-Image" style={{ filter: filterEffects[curSlide] }} />
            </div>
            
            {/* 백그라운드 원 슬라이드에 맞춰 색깔 바꾸기 */}
            <div
                className="Circles"
                style={{
                    '--start-color': circleColors[curSlide === 0 ? circleColors.length - 1 : curSlide - 1],
                    '--end-color': circleColors[curSlide],
                    '--current-color': circleColors[curSlide],
                    animation: 'gradientChange 3s ease-in-out',
                }}
            ></div>

            {/* 쓰레기통 슬라이드 파일 */}
            <CircularCarousel items={trashImages} interval={8000} />

            {/* Gomean 설명 글 */}
            <div className="Content-Text">
                <p className="Title">
                    Go mean은 <br /> 어떻게 만들어졌나요?
                </p>
                <p className="Content">
                    Go mean은 내가 가지고 있던 고민을 '쓰레기를 <br />
                    버리듯 가볍게 털어버리자'라는 생각에서 출발했습니다. <br />
                    영어 단어 'go'와 의미하다라는 뜻을 가진 단어 <br />
                    'mean'을 합쳐, 고민을 버리는 행위로 조언을 <br />
                    얻으며 나의 고민이 의미있는 행동 자체가 된다는 <br />
                    의미를 담고 있습니다. <br />
                </p>
                <p className="SubContent">
                    카테고리에 따라 쓰레기통을 눌러 <br />
                    고민을 적고 해소버튼을 눌러 고민을 해소하거나 <br />
                    '만능 인공지능 상담사' 곰곰이에게 조언을 받아보세요.
                </p>
            </div>

            {/* 지정색 설명 글 */}
            <div className="Explanation-Text">
                <p className="Explanation Health">건강</p>
                <p className="Color Green">&nbsp;: 연두색</p>

                <p className="Explanation Money">금전</p>
                <p className="Color Yellow">&nbsp;: 노란색</p>

                <p className="Explanation Private">개인</p>
                <p className="Color White">&nbsp;: 흰색</p>

                <p className="Explanation Person">인간관계</p>
                <p className="Color Pink">&nbsp;: 분홍색</p>

                <p className="Explanation Employed">취업</p>
                <p className="Color Purple">&nbsp;: 보라색</p>

                <p className="Explanation Study">학업</p>
                <p className="Color Blue">&nbsp;: 파란색</p>
            </div>

            {/* 버튼 */}
            <nav>
                <div className="Button-back">
                    <button
                        className={`Slide-btn ${activeComponent === 'Home' ? 'active' : ''}`}
                        style={{ backgroundColor: `${activeComponent === 'Home' ? '#ffffff50' : ''}` }}
                        onClick={() => handleButtonClick('Home')}
                    >
                        홈
                    </button>
                    <button
                        className={`Slide-btn Trash-btn ${activeComponent === 'Record' ? 'active' : ''}`}
                        style={{ backgroundColor: `${activeComponent === 'Record' ? '#ffffff50' : ''}` }}
                        onClick={() => handleButtonClick('Record')}
                    >
                        쓰레기 보관함
                    </button>
                    <button
                        className={`Slide-btn Statistics-btn ${activeComponent === 'Graph' ? 'active' : ''}`}
                        style={{ backgroundColor: `${activeComponent === 'Graph' ? '#ffffff50' : ''}` }}
                        onClick={() => handleButtonClick('Graph')}
                    >
                        통계
                    </button>
                </div>
            </nav>
        </div>
    );
}
        
export default Home;
        