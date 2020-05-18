var testSave = "Default"

function AlertBox(message)
{
  testSave += message
  alert( "Test save now holds this message: " + message );
}

function showData(){
  alert(testSave);
}

function ReturnValue()
{
  return testSave;
}

module.exports = {
  AlertBox,
  showData,
  ReturnValue
}