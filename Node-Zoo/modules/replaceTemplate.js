module.exports = (temp, animal) => {
  let output = temp.replaceAll("{%ID%}", animal.id);
  output = output.replaceAll("{%ANIMALNAME%}", animal.animalName);
  output = output.replaceAll('{%IMAGE%}', animal.image);
  output = output.replaceAll("{%FROM%}", animal.from);
  output = output.replaceAll('{%NUTRIENTS%}',animal.nutrients);
  output = output.replaceAll('{%QUANTITY%}', animal.quantity);
  output = output.replaceAll('{%LIFESPAN%}', animal.lifespan);
  if (!animal.conservationStatus)
    output = output.replaceAll('{%NOT_ENDANGERED%}', "not-endangered");
  output = output.replaceAll('{%DESCRIPTION%}', animal.description);
  return output;
};