 //수정, 저장하기 버튼 눌렀을 때 작동하는 함수
 function changeButtonAction(){
    console.log("버튼이 눌렀습니다");
    var changeBtn = document.getElementById("changeBtn");
    var changeBtnText = changeBtn.textContent; //버튼의 text제목을 가져온다.
    
    //버튼이 수정하기 버튼이면
    if (changeBtnText == "수정하기") {

        //기존에 한줄 메시지 없애주고, 새로운 input text 붙여주기
        var heightParent = document.getElementById("heightP");
        var heightChild = document.getElementById("height");

        var weightParent = document.getElementById("weightP");
        var weightChild = document.getElementById("weight");
        heightParent.removeChild(heightChild);
        weightParent.removeChild(weightChild);
        console.log("한줄 메시지가 들어있는 p 태그 삭제 완료");

        //한줄 메시지 적을 textarea 창 활성화
        var heightTextarea = "<textarea class=\"form-control\" rows=\"1\" id=\"height\"></textarea>";
        var weightTextarea = "<textarea class=\"form-control\" rows=\"1\" id=\"weight\"></textarea>";
        $("#heightP").append(heightTextarea);
        $("#weightP").append(weightTextarea);

        console.log("한줄 메시지 적을 textarea 창 활성화 완료");

        //저장하기 버튼 활성화
        changeBtn.textContent = "저장하기"
        changeBtn.className = "btn btn-success"; //bootstrap 클래스 속성 변경해주기

    } else {
        console.log("저장 버튼 - input file 사라지게 input text태그 사라지고 p 태그에 넣고 저장버튼 비활성화 수정버튼 활성화를 시작합니다");

        //저장하기 함수 호출
        console.log("저장하기 함수 호출");


        var changeHeight = document.getElementById("height").value;
        var changeWeight = document.getElementById("weight").value;

        console.log(height)
        console.log(weight)

        var saveCheck = stateSave(changeHeight, changeWeight);

        if(saveCheck){
            var heightParent = document.getElementById("heightP");
            var heightChild = document.getElementById("height");
            heightParent.removeChild(heightChild);
            console.log("여기")
            var weightParent = document.getElementById("weightP");
            var weightChild = document.getElementById("weight");
            weightParent.removeChild(weightChild);


    
            //p태그에 수정한 한줄 메시지 넣어주기
            var heightHtml = "<p id=\"height\">" + changeHeight + "</p>";
            var weightHtml = "<p id=\"weight\">" + changeWeight + "</p>";
            $("#heightP").append(heightHtml);
            $("#weightP").append(weightHtml);
            console.log("할줄메시지가 들어있는 p 태그 활성화");

            changeBtn.textContent = "수정하기"
            changeBtn.className = "btn btn-warning";

            console.log("저장되었습니다");

        }

    }
}



function stateSave(height,weight) {
    firebaseEmailAuth.onAuthStateChanged(function (user){
        if(user){
            firebaseDatabase.ref("users/" + user.uid).once('value').then(function(snapshot){
                name = snapshot.val().name;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
                email = user.email;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
                loginUserKey = snapshot.key;  //로그인한 유저의 key도 계속 쓸 것이기 때문에 전역변수로 할당
                userInfo = snapshot.val(); //snapshot.val()에 user 테이블에 있는 해당 개체 정보가 넘어온다. userInfo에 대입!
                userHeight = snapshot.val().height
                userWeight = snapshot.val().weight
                userRef = firebaseDatabase.ref("users/" + loginUserKey);
                var obj = {
                    name: name,
                    email: email,
                    height: height,
                    weight: weight,
                };
                userRef.update(obj)
            })
                  
        }

  
    })
    return true;

}


    
