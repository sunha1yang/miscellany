console.log('a');
setTimeout(()=>{
    console.log('b');
});
Promise.resolve().then(function(){
    console.log(1);
    Promise.resolve().then(function(){
        console.log(2);
        Promise.resolve().then(function(){
            console.log(3);
        });
    });
});
console.log('c');