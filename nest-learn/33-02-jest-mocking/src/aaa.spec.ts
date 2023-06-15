// 한개 테스트
it('더하기', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 여러 개 묶어서
describe('test group', () => {
  it('더하기', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

//3. 상품 구매 예제 테스트
describe('Product senario test', () => {
  //모든 단위기능들 실행하기 전에 한번 실행
  // beforeAll(() => {
  // })
  //각 단위 기능들마다 실행
  // beforeEach(() => {
  // })
  it('돈 조회', () => {
    const result = true;
    expect(result).toBe(true);
  });
  it('상품 구매', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
