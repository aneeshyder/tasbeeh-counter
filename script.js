const startBtn = document.querySelector('.add-tasbeeh-btn');
const popUp = document.querySelector('.addTasbeehPopup');
const form = document.getElementById('add-tasbeeh');
const counter = document.querySelector('.counter .counter');
const details =  document.querySelector('.tasbeeh-details');
const resetBtn = document.getElementById('reset');

var count = '';
var name = '';


startBtn.addEventListener('click', function(){
    popUp.classList.add('visible');
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    name =  form.querySelector('.name').value;
    count =  form.querySelector('.count').value;
    count = parseInt(count);

    localStorage.setItem('name', name);
    localStorage.setItem('count', count);
    details.innerText = `${name} ${count} times`;

    popUp.classList.remove('visible');
    startBtn.style.display = 'none';
    counter.style.display = 'flex';

    localStorage.setItem('countingItem', 0);
    counter.innerText = 0;

});

function getItems() {
    let getName = localStorage.getItem('name');
    let getCount = parseInt(localStorage.getItem('count'));
    let getCounting = parseInt(localStorage.getItem('countingItem'));

    if (getCounting === getCount || getName === null) {
        reset();
    } else {
        count = getCount;
        name = getName;
        startBtn.style.display = 'none';
        counter.style.display = 'flex';
        counter.innerText = getCounting;

        details.innerText = `${getName} ${getCount} times`;
    }
}

getItems();

function counterFunc(ele){
    let counting = parseInt(ele.innerText);
    localStorage.setItem('countingItem', counting);

    counting++;
    if (counting >= count) {
        alert('Alhumdolillaah, You have recited ' + name + '' + count + ' times');
        reset();
    } else {
        localStorage.setItem('countingItem', counting);
        ele.innerText = counting;
    }
}

counter.addEventListener('click', function(){
    counterFunc(this);
});

resetBtn.addEventListener('click', function(){
    reset();
});

function reset(){
    var count = '';
    var name = '';
    startBtn.style.display = 'block';
    counter.style.display = 'none';
    details.innerText = 'Add Tasbeeh to start';
    localStorage.setItem('countingItem', 0);
    localStorage.setItem('count', 0);
}

  