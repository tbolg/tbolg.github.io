"use strict";

function createPatternAt(x, y, pattern) {
    let z = 0
    let i = 0
    let j = 0
    while (z < pattern._binaryString.length) {
            // 
            if (pattern._binaryString[z] == '$') {
                j++
                i = 0
            } else {
                grid[y+i][x+j] = parseInt(pattern._binaryString[z])
                i++ 
            }
            z++
        }
}

function decodeRLE(rleString) {
    let decoded = ''
    let count = ''
    let sum = 0
    for (let i = 0; i < rleString.length; i++) {
        if (!isNaN(rleString[i])) {
            count += rleString[i]
        }
        else if (count == '') {
            if (rleString[i] == 'b') {
                decoded += '0'
                sum += 1
            } else if (rleString[i] == 'o') {
                decoded += '1' 
                sum += 1
            }
            else if (rleString[i] == '$') {
                decoded += '$'
            }
        }
        else {
            if (rleString[i] == 'b') {
                decoded += '0'.repeat(parseInt(count))
                sum += parseInt(count)
            } else {
                decoded += '1'.repeat(parseInt(count)) 
                sum += parseInt(count)
            }
           
            count = ''
        }
    }
    return decoded
}


let oscillatorOne = '22b2o19bo2bo22b$22bobo18b4o22b$24bo3bo2bo2bo2bo2bo6b2o15b2o3b$23b2ob21o2bob2obo2bo2bo3bo4b$18b2o2bo2bo22bo3bob4o2b3obo4b$14b2obobo2b2o2b3o2b3o2b3o2b3o2b2ob2o7b2o3bob2o2b$b2o2b2o3b2o3bobo6b2o4b2o3b2o3b2o5bobob5o2bo2bo3bo2bo$bo3bobo2bo3bo3bo3b2o2b2o3b3o2b3o2b3ob2o3bo3bo4bob2o2bob2o$2b3o2bo3bo2b5o2bo4bo19bo5b4o2bo5b2o3b$4bobob4o5b2o3bobob2o3b3o2b3o2b3ob2o3bo3bo4bob2o2bob2o$6bobo3b5o2bo2bo7b2o3b2o3b2o5bobob5o2bo2bo3bo2bo$6bo2bobo6bobob7o2b3o2b3o2b3o2b2ob2o7b2o3bob2o2b$3bo2bo2bo2bobo2b4obo25bo3bob4o2b3obo4b$3b2obob2o4bo7bob23o2bob2obo2bo2bo3bo4b$3bobo3bobo4b6obo4bo2bo2bo2bo2bo6b2o15b2o3b$bobobob2o2b5o5bobobo17b4o22b$obo3bo2b2o4bob2o2bo2b2o17bo2bo22b$bo5bobo2bo3b2obobo47b$8bo2b2o7bo!'

let lightSpeedOscillator = '61bo11b$59b3o11b$56bobo3b2o9b$54b3ob4o2bob2o5b$53bo7bob2obo6b$52bob5obo2bo2bo2bo3b$14b2o36b2o3bob2o2bobob3o3b$14b2o34b2o3bo8bobo6b$49bobob2obo8bo2b2o3b$14b4o3b2o26bo2bobobo5bo3b3obo2b$14bo3bo2bo28bobo2b2o4bobo6bo2b$17bobobo29bo2b2o6bo5b2ob2o$17b3obobo22b2o6b3o9b2obobob$19bob2obo21bobo5b2o10bo2bobob$6b2ob2o7bo5bo23bo2b2o14bob2o2b$6b2obo7b2ob5ob2o17bo2b5o13b2o5b$9bo16b2o17b3o4bo7bob3o2bob2o2b$9bob2o2bo4bob3o5bo2bo2bo2bo2bo5bo2bo7b4o2bobobo3b$10bobob2o3bo5b23obo9b3ob2o2bobo3b$11b3o4bo6bo25bo12bobobo4b$15bobo4bo3bo2b3o2b3o2b3o2b5o2b2o3b3o3b2o2b2o5b$9b5obo6bo3b2o3b2o3b2o3b2o4bo4b2obob2o2bo2b2o7b$9bo3bobobo2b2o2b3o2b3o2b3o2b3o2b5o8bo4bo2bo7b$12bo2bobo6bo29bo2bo5b2o8b$13b3obo4b2ob23o2bobo2bob3o13b$18b2o2bobo2bo2bo2bo2bo2bo2bo2bo2bob3obobo3bo12b$15b2obob3obo23bobobobobo2b2o12b$15b2obo2bo2b2o21b2obobobob2o15b$18bo5bo23bobobobo18b$18bobobobo23bo5bo18b$17b2obobob2o21b2o2bo2b2o17b$18bob3obo23bob3obo18b$18bo2bo2bo23bobobobo18b$17b2o5b2o21b2obobob2o17b$18bobobobo23bo5bo18b$18bobobobo23bo2bo2bo18b$17b2ob3ob2o21b2ob3ob2o17b$18bo2bo2bo23bobobobo18b$18bo5bo23bobobobo18b$17b2obobob2o21b2o5b2o17b$18bobobobo23bo2bo2bo18b$18bob3obo23bob3obo18b$17b2o2bo2b2o21b2obobob2o17b$18bo5bo23bobobobo18b$18bobobobo23bo5bo18b$15b2obobobob2o21b2o2bo2bob2o15b$12b2o2bobobobobo23bob3obob2o15b$12bo3bobob3obo2bo2bo2bo2bo2bo2bo2bo2bobo2b2o18b$13b3obo2bobo2b23ob2o4bob3o13b$8b2o5bo2bo29bo6bobo2bo12b$7bo2bo4bo8b5o2b3o2b3o2b3o2b3o2b2o2bobobo3bo9b$7b2o2bo2b2obob2o4bo4b2o3b2o3b2o3b2o3bo6bob5o9b$5b2o2b2o3b3o3b2o2b5o2b3o2b3o2b3o2bo3bo4bobo15b$4bobobo12bo25bo6bo4b3o11b$3bobo2b2ob3o9bob23o5bo3b2obobo10b$3bobobo2b4o7bo2bo5bo2bo2bo2bo2bo5b3obo4bo2b2obo9b$2b2obo2b3obo7bo4b3o17b2o16bo9b$5b2o13b5o2bo17b2ob5ob2o7bob2o6b$2b2obo14b2o2bo23bo5bo7b2ob2o6b$bobo2bo10b2o5bobo21bob2obo19b$bobob2o9b3o6b2o22bobob3o17b$2ob2o5bo6b2o2bo29bobobo17b$2bo6bobo4b2o2bobo28bo2bo3bo14b$2bob3o3bo5bobobo2bo26b2o3b4o14b$3b2o2bo8bob2obobo49b$6bobo8bo3b2o34b2o14b$3b3obobo2b2obo3b2o36b2o14b$3bo2bo2bo2bob5obo52b$6bob2obo7bo53b$5b2obo2b4ob3o54b$9b2o3bobo56b$11b3o59b$11bo'

let linePuffer = '34b3o27b3o13b3o27b3o43b$33bo3bo25bo3bo11bo3bo25bo3bo42b$32b2o4bo11bo11bo4b2o9b2o4bo11bo11bo4b2o41b$31bobob2ob2o3b4ob2ob2ob4o3b2ob2obobo7bobob2ob2o3b4ob2ob2ob4o3b2ob2obobo40b$30b2obo4bob2ob4o7b4ob2obo4bob2o5b2obo4bob2ob4o7b4ob2obo4bob2o39b$29bo4bo3bo4bo2b2obobob2o2bo4bo3bo4bo3bo4bo3bo4bo2b2obobob2o2bo4bo3bo4bo38b$6bo17bo16bo4bo7bo4bo27bo4bo7bo4bo25bo17bo6b$5b3o15b3o3b2o7b2o6bo7bo6b2o7b2o3b2o7b2o6bo7bo6b2o7b2o12b3o15b3o5b$3b2ob3o13b3ob2o100b2ob3o13b3ob2o3b$4bo2bob2o4bo4b2obo2bo18b2o7b2o35b2o7b2o27bo2bob2o4bo4b2obo2bo4b$b2obo4bobob2ob2obobo4bob2o17bo5bo39bo5bo26b2obo4bobob2ob2obobo4bob2ob$b2obobo2bobo7bobo2bobob2o15bo2bo3bo2bo35bo2bo3bo2bo24b2obobo2bobo7bobo2bobob2ob$bo8b3obobob3o8bo16bo2bobo2bo37bo2bobo2bo25bo8b3obobob3o8bob$2o7b2o9b2o7b3obo15bobo43bobo24bob3o7b2o9b2o7b2o$33b2o12bobobobo39bobobobo21b2o33b$31b2obo11b2obobob2o37b2obobob2o20bob2o31b$34b2o9bo3bobo3bo35bo3bobo3bo18b2o34b$33bo88bo33b$35b3o7b2ob2ob2ob2o35b2ob2ob2ob2o16b3o35b$7b3o15b3o9b2o78b2o9b3o15b3o7b$6bo3bo13bo3bo9bo7bo3bo3bo37bo3bo3bo16bo9bo3bo13bo3bo6b$5b2o4bo11bo4b2o8b2o6bo3bo3bo7b3o9b3o9b3o3bo3bo3bo4b3o8b2o8b2o4bo11bo4b2o5b$4bobob2ob2o3b3o3b2ob2obobo8bo21bo3bo7bo3bo7bo3bo14bo3bo7bo8bobob2ob2o3b3o3b2ob2obobo4b$3b2obo4bob2ob3ob2obo4bob2o6bobo5b2o5b2o5b2o3b2o5b2o3b2o5b2o3b2o5b2o5b2o3b2o5bobo6b2obo4bob2ob3ob2obo4bob2o3b$2bo4bo3bo4bobo4bo3bo4bo6b3o3b4o3b4o3b2obobob2o3b2obobob2o3b2obobob2o3b4o3b2obobob2o3b3o6bo4bo3bo4bobo4bo3bo4bo2b$14bo5bo20b2ob2o2b2ob2o2b2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2o2b2ob2ob2ob2ob2ob2o20bo5bo14b$2b2o7b2o9b2o7b2ob3o5bobo4bobo4bobo3bobo3bobo3bobo3bobo3bobo3bobo4bobo3bobo3bobo5b3ob2o7b2o9b2o7b2o2b$36bo82bo36b$34bo6b2ob2o2b2ob2o2b2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2o2b2ob2ob2ob2ob2ob2o6bo34b$34bob2o80b2obo34b$39b78o39b$38bo78bo'

let fly = '2bo31b$bobo30b$bobo22bobo3bob$bo23b2obobo2bo$11b3o8bo9bob$2o9b2o2bob2o3bo2b4o5b$bobo9b4o2bobo2b2o4b2o2b$b2o8bo2bo3b3o5b3o5b$2bo7bo4bo2b2o2b2o2bo2bo4b$3bo2bo3bo4bo2b3obobo4b2o3b$7bob2o4bo2b4o5bo6b$4b2o3b2o4bo2b4o5bo6b$4bobo3bo4bo2b3obobo4b2o3b$3b2o5bo4bo2b2o2b2o2bo2bo4b$4bobo4bo2bo3b3o5b3o5b$5bo7b4o2bobo2b2o4b2o2b$11b2o2bob2o3bo2b4o5b$11b3o8bo9bob$25b2obobo2bo$26bobo3bo'

let piporTraitor = '11b2o11b$6b2obo4bob2o6b$6bo10bo6b$7b2o6b2o7b$4b3o2b6o2b3o4b$4bo2bo8bo2bo4b$b2obobo10bobob2ob$bobobo12bobobob$3bo16bo3b$bo2bo14bo2bob$4bo7b3o4bo4b$o3bo7bobo4bo3bo$o3bo7bobo4bo3bo$4bo14bo4b$bo2bo14bo2bob$3bo16bo3b$bobobo12bobobob$b2obobo10bobob2ob$4bo2bo8bo2bo4b$4b3o2b6o2b3o4b$7b2o6b2o7b$6bo10bo6b$6b2obo4bob2o6b$11b2o'

let largeSquareBrush = '11o$11o$11o$11o$11o$11o$11o$11o$11o$11o$11o'
let largeCircleBrush = '4b4o4b$2b8o2b$1b10o1b$1b10o1b$12o$12o$12o$12o$1b10o1b$1b10o1b$2b8o2b$4b4o4b'

class Pattern {
    
    constructor(rleString, name) {
        this._binaryString = decodeRLE(rleString);
        this._name = name;
    }
    
}

let piporTraitorPattern = new Pattern(piporTraitor, "Piportraitor");
let lightSpeedPattern = new Pattern(lightSpeedOscillator, "Light Speed Oscillator");
let oscillatorOnePattern = new Pattern(oscillatorOne, "Oscillator One");
let linePufferPattern = new Pattern(linePuffer, "Line Puffer");
let flyPattern = new Pattern(fly, "Fly");
let largeSquareBrushPattern = new Pattern(largeSquareBrush, "Large Square Brush");
let largeCircleBrushPattern = new Pattern(largeCircleBrush, "Large Circle Brush");


let patternList = [piporTraitorPattern, linePufferPattern, flyPattern, largeSquareBrushPattern, largeCircleBrushPattern, oscillatorOnePattern, lightSpeedPattern];