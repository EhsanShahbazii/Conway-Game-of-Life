const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const width = 300; // طول دنیا
const height = 150; // عرض دنیا

const cell_size = 1; // اندازه سلول ها

let current_population = []; // جمعیت کنونی
let next_population = []; // نسل جدید
