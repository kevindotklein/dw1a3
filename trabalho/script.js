const newTransaction = document.getElementById('new-transaction');
const cancelNewTransaction = document.getElementById('cancel-new-transaction');

newTransaction.addEventListener('click', (e) => {
    modal.open();
});

cancelNewTransaction.addEventListener('click', (e) => {
    modal.close();
})

const modal = {
    open: () => {
        document.querySelector('.modal-overlay').classList.add('active');
    },

    close: () => {
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}