// 보그 PJ 공통 기능 JS - common.js

$(()=>{

    // 스크롤 등장액션을 위한 클래스 셋팅
    // main.cont>section 중 두번째부터 끝까지 선택하여 .scAct를 줘서 투명하고 아래로 조금 내려가 있는 상태를 만든다!
    $('main.cont > section ~').addClass('scAct');    
    // $('main.cont > section:first ~ section').addClass('scAct');

    /************************************
        페이지 스크롤시 변경 구현하기
        - 이벤트 : scroll
        - 제이쿼리 메서드 : scroll
        - 대상 : window
    *************************************/
    // 스크롤 위치값 변수
    let scTop;
    // 스크롤 등장클래스 담기
    let scAct = $('.scAct');
    // 스크롤 등장클래스의 각 위치를 담을 배열 변수
    const scpos = [];
    // 스크롤 등장클래스 위치값 셋팅하기
    scAct.each((idx, ele)=>{
        // 위치값을 scpos 배열 변수에 넣기
        scpos[idx] = $(ele).offset().top;
    });
    // 스크롤 등장위치 보정값 변수
    let gap = $(window).height()/2 + 206;
    // 윈도우(보이는화면) 높이값의 절반
    // 206은 상단영역이 슬림해질때 높이

    //scpos.forEach((val) => console.log(val));
    

    // 상단영역
    let topA = $('#top');
    // top버튼
    let tbtn = $('.tbtn');

    $(window).scroll(()=>{
        // 화살표함수 안에서 this는 window

        // 스크롤 top 위치값 넣기
        scTop = $(this).scrollTop();

        //console.log("스크롤중~", scTop);
        //1. 스크롤시 상단 영역에 클래스 on넣기
        // 슬림 디자인 상단 영역 변경하기

        // 스크롤등장 요소에 클래스 on 넣기
        if(scTop >= 100){
            topA.addClass('on');
        }else{
            topA.removeClass('on');
        }

        if(scTop >= 300){
            tbtn.addClass('on');
        }else{
            tbtn.removeClass('on');
        }
        // scAct.first().addClass('on');

        // 3. 스크롤등장 요소에 클래스 on넣기
        // 등장액션 요소 갯수 만큼 scAction 함수 호출하기!
        scAct.each(idx => scAction(idx));

    }) //// scroll//////////

    /***********************************************
        스크롤 액션 함수
        함수명 : scAction
        기능 : 각 스크롤위치를 체크하여 해당요소에 클래스 on을 넣어준다
    ***********************************************/
    function scAction(seq){
        // 3. 스크롤등장 요소에 클래스 on넣기
        if((scTop > scpos[seq] - gap) && (scTop < scpos[seq])){
            scAct.eq(seq).addClass('on');
        }
    }

    tbtn.click((e)=>{
        // 기본이동막기
        e.preventDefault();

        // 스크롤 이동 애니메이션의 대상은? html, body
        $('html,body').animate({
            scrollTop:"0"
        },400);
    });

});