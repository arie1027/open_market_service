    // 탭전환 함수
    const handleTab = (userType) => {
      const buyerButton = document.querySelector('.buyer');
      const sellerButton = document.querySelector('.seller');
      const borderBoxLeft = document.querySelector('.border-box-left');
      const borderBoxRight = document.querySelector('.border-box-right');

      if (userType === 'buyer') {
        buyerButton.classList.add('active');
        sellerButton.classList.remove('active');
        borderBoxLeft.classList.add('active');
        borderBoxRight.classList.remove('active');
        
      } else if (userType === 'seller') {
        sellerButton.classList.add('active');
        buyerButton.classList.remove('active');
        borderBoxRight.classList.add('active');
        borderBoxLeft.classList.remove('active');
      }
    }

    // 로그인 요청 함수
    const handleLogin = (event) => {
      event.preventDefault();

      const caution = document.querySelector('.caution');

      const formData = new FormData(event.target);
      const username = formData.get('username');
      const password = formData.get('password');
      const apiUrl = 'https://estapi.openmarket.weniv.co.kr'

      console.log(username);
      console.log(password);
      
      // 로그인 요청
      fetch(`${apiUrl}/accounts/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          login_type: "BUYER"
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('로그인 실패');
          }
          return response.json();
        })
        // 로그인 성공시 토큰 저장 및 이전 페이지 이동
        .then((data) => {
          console.log('로그인 성공', data);
          console.log(data.access);
          console.log(data.refresh);
          const accessToken = data.access;
          const refreshToken = data.refresh;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          // window.history.back();
        })
        // 로그인 실패시 경고문구 출력
        .catch((error) => {
          console.error(error);
          caution.style.visibility = 'visible';
        });
    };

    // 회원가입 이동 함수
    const navigationToSignUp = () => {
      window.location.href = 'signup.html';
    }