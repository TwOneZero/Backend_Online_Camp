const getWelcomeTemplate = ({ name, age, school }) => {
  const result = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        <hr />
        <div>이름 : ${name}</div>
        <div>나이 : ${age} </div>
        <div>학교 : ${school}</div>
        <div>가입일 : ${Date.now()}</div>
      </body>
    </html>
  `
  console.log(result);
}

const userInfo = {
  name: '이원영',
  age: '13',
  school: '댕댕',
}

getWelcomeTemplate(userInfo);