function num_str_splitter(input){
  let regex_num = /[.\d\/]+/g;
  let regex_str = /[a-zA-Z]+/g;
  let num_input = input.match(regex_num) || ["1"];
  let str_input = input.match(regex_str)[0];
  return [num_input[0],str_input];
};
function check_div(fraction){
  let numbers = fraction.split("/");
  if(numbers.length > 2){
    return false;
  }else{
    return numbers;
  }
}
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = num_str_splitter(input)[0];
    let numbers = check_div(result);
    if (numbers.length === 0) {
      return undefined;
    }
    let num1 = numbers[0];
    let num2 = numbers[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    let isNum = isNaN(num1) || isNaN(num2);
    if (isNum) {
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = num_str_splitter(input)[1].toLowerCase();
    if(result === "km"){
      return "km";
    }else if(result === "gal"){
      return "gal";
    }else if(result === "lbs"){
      return "lbs";
    }else if(result === "mi"){
      return "mi";
    }else if(result === "l"){
      return "L";
    }else if(result === "kg"){
      return "kg";
    }else{
      return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    if(result === "km"){
      return "mi";
    }else if(result === "gal"){
      return "L";
    }else if(result === "lbs"){
      return "kg";
    }else if(result === "mi"){
      return "km";
    }else if(result === "l"){
      return "gal";
    }else if(result === "kg"){
      return "lbs";
    }else{
      return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    if(result === "km"){
      return "kilometers";
    }else if(result === "gal"){
      return "gallons";
    }else if(result === "lbs"){
      return "pounds";
    }else if(result === "mi"){
      return "miles";
    }else if(result === "l"){
      return "liters";
    }else if(result === "kg"){
      return "kilograms";
    }else{
      return "don't know";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    if(unit === "km"){
      result = initNum / miToKm;
      return parseFloat(result.toFixed(5));
    }else if(unit === "gal"){
      result = initNum * galToL;
      return parseFloat(result.toFixed(5));
    }else if(unit === "lbs"){
      result = initNum * lbsToKg;
      return parseFloat(result.toFixed(5));
    }else if(unit === "mi"){
      result = initNum * miToKm;
      return parseFloat(result.toFixed(5));
    }else if(unit === "l"){
      result = initNum / galToL;
      return parseFloat(result.toFixed(5));
    }else if(unit === "kg"){
      result = initNum / lbsToKg;
      return parseFloat(result.toFixed(5));
    }else{
      return undefined;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initRes = `${initNum} ${this.spellOutUnit(initUnit)}`;
    let returnRes = `${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return `${initRes} converts to ${returnRes}`;
  };
  
}

module.exports = ConvertHandler;
