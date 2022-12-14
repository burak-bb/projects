
it('should calculate the monthly rate correctly', function () {
  const value = {
    amount: 30000,
    years: 10,
    rate: 5
  }
  expect(calculateMonthlyPayment(value)).toEqual("318.20")
});


it("should return a result with 2 decimal places", function() {
  const value = {
    amount: 1000,
    years: 10,
    rate: 10
  }
  expect(calculateMonthlyPayment(value)).toEqual("13.22")
});

it("should be able to calculate high rates", function () {
  const value = {
    amount: 30000,
    years: 5,
    rate: 115
  }
  expect(calculateMonthlyPayment(value)).toEqual("2886.91")
});
