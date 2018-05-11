let op = {};
var fs = require('fs');
var arrRules = [
    // ["1", "l"],
    // ["l", "1"],
    // ["1", "I"],
    // ["I", "1"],

    // ["6", "b"],
    // ["b", "6"],

    // ["0", "O"],
    // ["O", "0"],
    // ["0", "o"],
    // ["o", "0"],

    // ["s", "$"],
    // ["$", "s"],

    ["y", "i"],
    ["y", "j"],
    ["i", "y"],
    ["c", "ck"],
    ["k", "ck"],
    ["f", "ph"],
    ["ph", "f"],
    ["g", "dzh"],
    ["dzh", "g"],
    ["j", "dzh"],
    ["dzh", "j"],
    ["h", "kh"],
    ["kh", "h"],
    // ["d", "dd"],
    // ["dd", "d"],
    // ["ll", "l"],
    // ["l", "ll"],
    // ["n", "nn"],
    // ["nn", "n"],
    // ["m", "mm"],
    // ["mm", "m"],
    // ["s", "ss"],
    // ["ss", "s"],
    // ["t", "tt"],
    // ["tt", "t"],
    ["o", "ou"],
    ["x", "ks"],
    ["x", "kz"],
    ["x", "gz"],
    ["x", "gs"],
    ["ks", "x"],
    ["kz", "x"],
    ["gz", "x"],
    ["gs", "x"],
    ["qu", "kw"],
    ["qu", "kv"],
    ["q", "c"],
    ["kw", "qu"],
    ["qu", "kw"],
    ["kw", "qu"],
    ["ee", "i"],
    ["ea", "i"],
    ["ts", "c"],
    ["ew", "ju"],
    ["w", "v"],
    ["v", "w"],
    ["u", "yu"],
    ["u", "oo"],
    ["oo", "u"],
    ["u", "ju"],
    ["ju", "u"],
    ["ng", "n"],
    ["-", " "]
];

function fnShowProps(obj) {
    var objName = "obj";
    var result = "";
    for (var i in obj)
        result += objName + "." + i + " = " + obj[i] + "\n";
    alert(result);
}

//removes dublicates from array
function array_unique(arr) {
    var vic = new Object();
    for (i = 0; i < arr.length; i++)
        vic[arr[i]] = "";
    arr = new Array();
    for (i in vic)
        arr[arr.length] = i;
    return arr;
}

function applyRule(Gen, Rule, src, offset) {
    return src.substring(0, Gen['pos'] + offset) + Rule[1] +
        src.substring(Gen['pos'] + offset + Rule[0].length, src.length);
}

//repeats text a number times, str_repeat("-=", 2) = "-=-=";
function str_repeat(text, number) {
    rez = "";
    for (i = 0; i < number; i++)
        rez += text;
    return rez;
}

//repeats text a number times, str_repeat("-=", 2) = "-=-=";
function change_char(text, pos, chr) {
    return text.substring(0, pos) + chr + text.substring(pos + 1, text.length);
}

//counts how often needle is in count, substr_count("SOS", "S") = 2
function substr_count(text, needle) {
    rez = 0;
    len = needle.length;
    if (len > 0) {
        for (i = 0; i < text.length; i++)
            if (text.substring(i, i + len) == needle)
                rez++;
    }
    return rez;
}

function gen(text, isSimple,callback) {
    var arrVariants = new Array();
    var arrGens = new Array(); //array for generations
    var g = 0;
    text = text.toLowerCase();
    len = text.length;
    if(len>30){
        len = 30;
    }
    for (i = 0; i < len; i++) {
        for (key = 0; key < arrRules.length; key++) {
            if (arrRules[key][0] == text.substring(i, i + arrRules[key][0].length)) {
                arrGens[g] = new Object();
                arrGens[g]['z'] = 2;
                arrGens[g]['pos'] = i;
                arrGens[g]['rule'] = key;
                g++;
            }
        }
    }
    var N = arrGens.length;
    var log2 = str_repeat("0", N);
    var arrVariants = new Array();

    if (isSimple) //use simple algorithm
    {
        for (i = 0; i < N; i++)
            arrVariants[arrVariants.length] = applyRule(arrGens[i], arrRules[arrGens[i]['rule']], text, 0);
    } else //use COMBINE, more complex algorithm
    {
        for (f = 0; f < Math.pow(2, N) - 1; f++) {
            var i = 0; // bit index
            var str = text;
            while (1 == arrGens[i]['z']) {
                arrGens[i]['z'] = 0; // modeling of next digit transfer while adding
                log2 = change_char(log2, i, 0);
                i++;
            }
            arrGens[i]['z'] = 1;
            log2 = change_char(log2, i, 1);
            bits = substr_count(log2, "1");
            offset = 0;

            for (t = 0; t < N; t++) {
                if (1 == arrGens[t]['z'] && null != arrGens[t]['rule']) //if 1 - apply rule
                {
                    len = arrRules[arrGens[t]['rule']][1].length;
                    //            if(arrVariants.length==5)
                    //              alert([arrGens[t]['rule'], arrRules[arrGens[t]['rule']][1] ])
                    str = applyRule(arrGens[t], arrRules[arrGens[t]['rule']], str, offset);
                    if (len > 1 && bits > 1) {
                        offset += len - 1;
                    }
                }
            } //for
            arrVariants[arrVariants.length] = str;
        }
    }
    arrVariants = array_unique(arrVariants);
    callback(arrVariants,text);
}


function main(){
    let filename = './Carnivore.json'
    let data = JSON.parse(fs.readFileSync(filename));
    let j = 0;
    let k = 0;
    for(l in data){
            console.log(data[l].dishName);
            gen(data[l].dishName,false,function(genData,index){
                let obj = {}
                obj[index] = genData;
                if(data[l].foodOrientation == 'Veg'){
                    fs.writeFileSync(`./veg/${j}.json`,JSON.stringify(obj,null,2));
                    j++;
                } else {
                    fs.writeFileSync(`./nveg/${k}.json`,JSON.stringify(obj,null,2));
                    k++;
                }
                
            });
            
    }
    console.log(JSON.stringify(op));
}

main();