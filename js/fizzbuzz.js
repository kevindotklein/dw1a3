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

xs = array2pair([1,2,3]);
console.log(xs);