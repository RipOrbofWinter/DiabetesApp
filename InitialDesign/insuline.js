var weight = 0;
var sugar = 0;

function setWeight(data)
{
  weight = data
}

function setSugar(data)
{
  sugar = data
}

function getWeight()
{
  return weight;
}
function getSugar()
{
  return sugar;
}

module.exports = {
  setWeight,
  setSugar,
  getWeight,
  getSugar
}