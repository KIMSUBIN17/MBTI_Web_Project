//'use strict';

//const:상수변수(불변) querySelector:문서에서 css선택자에 대응되는 것을 찾아줌
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

    //배열의 최대값을 가지고 있는 index값 반환
    function calResult(){
        console.log(select);
        var result = select.indexOf(Math.max(...select));
        return result;
      }

    function setResult(){
        let point = calResult();
        const resultName = document.querySelector('.resultname');
        resultName.innerHTML = infoList[point].name;
      
        var resultImg = document.createElement('img');
        const imgDiv = document.querySelector('#resultImg');
        var imgURL = 'img/image-' + point + '.png';
        resultImg.src = imgURL;
        resultImg.alt = point;
        resultImg.classList.add('img-fluid');
        imgDiv.appendChild(resultImg);
      
        const resultDesc = document.querySelector('.resultDesc');
        resultDesc.innerHTML = infoList[point].desc;
      }
      
//qna섹션이 끝나고 result섹션 열어줌
function goResult(){
    qna.style.WebkitAnimation="fadeOut 1s";
    qna.style.Animation="fadeOut 1s"
    //main이 500초쯤 되었을때 qna페이지 등장
    setTimeout(() => {
        result.style.WebkitAnimation="fadeIn 1s";
        result.style.Animation="fadeIn 1s"
        //main애니메이션이 끝났을때 main디스플레이를 끔
        setTimeout(() => {
            qna.style.display="none";
            result.style.display="block";
        },450)})
        setResult();


}
function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');    //버튼3개 한번에 선택하기 위해 
    answer.classList.add('my-3'); 
    answer.classList.add('py-3'); 
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn')
    a.appendChild(answer);      //answer버튼이 a에 소속될 수 있도록
    answer.innerHTML = answerText;      //a배열의 answer의 값을 넣어줌

    //사용자가 버튼 클릭하면 3개 다 사라지고, 다음 질문&답버튼 등장
    answer.addEventListener("click", function(){    
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i<children.length;i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation="fadeOut 0.5s";
            children[i].style.Animation="fadeOut 0.5s"
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
              select[target[i]] += 1;
                //반복문 다 돌고 버튼선택시 십이간지 순서로 1씩 증가
            }
            
            for(let i = 0; i < children.length;i++){
                children[i].style.display='none';
            }
            goNext(++qIdx);
        },450)

    }, false);
}

//begin함수가 끝날 때 goNext함수 호출
//qnaList에서 인덱스선택 부분은 변수로 관리해서 1,2,3...진행해야함
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox'); //클래스값이 qBox인 것을 선택
    q.innerHTML = qnaList[qIdx].q;     // qnalist의 첫번째 요소에 q를 넣어줌. 나중에 goNext함수 호출할 때는 qIdx값을 1증가->다음 질문 나타남
    
    for(let i in qnaList[qIdx].a){      //answer의 내용으로 버튼을 만듦
        addAnswer(qnaList[qIdx].a[i].answer, qIdx,i);
    } 
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

//시작하기 버튼을 눌렀을 때
//begin()함수 실행되면 main끄고
function begin(){
    main.style.WebkitAnimation="fadeOut 1s";
    main.style.Animation="fadeOut 1s"
    //main이 500초쯤 되었을때 qna페이지 등장
    setTimeout(() => {
        qna.style.WebkitAnimation="fadeIn 1s";
        qna.style.Animation="fadeIn 1s"
        //main애니메이션이 끝났을때 main디스플레이를 끔
        setTimeout(() => {
            main.style.display="none";
            qna.style.display="block";
        },450)
        let qIdx = 0;   //qnaList의 인덱스변수
        goNext(qIdx);
    },450);


    //qna.style.display="block;"
}



