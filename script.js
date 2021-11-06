const startBtn = document.querySelector('.add-tasbeeh-btn');
const popUp = document.querySelector('.addTasbeehPopup');
const form = document.getElementById('add-tasbeeh');
const counter = document.querySelector('.counter .counter');
const details =  document.querySelector('.tasbeeh-details');
const resetBtn = document.getElementById('reset');
const nameInput = document.getElementById('name');
const countInput = document.getElementById('count');
const cancel = document.querySelector('button.cancel');
const submit = document.querySelector('#add-tasbeeh input[type="submit"]');
const notify = document.getElementById('notify');
const sound_btn = document.getElementById('sound');

var count = '';
var name = '';
let errors = {
    name: false,
    count: false,
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === '' || input.value.trim() == 0){
            showError(input, `${getFieldName(input)} is Required`);
            errors[input.id] = false;
            return false;
        } else {
            showSuccess(input);
            errors[input.id] = true;
        }
    });
}

startBtn.addEventListener('click', function(){
    popUp.classList.add('visible');
});

submit.addEventListener('click', function(e){
    e.preventDefault();

    checkRequired([nameInput, countInput ]);

    if (errors.count && errors.name) {

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
    }

});

function setItems() {
    let getName = localStorage.getItem('name');
    let getCount = parseInt(localStorage.getItem('count'));
    let getCounting = parseInt(localStorage.getItem('countingItem'));
 
    switch ( getSoundStatus()) {
        case 'true':
           sound_btn.checked = false;
        break;
        case 'false':
           sound_btn.checked = true;
        break;
        default:
           sound_btn.checked = false;
    }

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

setItems();

function counterFunc(ele){
    let counting = parseInt(ele.innerText);
    localStorage.setItem('countingItem', counting);

    counting++;
    if (counting >= count) {
        navigator.vibrate(200);
        if ( getSoundStatus() === 'true' || getSoundStatus() === null ) {
            notify.play();
        }        
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
 
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


cancel.addEventListener('click', function(e){
    reset();
});

sound_btn.addEventListener('change', function(){
    if( this.checked ) {
       localStorage.setItem('playSound', false);
    } else {
        localStorage.setItem('playSound', true);
    }
});


function getSoundStatus() {
    let soundStatus = localStorage.getItem('playSound');
    return soundStatus;
}