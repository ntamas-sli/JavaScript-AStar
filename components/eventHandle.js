const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');

startBtn.addEventListener('click', () => {
    aStar(1, fieldCol.length - 1);
    startBtn.style.display = 'none';
});

resetBtn.addEventListener('click', () => {
    matrixGen();
    fieldCol = document.querySelectorAll('.field-col');
    fieldRow = document.querySelectorAll('.field-row');
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
})

