let submit = document.querySelector('.guessSubmit');
let num = document.querySelector('.blank');
let real = Math.ceil((Math.random()*100)+1);
let former = document.querySelector('.guess');
let last = document.querySelector('.preResult');
let con = document.querySelector('.lowHi');
let counter = document.querySelector('.chance');
let n = [];
let round = 0;
let count= 6;
let replace;
console.log(real);
submit.addEventListener('click',function(){
    last.style.width='300px';
    let ans = Number(num.value);
    if(ans===real){
        console.log("Correct");
        last.textContent='Correct!!!';
        last.style.backgroundColor='orange';
        gameOver();  
    }
    else{
        n.push(ans);
        console.log(n[round]);
        num.value='';
        num.focus();
        if(round===0){
            former.textContent='Previous guesses : ';
            counter.textContent='Chance left: '+String(count);
        }
        if(n[round]>real){
            if(count===0){
                last.textContent='Try Again.  '+'Answer is '+String(real);
                last.style.backgroundColor='pink';
                counter.textContent='Chance left: '+String(count);
                gameOver();
            }
            else{
            last.textContent='Wrong!!! too high!!!';
            last.style.backgroundColor='yellow';
            counter.textContent='Chance left: '+String(count);
            }
        }
        if(n[round]<real){
            if(count===0){
                last.textContent='Try Again.  '+'Answer is '+ String(real);
                last.style.backgroundColor='pink';
                counter.textContent='Chance left: '+String(count);
                gameOver();
            }
            else{
            last.textContent='Wrong!!! too low!!!';
            last.style.backgroundColor='red';
            counter.textContent='Chance left: '+String(count);
            }
        }
        former.textContent+='  '+String(n[round]);
        round++;
        count--;   
    }
});
function gameOver(){
    submit.disabled = true;
    num.disabled = true;
    replace = document.querySelector('.popup');
    rebutton = document.createElement('button');
    rebutton.textContent='New Game';
    replace.appendChild(rebutton);
    rebutton.addEventListener('click',reset);
}
function reset(){

    submit.disabled = false;
    num.disabled = false;
    rebutton.parentNode.removeChild(rebutton);

    let reall = document.querySelectorAll('.result p')
    for(let i =0 ;i<reall.length;i++){
        reall[i].textContent='';
    }

    num.value='';
    num.focus();
    last.style.backgroundColor='white';
    n=[];
    round=0;
    count=6;
    real = Math.floor((Math.random()*100)+1);
    console.log(real);
}