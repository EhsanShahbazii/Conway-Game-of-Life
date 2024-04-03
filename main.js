const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const width = 300; // طول دنیا
const height = 150; // عرض دنیا

const cell_size = 1; // اندازه سلول ها

let current_population = []; // جمعیت کنونی
let next_population = []; // نسل جدید

const initialize = () => {
  for (let y = 0; y < height; y++) {
    // برا هر خونه آرایه، یه آرایه دیگه ایجاد میکنیم
    current_population[y] = [];
    next_population[y] = [];
    for (
      let x = 0;
      x < width;
      x++ // مقدار 0 یا 1 به جمعیت ها میدیم
    )
      current_population[y][x] = Math.floor(Math.random() * 2);
  }
};

const countCellNeighbors = (x, y) => {
  let count = 0;
  for (
    let yf = -1;
    yf <= 1;
    yf++ // ستونی شمارش میکنیم
  )
    for (
      let xf = -1;
      xf <= 1;
      xf++ // سطری شمارش میکنیم
    )
      // اگه همسایه سلول ما زنده بود یعنی 1 هست و میشماریم
      count +=
        current_population[(y + yf + height) % height][
          (x + xf + width) % width
        ];

  return count - current_population[y][x]; // خود سلول رو نمیخوایم بشماریم
};
