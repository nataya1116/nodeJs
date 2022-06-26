const obj = {
    outside:{
        inside:{
            key:'value',
        },
    },
};

console.dir(obj, {color : false, depth : 2});
console.dir(obj, {color : true, depth : 1});