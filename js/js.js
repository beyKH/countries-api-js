function show(string, lowerOrUpper) {
  console.log(lowerOrUpper(string));
};


show("Asadbek", upperCase);

function lowerCase(string) {
  return string.toLowerCase();
}

function upperCase(string) {
  return string.toUpperCase();
}
