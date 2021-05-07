const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const reGenBtn = document.querySelector('.btn-regen');
const stopBtn = document.querySelector('.btn-stop');
const settings = document.querySelector('.setting');
let stopCheck = false;

startBtn.addEventListener('click', () => {
    stopCheck = false;
    stopBtn.style.display = 'inline-block';
    aStar(0, fieldCol.length - 1);
    startBtn.style.display = 'none';
    settings.style.display = 'none';
});
resetBtn.addEventListener('click', () => {
    matrixGen();
    fieldCol = document.querySelectorAll('.field-col');
    fieldRow = document.querySelectorAll('.field-row');
    startBtn.style.display = 'block';
    settings.style.display = 'block';
    resetBtn.style.display = 'none';
});
reGenBtn.addEventListener('click', () => {
    matrixGen();
    fieldCol = document.querySelectorAll('.field-col');
    fieldRow = document.querySelectorAll('.field-row');
    console.log('works');
});
stopBtn.addEventListener('click', () => {
    stopCheck = true;
    resetBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
});
