function ReturnValue()
{
  var markedDates = {
    '2020-05-01': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-02': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-03': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-04': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-05': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-06': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-07': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-08': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-09': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-10': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-11': {marked: true, dotColor: 'red', activeOpacity: 0}
  }

  return markedDates;
}

function AlertBox(message){
  alert(message);
}

module.exports = {
  AlertBox,
  ReturnValue
}