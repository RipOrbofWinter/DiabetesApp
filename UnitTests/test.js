//const {AddTimeStamp} = require('../login');

//--- to run the tests Enter ("npm test") in the terminal

test("Test_1", ()=>{
var text = "test";
expect(text).toBe("test");

});

test("Test_2", ()=>{
    var a = 3;
    var b = 2;

    var test = a + b;

    expect(test).toBe(5);
    
});