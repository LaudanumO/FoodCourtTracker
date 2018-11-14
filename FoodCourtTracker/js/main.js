// Your code here!

class Run {
    constructor() {
        this.Recorder = [];
        this.Dist = {};
        this.Friends = {};
    }
    get number() {
        return this.num;
    }
    createTables() {
        let button = document.getElementById("tables");
        let textaria = document.getElementById("num");
        let start = document.getElementById("start");

        button.addEventListener("click", () => {
            button.disabled = true;
            let num = textaria.value;
            for (let i = 1; i <= num; i++) {
                let div = document.createElement("div");
                let button1 = document.createElement("button");
                let button2 = document.createElement("button");
                button1.id = 'occupation' + i.toString();
                button1.disabled = true;
                button2.id = 'cleanliness' + i.toString();
                button2.disabled = true;
                div.innerHTML = 'Table ' + i.toString() + '</br>';
                button1.innerHTML = 'unoccupied';
                button2.innerHTML = 'clean';
                div.id = i.toString();
                start.appendChild(div);
                div.appendChild(button1);
                div.appendChild(button2);
                $(button1).addClass('buutOff');
                $(button2).addClass('buttOff');
                $(div).draggable({ grid: [5, 5] }).addClass('draggable').children().addClass('ignoreme');
            }
            this.num = num;
        });
    }
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
    addCleanEvents() {
        for (let i = 1; i <= this.num; i++) {
            let name = "cleanliness" + i;
            let button = document.getElementById(name);
            let funct = this.myCleanEvent;
            let Frds = this.Friends;
            let recs = this.Recorder;
            button.addEventListener("click", function () {
                funct(i, name, Frds, recs);
            });
        }
    }
    myCleanEvent(i, name, Frds, recs) {
        let button = document.getElementById(name);
        let dt = new Date();
        let d = dt.getTime();
        if (button.innerHTML === 'clean') {            
            $(button).css('background-color', 'cornflowerblue');
            Frds[i]['cleanliness'] = 1;
            recs.push({'tables': Frds, 'timestamp': d});
            button.innerHTML = 'dirty';
        } else if (button.innerHTML === 'dirty') {
            $(button).css('background-color', 'pink');
            $(button).addClass('buttOff').has('buttOn').removeClass('buttOn');
            Frds[i]['cleanliness'] = 0;
            recs.push({ 'tables': Frds, 'timestamp': d });
            button.innerHTML = 'clean';
        }
    }
    addOccupationEvents() {
        for (let i = 1; i <= this.num; i++) {
            let name = "occupation" + i;
            let button = document.getElementById(name);
            let funct = this.myOccupationEvent;
            let Frds = this.Friends;
            let recs = this.Recorder;
            button.addEventListener("click", function () {
                funct(i, name, Frds, recs);
            });
        }
    }
    myOccupationEvent(i, name, Frds, recs) {
        let button = document.getElementById(name);
        let list = [];
        let d = new Date().getTime();
        if (button.innerHTML === 'unoccupied') {
            $(button).css('background-color', 'lightgreen');
            Frds[i]['occupation'] = 1;
            for (let j = 1; Frds.hasOwnProperty(j); j++) {
                console.log(Frds[j]);
                list.push(Frds[j]);
            }
            recs.push({ 'tables': Frds, 'timestamp': d });
            button.innerHTML = 'occupied';
        } else if (button.innerHTML === 'occupied') {
            $(button).css('background-color', 'pink');
            $(button).addClass('buutOff').has('buutOn').removeClass('buutOn');
            Frds[i]['occupation'] = 0;
            recs.push({ 'tables': Frds, 'timestamp': d });
            button.innerHTML = 'unoccupied';
        }
    }
    euclidis(x1, y1, x2, y2) {
        let keyx;
        let keyy;
        if (x1 < x2) {
            keyx = x2 - x1;
        } else {
            keyx = x1 - x2;
        }

        if (y1 < y2) {
            keyy = y2 - y1;
        } else {
            keyy = y1 - y2;
        }
        let ans = parseFloat((1 / (Math.pow(keyx, 2) + Math.pow(keyy, 2))).toFixed(8));
        return ans;
    }
    initFriendList() {
        this.Friends = {};
        for (let i = 1; i <= this.num; i++) {
            this.Friends[JSON.stringify(i)] = {};
            let derp = [];
            let divi = document.getElementById(JSON.stringify(i));
            let cooi = $(divi).position();
            let x1 = cooi.left;
            let y1 = cooi.top;
            this.Dist[i] = [];
            for (let j = 1; j <= this.num; j++) {
                if (j < i || j > i) {
                    let divj = document.getElementById(JSON.stringify(j));
                    let cooy = $(divj).position();
                    let dist = this.euclidis(x1, y1, cooy.left, cooy.top);
                    this.Dist[JSON.stringify(i)].push(dist);
                }
            }
            this.Friends[JSON.stringify(i)]['cleanliness'] = 0;
            this.Friends[JSON.stringify(i)]['occupation'] = 1;
            let name = "occupation" + JSON.stringify(i);
            let button = document.getElementById(name);
            button.disabled = false;
            let name2 = "cleanliness" + JSON.stringify(i);
            let button2 = document.getElementById(name2);
            button2.disabled = false;
            $('button.ignoreme').removeClass('ignoreme');
        }
    }
    writeData(Data, file) {
        function ConvertToCSV(objArray) {
            let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = '';

            for (var i = 0; i < array.length; i++) {
                let line = '';
                for (let index in array[i]) {
                    if (line !== '') {
                        line += ',';

                        line += array[i][index];
                    }
                }

                str += line + '\r\n';
            }

            return str;
        }

        let jsonObject = JSON.stringify(Data);
        let csv = document.getElementById("csv");
        csv.innerHTML = ConvertToCSV(jsonObject);
        let list = [];
        list.push(jsonObject);
        let blob = new Blob(list, {
            type: "text/plain;charset=utf-8;"
        });
        saveAs(blob, file);
    }
    clear_all() {
        for (let i = 1; i <= this.num; i++) {
            let name = 'cleanliness' + i;
            let button = document.getElementById(name);
            button.disabled = true;
        }
        for (let i = 1; i <= this.num; i++) {
            let name = 'occupation' + i;
            let button = document.getElementById(name);
            button.disabled = true;
        }
        console.log(this.Friends);
        let go = prompt("hey");
        this.writeData(this.Recorder, "RecorderAndFriends.txt");
        this.writeData(this.Dist, "Dist.txt");
    }    
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var runner;
function rungo() {
    let stop = document.getElementById("stop");
    runner = new Run;
    runner.createTables();
    buttoner(runner);
    stop.addEventListener("click", function () { runner.clear_all(); });

}
function buttoner(runner) {
    let start = document.getElementById("start");
    let but = document.createElement("button");
    but.id = 'makeFriends';
    but.innerHTML = 'makeFriends';
    start.appendChild(but);
    but.addEventListener('click', () => {
        runner.initFriendList();
        console.log(runner.Friends);
        runner.addCleanEvents();
        runner.addOccupationEvents();
        but.disabled = true;
    });
}
window.onload = rungo();