const human = [
    {name : "홍길동", age : 30},
    {name : "홍길순", age : 3},
    {name : "홍길이", age : 18},
    {name : "홍길삼", age : 22}
  ]
  
  //하나라도 조건에 맞으면 true 단 하나도 조건에 안 맞으면 false
  const copy = human.some( i => { return i.age  > 20 });
  
  //원본 배열은 손상되지 않음
  console.log(human);
  console.log(copy); // true