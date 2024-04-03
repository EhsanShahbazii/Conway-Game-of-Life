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
    for (let x = 0; x < width; x++) // مقدار 0 یا 1 به جمعیت ها میدیم
      current_population[y][x] = Math.floor(Math.random() * 2);
  }
};

const countCellNeighbors = (x, y) => {
  let count = 0;
  for (let yf = -1; yf <= 1; yf++) // ستونی شمارش میکنیم
    for (let xf = -1; xf <= 1; xf++) // سطری شمارش میکنیم
      // اگه همسایه سلول ما زنده بود یعنی 1 هست و میشماریم
      count += current_population[(y + yf + height) % height][(x + xf + width) % width];

  return count - current_population[y][x]; // خود سلول رو نمیخوایم بشماریم
};

const updateGeneration = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbors = countCellNeighbors(x, y); // تعداد همسایه های سلول
      let next_state = 0; // پیشفرض حالت بعدی اینه سلول مرده

      if (current_population[y][x] == 0 && neighbors == 3)
        next_state = 1; // سلول مرده وقتی سه تا همسایه داره زنده میشه
      else if (current_population[y][x] == 1 && (neighbors > 3 || neighbors < 2))
        next_state = 0; // سلول زنده وقتی همسایه کمتر از 2 تا یا بیشتر از 3 تا داره میمیره
      else next_state = current_population[y][x]; // سلول دست نخورده باقی میمونه

      next_population[y][x] = next_state;
    }
  }
};

const draw = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // اگه سلول مرده سیاه بشه وگرنه سفید
      ctx.fillStyle = next_population[y][x] == 1 ? "white" : "black"; // رنگ سلول ها سفید
      ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size); // ساخت پیکسل سلول
    }
  }
};

const main = () => {
  updateGeneration();
  // جای جمعیت الان رو با نسل جدید عوض میکنیم
  [current_population, next_population] = [next_population, current_population];
  draw();
  setTimeout(main, 100); // سرعت هر ایترشین رو اعمال میکنیم
};
initialize();
main();
