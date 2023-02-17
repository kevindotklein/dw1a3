const pair = (first) => (second) => {
    return{
        first: first,
        second: second
    };
}

let head = (p) => p.first;
let tail = (p) => p.second;

const pair2array = (xs) => {
    let result = [];
    
    while(xs !== null){
        result.push(head(xs));
        xs = tail(xs);
    }

    return result;
}

const array2pair = (arr) => {
    let result = null;

    let _arr = Array.from(arr).reverse();
    for(let i=0; i<_arr.length; i++){
        result = pair (_arr[i]) (result);
    }

    return result;
}

const range = (start) => (end) => 
    start > end ? null : pair (start) (range (start+1) (end));

const mapf = (f) => (xs) => 
    xs === null ? null
    : pair (f (head(xs))) (mapf (f) (tail (xs)));

const fizzbuzz = (n) =>
    ((n % 3 === 0 ? 'Fizz' : '') + (n % 5 === 0 ? 'Buzz' : '')) || n; //empty string == false in js

const btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    let startRange = document.getElementById("start").value;
    
    let endRange = document.getElementById("end").value;

    let result = pair2array(mapf (fizzbuzz) (range (parseInt(startRange)) (parseInt(endRange))));

    document.getElementById("result").innerHTML = result.join(" ");

})

const source = document.getElementById("source");

source.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "https://github.com/kevindotklein/dw1a3/blob/main/js/fizzbuzz.js";
})
