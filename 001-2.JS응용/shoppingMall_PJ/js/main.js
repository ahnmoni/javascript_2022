// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {

    // 1. 호출확인
    console.log("로딩완료!");

    // 2. 대상선정
    // 이벤트 대상 : .abtn
    let abtn = document.querySelectorAll('.abtn');
    // 변경대상 : #slide
    let slide = document.querySelector('#slide');

    // 광클금지 상태변수
    let prot = 0; // 1이면 금지, 0은 허용

    // 3. 클릭이벤트 기능구현
    // 3-1. 오른쪽버튼
    abtn[1].onclick = () => {
        console.log('오른쪽버튼!');

        if(prot) return; // 나감
        prot = 1; // 첫번째 신호가 잠금!
        //0.4초 후에 해제
        setTimeout( ()=> prot = 0,400);
        /////////////

        // 2. 대상선정 : #slide -> slide 변수
        // 3. 기능구현 : left 값을 -100%로 변경
        // 기능1단계 - 왼쪽으로 슬라이드 하나만큼 나가기
        slide.style.left='-100%';
        slide.style.transition = 'left .4s ease-in-out';

        // 기능2단계 - 슬라이드 이동 후 맨 앞 li 맨뒤 이동
        // 0.4초 후 실행하려면? 
        setTimeout(()=>{
            slide.appendChild(slide.querySelectorAll('li')[0]);
            // 동시에 -100%인 slide의 left 값을 0 으로 변경!
            slide.style.left = '0';
            slide.style.transition = 'none';
        },400);  
        
        // 블릿변경함수 호출
        chgIndic(1);

    } //// 클릭 이벤트 끝 ///////////

    // 3-1. 완쪽버튼
    abtn[0].onclick = () => {
        console.log('왼쪽버튼!');

        if(prot) return; // 나감
        prot = 1; // 첫번째 신호가 잠금!
        //0.4초 후에 해제
        setTimeout( ()=> prot = 0,410);
        /////////////

        // 2. 대상선정 : #slide -> slide 변수
        // 3. 기능구현 
        // 기능1단계 - 맨뒤 요소 맨 앞으로 이동 : insertBefore(넣을놈, 넣을놈전놈)
        let lis = slide.querySelectorAll('li');
        slide.insertBefore(lis[lis.length-1], lis[0]);
        
        // left값을 -100%로 변경하기
        slide.style.left = '-100%';
        slide.style.transition = 'none';
        // 기능2단계 - 슬라이드 이동 후 맨 앞 li 맨뒤 이동        
        
        setTimeout(()=>{
            slide.style.left = '0';
            slide.style.transition = 'left .4s ease-in-out';
        },10); 

        // 블릿변경함수 호출
        chgIndic(0);

    } //// 클릭 이벤트 끝 ///////////

    // 블릿에서 슬라이드 순번을 읽을 수 있게 각 슬라이드 li에 고유순번 속성 넣기!
    // 넣는 이유 : 슬라이드가 매번 순번이 바뀜
    // 넣는 방법은 처음 로딩 후 바로 li 순번을 넣는다
    // forEach 사용
    let sld = slide.querySelectorAll('li');
    sld.forEach((ele, idx) => {
        ele.setAttribute('data-seq', idx);
        // 속성명을 'data-'로 시작하면 내가 만든 속성명을 사용할 수 있도록 w3c에서 지정함!
        

    }); //// forEach 끝////

    // 블릿요소 변수설정
    let indic = document.querySelectorAll('.indic li');

    // 불릿의 표시를 해당 슬라이드 순번과 같은 블릿에 class="on"을 주면 회색이미지로 보임
    // 나머지는 모두 on을 빼야함

    function chgIndic(num){ 
        // num - 읽을 슬라이드 순번
        // 오른쪽버튼은 1, 왼쪽버튼은 0 을 전달!

        // 호출확인!
        console.log('블릿:', num);

        // 2. 슬라이드 속성 'data-seq'값 읽어오기
        let seq = slide.querySelectorAll('li')[num].getAttribute('data-seq');
        
        console.log('data-seq:', seq);

        // 3. 블릿 클래스 초기화!
        indic.forEach((ele)=>{
            ele.classList.remove('on');
        });

        // 4. 슬라이드 순번(data-seq)과 같은 순번의 블릿 li에 class="on" 넣기
        indic[seq].classList.add('on');
    }

    /*
        [JS 클래스 컨트롤 메서드 ]
        classList 객체
        1. add(클래스명) - 클래스 추가
        2. remove(클래스명) - 클래스 제거
        3. toggle(클래스명) - 클래스추가/제거
    */ 
    
} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////