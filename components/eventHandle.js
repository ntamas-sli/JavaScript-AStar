const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const reGenBtn = document.querySelector('.btn-regen');
const settings = document.querySelector('.setting');

startBtn.addEventListener('click', () => {
    aStar(1, fieldCol.length - 1);
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

