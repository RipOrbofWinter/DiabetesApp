{

test("Test_1", ()=>{
    //assign
    var text = test.AddTimeStamp();
    expect(text).toBe("test");

});

test("Test_2", ()=>{
    //assign
    var a = 3;
    var b = 2;
    //act
    var test = a + b;
    //assert
    expect(test).toBe(5);  
});
}