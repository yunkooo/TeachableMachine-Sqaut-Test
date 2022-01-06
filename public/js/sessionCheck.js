    //유저가 로그인 했는지 안했는지 확인해주는 함수
    function userSessionCheck() {
      // console.log(currentTime);
      //로그인이 되어있으면 - 유저가 있으면, user를 인자값으로 넘겨준다.
      firebaseEmailAuth.onAuthStateChanged(function (user) {
        
        if (user) {
          //조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어 있는 user의 pk key 값을 이용해서 가져오기
          firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
            
            //자바스크립트 dom 선택자를 통해서 네비게이션 메뉴의 엘리먼트 변경해주기
            document.getElementById("loginmenu").textContent = "logout";
            document.getElementById("loginmenu").href = "/logout.html";


            name = snapshot.val().name;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
            email = snapshot.val().email;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
            loginUserKey = snapshot.key;  //로그인한 유저의 key도 계속 쓸 것이기 때문에 전역변수로 할당
            userInfo = snapshot.val(); //snapshot.val()에 user 테이블에 있는 해당 개체 정보가 넘어온다. userInfo에 대입!
            userHeight = snapshot.val().height
            userWeight = snapshot.val().weight
            
            //이부분까지 index.html에 해당하는 로직 이후에 엘리멘트 id로 mypage인지 메인 페이지인지 구분
            //mypage에서 호출했다면
            if(document.getElementById("titleCheck").textContent=="mypage"){
                              //1.닉네임 변경하기
                              document.getElementById("userName").textContent = name
                              document.getElementById("userEmail").textContent = email
                              document.getElementById("height").textContent = userHeight
                              document.getElementById("weight").textContent = userWeight

                          
              
            }else{
            //index.html에서 호출 했다면
            //alert(userInfo.userid);  //uid는 db에서 user 테이블의 각 개체들의 pk 인데, 이 값은 인증에서 생성된 아이디의 pk 값과 같다. *중요!
            //감사리스트 호출
            // thanksList();
            return true
            }

          });

        } else {
          alert("로그인 해주세요.")
          window.location = '/index.html'
          return;
        }
      });
    }