const fs = require('fs');
const text =fs.readFileSync("note.txt","utf-8");
console.log(text);

const newNote = `${process.argv[2]}`
fs.writeFileSync("note.txt",newNote,{flag:"a"});
