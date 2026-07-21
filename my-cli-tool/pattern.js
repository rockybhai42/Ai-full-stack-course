const fs = require('fs');
const text =fs.readFileSync("names.txt","utf-8");


function arrangeAsndOrder(text){
 const ary = text.split("\n");

const sorted =ary.sort((a,b)=> a.localeCompare(b));

return sorted.join("\n")

}


console.log(arrangeAsndOrder(text));