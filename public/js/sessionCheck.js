    //사용자 로그인 체크 함수
    function userSessionCheck() {

      firebaseEmailAuth.onAuthStateChanged(function (user) {
        
        if (user) {
          firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
            
            document.getElementById("loginmenu").textContent = "logout";
            document.getElementById("loginmenu").href = "/logout.html";

            name = snapshot.val().name;   
            email = snapshot.val().email;  
            loginUserKey = snapshot.key; 
            userInfo = snapshot.val();
            userHeight = snapshot.val().height
            userWeight = snapshot.val().weight
            
            if(document.getElementById("titleCheck").textContent=="mypage"){

                              document.getElementById("userName").textContent = name
                              document.getElementById("userEmail").textContent = email
                              document.getElementById("height").textContent = userHeight
                              document.getElementById("weight").textContent = userWeight

            }else{
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