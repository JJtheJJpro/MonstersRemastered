const div = () => document.createElement("div");
const p = () => document.createElement("p");
const table = () => document.createElement("table");
const tbody = () => document.createElement("tbody");
const td = () => document.createElement("td");
const th = () => document.createElement("th");
const thead = () => document.createElement("thead");
const tr = () => document.createElement("tr");

const root = document.getElementById("root")!;

let inputtype: 0 | 1 | 2 = 1;
let keyguide = false;
let datamode = false;

let n1 = "Monster 1";
let n2 = "Monster 2";
let n3 = "Monster 3";
let n4 = "Monster 4";
let n5 = "Monster 5";
let n6 = "Monster 6";
let n7 = "Monster 7";
let n8 = "Monster 8";
let n9 = "Monster 9";
let n10 = "Monster 10";

let monstdata: boolean[] = [
    false, false, false, false, false, false, false, false, false, false, // P
    false, false, false, false, false, false, false, false, false, false, // A
    false, false, false, false, false, false, false, false, false, false, // X
    false, false // D, G
];

// 0
let _0 = div();
_0.className = "main";

// 00
let _00 = p();
_00.className = "title";
_00.innerHTML = "Monster Controller";
_0.appendChild(_00);

// 01
let _01 = p();
_01.className = "subtitle";
_01.innerHTML = "v0.1.0 Frontend JS";
_0.appendChild(_01);

root.appendChild(_0);

// 1
let _1 = div();
_1.className = "interface";

// 10
let _10 = table();
_10.className = "interface";

// thead
let _10h = thead();

// 100
let _100 = tr();
_100.className = "interface h";

// 1000
let _1000 = th();
_1000.className = "interface";
_1000.addEventListener('dblclick', e => {
    _1000.innerHTML = `${n1 = prompt('Input the name of the monster') ?? n1}${keyguide ? ' (1)' : ''}`;
});
_100.appendChild(_1000);

// 1001
let _1001 = th();
_1001.className = "interface";
_1001.addEventListener('dblclick', e => {
    _1001.innerHTML = `${n2 = prompt('Input the name of the monster') ?? n2}${keyguide ? ' (2)' : ''}`;
});
_100.appendChild(_1001);

// 1002
let _1002 = th();
_1002.className = "interface";
_1002.addEventListener('dblclick', e => {
    _1002.innerHTML = `${n3 = prompt('Input the name of the monster') ?? n3}${keyguide ? ' (3)' : ''}`;
});
_100.appendChild(_1002);

// 1003
let _1003 = th();
_1003.className = "interface";
_1003.addEventListener('dblclick', e => {
    _1003.innerHTML = `${n4 = prompt('Input the name of the monster') ?? n4}${keyguide ? ' (4)' : ''}`;
});
_100.appendChild(_1003);

// 1004
let _1004 = th();
_1004.className = "interface";
_1004.addEventListener('dblclick', e => {
    _1004.innerHTML = `${n5 = prompt('Input the name of the monster') ?? n5}${keyguide ? ' (5)' : ''}`;
});
_100.appendChild(_1004);

// 1005
let _1005 = th();
_1005.className = "interface";
_1005.addEventListener('dblclick', e => {
    _1005.innerHTML = `${n6 = prompt('Input the name of the monster') ?? n6}${keyguide ? ' (6)' : ''}`;
});
_100.appendChild(_1005);

// 1006
let _1006 = th();
_1006.className = "interface";
_1006.addEventListener('dblclick', e => {
    _1006.innerHTML = `${n7 = prompt('Input the name of the monster') ?? n7}${keyguide ? ' (7)' : ''}`;
});
_100.appendChild(_1006);

// 1007
let _1007 = th();
_1007.className = "interface";
_1007.addEventListener('dblclick', e => {
    _1007.innerHTML = `${n8 = prompt('Input the name of the monster') ?? n8}${keyguide ? ' (8)' : ''}`;
});
_100.appendChild(_1007);

// 1008
let _1008 = th();
_1008.className = "interface";
_1008.addEventListener('dblclick', e => {
    _1008.innerHTML = `${n9 = prompt('Input the name of the monster') ?? n9}${keyguide ? ' (9)' : ''}`;
});
_100.appendChild(_1008);

// 1009
let _1009 = th();
_1009.className = "interface";
_1009.addEventListener('dblclick', e => {
    _1009.innerHTML = `${n10 = prompt('Input the name of the monster') ?? n10}${keyguide ? ' (0)' : ''}`;
});
_100.appendChild(_1009);

_10h.appendChild(_100);

_10.appendChild(_10h);

// tbody
let _10b = tbody();

// 101
let _101 = tr();
_101.className = "interface";

// 1010
let _1010 = td();
_1010.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(0, !monstdata[0], _1010);
    }
});
_101.appendChild(_1010);

// 1011
let _1011 = td();
_1011.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(1, !monstdata[1], _1011);
    }
});
_101.appendChild(_1011);

// 1012
let _1012 = td();
_1012.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(2, !monstdata[2], _1012);
    }
});
_101.appendChild(_1012);

// 1013
let _1013 = td();
_1013.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(3, !monstdata[3], _1013);
    }
});
_101.appendChild(_1013);

// 1014
let _1014 = td();
_1014.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(4, !monstdata[4], _1014);
    }
});
_101.appendChild(_1014);

// 1015
let _1015 = td();
_1015.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(5, !monstdata[5], _1015);
    }
});
_101.appendChild(_1015);

// 1016
let _1016 = td();
_1016.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(6, !monstdata[6], _1016);
    }
});
_101.appendChild(_1016);

// 1017
let _1017 = td();
_1017.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(7, !monstdata[7], _1017);
    }
});
_101.appendChild(_1017);

// 1018
let _1018 = td();
_1018.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(8, !monstdata[8], _1018);
    }
});
_101.appendChild(_1018);

// 1019
let _1019 = td();
_1019.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(9, !monstdata[9], _1019);
    }
});
_101.appendChild(_1019);

_10b.appendChild(_101);

// 102
let _102 = tr();
_102.className = "interface";

// 1020
let _1020 = td();
_1020.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(10, !monstdata[10], _1020);
    }
});
_102.appendChild(_1020);

// 1021
let _1021 = td();
_1021.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(11, !monstdata[11], _1021);
    }
});
_102.appendChild(_1021);

// 1022
let _1022 = td();
_1022.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(12, !monstdata[12], _1022);
    }
});
_102.appendChild(_1022);

// 1023
let _1023 = td();
_1023.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(13, !monstdata[13], _1023);
    }
});
_102.appendChild(_1023);

// 1024
let _1024 = td();
_1024.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(14, !monstdata[14], _1024);
    }
});
_102.appendChild(_1024);

// 1025
let _1025 = td();
_1025.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(15, !monstdata[15], _1025);
    }
});
_102.appendChild(_1025);

// 1026
let _1026 = td();
_1026.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(16, !monstdata[16], _1026);
    }
});
_102.appendChild(_1026);

// 1027
let _1027 = td();
_1027.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(17, !monstdata[17], _1027);
    }
});
_102.appendChild(_1027);

// 1028
let _1028 = td();
_1028.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(18, !monstdata[18], _1028);
    }
});
_102.appendChild(_1028);

// 1029
let _1029 = td();
_1029.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(19, !monstdata[19], _1029);
    }
});
_102.appendChild(_1029);

_10b.appendChild(_102);

// 103
let _103 = tr();
_103.className = "interface";

// 1030
let _1030 = td();
_1030.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(20, !monstdata[20], _1030);
    }
});
_103.appendChild(_1030);

// 1031
let _1031 = td();
_1031.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(21, !monstdata[21], _1031);
    }
});
_103.appendChild(_1031);

// 1032
let _1032 = td();
_1032.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(22, !monstdata[22], _1032);
    }
});
_103.appendChild(_1032);

// 1033
let _1033 = td();
_1033.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(23, !monstdata[23], _1033);
    }
});
_103.appendChild(_1033);

// 1034
let _1034 = td();
_1034.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(24, !monstdata[24], _1034);
    }
});
_103.appendChild(_1034);

// 1035
let _1035 = td();
_1035.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(25, !monstdata[25], _1035);
    }
});
_103.appendChild(_1035);

// 1036
let _1036 = td();
_1036.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(26, !monstdata[26], _1036);
    }
});
_103.appendChild(_1036);

// 1037
let _1037 = td();
_1037.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(27, !monstdata[27], _1037);
    }
});
_103.appendChild(_1037);

// 1038
let _1038 = td();
_1038.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(28, !monstdata[28], _1038);
    }
});
_103.appendChild(_1038);

// 1039
let _1039 = td();
_1039.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(29, !monstdata[29], _1039);
    }
});
_103.appendChild(_1039);

_10b.appendChild(_103);

// 104
let _104 = tr();
_104.className = "interface";

// 1040
let _1040 = td();
_1040.addEventListener('click', e => {
    keyguide = !keyguide;
    updateUI();
});
_1040.colSpan = 2;
_104.appendChild(_1040);

// 1041
let _1041 = td();
_1041.className = "i";
_1041.addEventListener('click', e => {
    datamode = !datamode;
    _1041.innerHTML = `GUI Update${keyguide ? ' (-)' : ''}: ${datamode ? "Wait for data" : "Instant"}`;
});
_1041.colSpan = 2;
_104.appendChild(_1041);

// 1042
let _1042 = td();
_1042.className = "i";
_1042.addEventListener('click', reset);
_1042.colSpan = 2;
_104.appendChild(_1042);

// 1043
let _1043 = td();
_1043.addEventListener('click', e => {
    if (inputtype == 1) {
        monstparse(30, !monstdata[30], _1043);
        _1043.innerHTML = `Door${keyguide ? ' (Space)' : ''}: ${monstdata[30] ? "Open" : "Closed"}`;
    }
});
_1043.colSpan = 2;
_104.appendChild(_1043);

// 1044
let _1044 = td();
_1044.addEventListener('mousedown', e => {
    if (inputtype == 1) {
        monstparse(31, true, _1044);
    }
});
_1044.addEventListener('mouseup', e => {
    if (inputtype == 1) {
        monstparse(31, false, _1044);
    }
});
_1044.colSpan = 2;
_104.appendChild(_1044);

_10b.appendChild(_104);

_10.appendChild(_10b);

_1.appendChild(_10);

root.appendChild(_1);

// 2
let _2 = div();
_2.className = "type";

// 20
let _20 = table();
_20.className = "type";

// tbody t
let _20b = tbody();
_20b.className = 't';

// 200
let _200 = tr();

// 2000
let _2000 = td();
_2000.addEventListener('click', e => {
    if (inputtype == 1) {
        inputtype = 0;
        updateUI();
    } else if (inputtype == 2) {
        inputtype = 0;
        _2000.innerHTML = `${keyguide ? '<- ' : ''}Keyboard${keyguide ? ' ->' : ''}`;
        _2002.innerHTML = 'Website';
        _2000.className = 'ta';
        _2002.className = 't';
        reset();
    }
});
_200.appendChild(_2000);

// 2001
let _2001 = td();
_2001.addEventListener('click', e => {
    if (inputtype != 1) {
        let t = inputtype;
        inputtype = 1;
        if (t == 0) {
            updateUI();
        } else {
            reset();
        }
    }
});
_200.appendChild(_2001);

// 2002
let _2002 = td();
_2002.addEventListener('click', e => {
    if (inputtype == 0) {
        inputtype = 2;
        _2000.innerHTML = 'Keyboard';
        _2002.innerHTML = `${keyguide ? '<- ' : ''}Website${keyguide ? ' ->' : ''}`;
        _2000.className = 't';
        _2002.className = 'ta';
        reset();
    } else if (inputtype == 1) {
        inputtype = 2;
        reset();
    }
});
_200.appendChild(_2002);

_20b.appendChild(_200);

_20.appendChild(_20b);

_2.appendChild(_20);

root.appendChild(_2);

updateUI();

// ui update when main variables change
function updateUI() {
    // innerHTML
    _1000.innerHTML = `${n1}${keyguide ? ' (1)' : ''}`;
    _1001.innerHTML = `${n2}${keyguide ? ' (2)' : ''}`;
    _1002.innerHTML = `${n3}${keyguide ? ' (3)' : ''}`;
    _1003.innerHTML = `${n4}${keyguide ? ' (4)' : ''}`;
    _1004.innerHTML = `${n5}${keyguide ? ' (5)' : ''}`;
    _1005.innerHTML = `${n6}${keyguide ? ' (6)' : ''}`;
    _1006.innerHTML = `${n7}${keyguide ? ' (7)' : ''}`;
    _1007.innerHTML = `${n8}${keyguide ? ' (8)' : ''}`;
    _1008.innerHTML = `${n9}${keyguide ? ' (9)' : ''}`;
    _1009.innerHTML = `${n10}${keyguide ? ' (0)' : ''}`;

    _1010.innerHTML = `Power${keyguide ? ' (q)' : ''}`;
    _1011.innerHTML = `Power${keyguide ? ' (w)' : ''}`;
    _1012.innerHTML = `Power${keyguide ? ' (e)' : ''}`;
    _1013.innerHTML = `Power${keyguide ? ' (r)' : ''}`;
    _1014.innerHTML = `Power${keyguide ? ' (t)' : ''}`;
    _1015.innerHTML = `Power${keyguide ? ' (y)' : ''}`;
    _1016.innerHTML = `Power${keyguide ? ' (u)' : ''}`;
    _1017.innerHTML = `Power${keyguide ? ' (i)' : ''}`;
    _1018.innerHTML = `Power${keyguide ? ' (o)' : ''}`;
    _1019.innerHTML = `Power${keyguide ? ' (p)' : ''}`;

    _1020.innerHTML = `Activate${keyguide ? ' (a)' : ''}`;
    _1021.innerHTML = `Activate${keyguide ? ' (s)' : ''}`;
    _1022.innerHTML = `Activate${keyguide ? ' (d)' : ''}`;
    _1023.innerHTML = `Activate${keyguide ? ' (f)' : ''}`;
    _1024.innerHTML = `Activate${keyguide ? ' (g)' : ''}`;
    _1025.innerHTML = `Activate${keyguide ? ' (h)' : ''}`;
    _1026.innerHTML = `Activate${keyguide ? ' (j)' : ''}`;
    _1027.innerHTML = `Activate${keyguide ? ' (k)' : ''}`;
    _1028.innerHTML = `Activate${keyguide ? ' (l)' : ''}`;
    _1029.innerHTML = `Activate${keyguide ? ' (;)' : ''}`;

    _1030.innerHTML = `Alternate Activate${keyguide ? ' (z)' : ''}`;
    _1031.innerHTML = `Alternate Activate${keyguide ? ' (x)' : ''}`;
    _1032.innerHTML = `Alternate Activate${keyguide ? ' (c)' : ''}`;
    _1033.innerHTML = `Alternate Activate${keyguide ? ' (v)' : ''}`;
    _1034.innerHTML = `Alternate Activate${keyguide ? ' (b)' : ''}`;
    _1035.innerHTML = `Alternate Activate${keyguide ? ' (n)' : ''}`;
    _1036.innerHTML = `Alternate Activate${keyguide ? ' (m)' : ''}`;
    _1037.innerHTML = `Alternate Activate${keyguide ? ' (,)' : ''}`;
    _1038.innerHTML = `Alternate Activate${keyguide ? ' (.)' : ''}`;
    _1039.innerHTML = `Alternate Activate${keyguide ? ' (/)' : ''}`;

    _1040.innerHTML = `Key Guide (=): ${keyguide ? "On" : "Off"}`;
    _1041.innerHTML = `GUI Update${keyguide ? ' (-)' : ''}: ${datamode ? "Wait for data" : "Instant"}`;
    _1042.innerHTML = `R E S E T${keyguide ? ' (Enter)' : ''}`;
    _1043.innerHTML = `Door${keyguide ? ' (Space)' : ''}: ${monstdata[30] ? "Open" : "Closed"}`;
    _1044.innerHTML = `Garbage${keyguide ? " (')" : ''}`;

    _2000.innerHTML = `${inputtype == 0 && keyguide ? '<- ' : ''}Keyboard${inputtype == 0 && keyguide ? ' ->' : ''}`;
    _2001.innerHTML = `${inputtype == 1 && keyguide ? '<- ' : ''}GUI+${inputtype == 1 && keyguide ? ' ->' : ''}`;
    _2002.innerHTML = `${inputtype == 2 && keyguide ? '<- ' : ''}Website${inputtype == 2 && keyguide ? ' ->' : ''}`;

    // class
    _1010.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[0] ? 'a' : ''}`;
    _1011.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[1] ? 'a' : ''}`;
    _1012.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[2] ? 'a' : ''}`;
    _1013.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[3] ? 'a' : ''}`;
    _1014.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[4] ? 'a' : ''}`;
    _1015.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[5] ? 'a' : ''}`;
    _1016.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[6] ? 'a' : ''}`;
    _1017.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[7] ? 'a' : ''}`;
    _1018.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[8] ? 'a' : ''}`;
    _1019.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[9] ? 'a' : ''}`;

    _1020.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[10] ? 'a' : ''}`;
    _1021.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[11] ? 'a' : ''}`;
    _1022.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[12] ? 'a' : ''}`;
    _1023.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[13] ? 'a' : ''}`;
    _1024.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[14] ? 'a' : ''}`;
    _1025.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[15] ? 'a' : ''}`;
    _1026.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[16] ? 'a' : ''}`;
    _1027.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[17] ? 'a' : ''}`;
    _1028.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[18] ? 'a' : ''}`;
    _1029.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[19] ? 'a' : ''}`;

    _1030.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[20] ? 'a' : ''}`;
    _1031.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[21] ? 'a' : ''}`;
    _1032.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[22] ? 'a' : ''}`;
    _1033.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[23] ? 'a' : ''}`;
    _1034.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[24] ? 'a' : ''}`;
    _1035.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[25] ? 'a' : ''}`;
    _1036.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[26] ? 'a' : ''}`;
    _1037.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[27] ? 'a' : ''}`;
    _1038.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[28] ? 'a' : ''}`;
    _1039.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[29] ? 'a' : ''}`;

    _1040.className = `i${keyguide ? 'a' : ''}`;
    _1043.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[30] ? 'a' : ''}`;
    _1044.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[31] ? 'a' : ''}`;

    _2000.className = `t${inputtype == 0 ? 'a' : ''}`;
    _2001.className = `t${inputtype == 1 ? 'a' : ''}`;
    _2002.className = `t${inputtype == 2 ? 'a' : ''}`;
}

// monster semi-parse
function monstparse(n: number, on: boolean, ref: HTMLElement) {
    if (monstdata[n] != on) {
        monstdata[n] = on;
        ref.className = `i${inputtype == 1 ? '' : 'd'}${monstdata[n] ? 'a' : ''}`;
    }
}

// reset function
function reset() {
    for (let i = 0; i < 32; i++) {
        monstdata[i] = false;
    }
    updateUI();
}

// key detection
let keysPressed: Record<string, boolean> = {};
document.addEventListener('keypress', e => {
    if (e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' || e.key == '9' || e.key == '0') {
        keysPressed[e.key] = true;
        switch (e.key) {
            case '1':
                _1000.innerHTML = `${n1 = prompt('Input the name of the monster') ?? n1}${keyguide ? ' (1)' : ''}`;
                break;
            case '2':
                _1001.innerHTML = `${n2 = prompt('Input the name of the monster') ?? n2}${keyguide ? ' (1)' : ''}`;
                break;
            case '3':
                _1002.innerHTML = `${n3 = prompt('Input the name of the monster') ?? n3}${keyguide ? ' (1)' : ''}`;
                break;
            case '4':
                _1003.innerHTML = `${n4 = prompt('Input the name of the monster') ?? n4}${keyguide ? ' (1)' : ''}`;
                break;
            case '5':
                _1004.innerHTML = `${n5 = prompt('Input the name of the monster') ?? n5}${keyguide ? ' (1)' : ''}`;
                break;
            case '6':
                _1005.innerHTML = `${n6 = prompt('Input the name of the monster') ?? n6}${keyguide ? ' (1)' : ''}`;
                break;
            case '7':
                _1006.innerHTML = `${n7 = prompt('Input the name of the monster') ?? n7}${keyguide ? ' (1)' : ''}`;
                break;
            case '8':
                _1007.innerHTML = `${n8 = prompt('Input the name of the monster') ?? n8}${keyguide ? ' (1)' : ''}`;
                break;
            case '9':
                _1008.innerHTML = `${n9 = prompt('Input the name of the monster') ?? n9}${keyguide ? ' (1)' : ''}`;
                break;
            case '0':
                _1009.innerHTML = `${n10 = prompt('Input the name of the monster') ?? n10}${keyguide ? ' (1)' : ''}`;
                break;
        }
    }
});
document.addEventListener('keydown', e => {
    if (!keysPressed[e.key]) {
        console.log(e.key);
        keysPressed[e.key] = true;

        switch (e.key) {
            case '=':
                keyguide = !keyguide;
                updateUI();
                break;
            case '-':
                datamode = !datamode;
                _1041.innerHTML = `GUI Update${keyguide ? ' (-)' : ''}: ${datamode ? "Wait for data" : "Instant"}`;
                break;
            case 'Enter':
                reset();
                break;
            case 'ArrowLeft':
                if (inputtype == 0) {
                    inputtype = 2;
                    _2000.innerHTML = 'Keyboard';
                    _2002.innerHTML = `${keyguide ? '<- ' : ''}Website${keyguide ? ' ->' : ''}`;
                    _2000.className = 't';
                    _2002.className = 'ta';
                    reset();
                } else if (inputtype == 1) {
                    inputtype = 0;
                    updateUI();
                } else {
                    inputtype = 1;
                    reset();
                }
                break;
            case 'ArrowRight':
                if (inputtype == 0) {
                    inputtype = 1;
                    updateUI();
                } else if (inputtype == 1) {
                    inputtype = 2;
                    reset();
                } else {
                    inputtype = 0;
                    _2000.innerHTML = `${keyguide ? '<- ' : ''}Keyboard${keyguide ? ' ->' : ''}`;
                    _2002.innerHTML = 'Website';
                    _2000.className = 'ta';
                    _2002.className = 't';
                    reset();
                }
                break;
        }

        if (inputtype != 2) {
            switch (e.key) {
                case 'q':
                    monstparse(0, true, _1010);
                    break;
                case 'w':
                    monstparse(1, true, _1011);
                    break;
                case 'e':
                    monstparse(2, true, _1012);
                    break;
                case 'r':
                    monstparse(3, true, _1013);
                    break;
                case 't':
                    monstparse(4, true, _1014);
                    break;
                case 'y':
                    monstparse(5, true, _1015);
                    break;
                case 'u':
                    monstparse(6, true, _1016);
                    break;
                case 'i':
                    monstparse(7, true, _1017);
                    break;
                case 'o':
                    monstparse(8, true, _1018);
                    break;
                case 'p':
                    monstparse(9, true, _1019);
                    break;

                case 'a':
                    monstparse(10, true, _1020);
                    break;
                case 's':
                    monstparse(11, true, _1021);
                    break;
                case 'd':
                    monstparse(12, true, _1022);
                    break;
                case 'f':
                    monstparse(13, true, _1023);
                    break;
                case 'g':
                    monstparse(14, true, _1024);
                    break;
                case 'h':
                    monstparse(15, true, _1025);
                    break;
                case 'j':
                    monstparse(16, true, _1026);
                    break;
                case 'k':
                    monstparse(17, true, _1027);
                    break;
                case 'l':
                    monstparse(18, true, _1028);
                    break;
                case ';':
                    monstparse(19, true, _1029);
                    break;

                case 'z':
                    monstparse(20, true, _1030);
                    break;
                case 'x':
                    monstparse(21, true, _1031);
                    break;
                case 'c':
                    monstparse(22, true, _1032);
                    break;
                case 'v':
                    monstparse(23, true, _1033);
                    break;
                case 'b':
                    monstparse(24, true, _1034);
                    break;
                case 'n':
                    monstparse(25, true, _1035);
                    break;
                case 'm':
                    monstparse(26, true, _1036);
                    break;
                case ',':
                    monstparse(27, true, _1037);
                    break;
                case '.':
                    monstparse(28, true, _1038);
                    break;
                case '/':
                    monstparse(29, true, _1039);
                    break;

                case ' ':
                    monstparse(30, !monstdata[30], _1043);
                    _1043.innerHTML = `Door${keyguide ? ' (Space)' : ''}: ${monstdata[30] ? "Open" : "Closed"}`;
                    break;
                case "'":
                    monstparse(31, true, _1044);
                    break;
            }
        }
    }
});
document.addEventListener('keyup', e => {
    keysPressed[e.key] = false;
    if (inputtype != 2) {
        switch (e.key) {
            case 'q':
                monstparse(0, false, _1010);
                break;
            case 'w':
                monstparse(1, false, _1011);
                break;
            case 'e':
                monstparse(2, false, _1012);
                break;
            case 'r':
                monstparse(3, false, _1013);
                break;
            case 't':
                monstparse(4, false, _1014);
                break;
            case 'y':
                monstparse(5, false, _1015);
                break;
            case 'u':
                monstparse(6, false, _1016);
                break;
            case 'i':
                monstparse(7, false, _1017);
                break;
            case 'o':
                monstparse(8, false, _1018);
                break;
            case 'p':
                monstparse(9, false, _1019);
                break;

            case 'a':
                monstparse(10, false, _1020);
                break;
            case 's':
                monstparse(11, false, _1021);
                break;
            case 'd':
                monstparse(12, false, _1022);
                break;
            case 'f':
                monstparse(13, false, _1023);
                break;
            case 'g':
                monstparse(14, false, _1024);
                break;
            case 'h':
                monstparse(15, false, _1025);
                break;
            case 'j':
                monstparse(16, false, _1026);
                break;
            case 'k':
                monstparse(17, false, _1027);
                break;
            case 'l':
                monstparse(18, false, _1028);
                break;
            case ';':
                monstparse(19, false, _1029);
                break;

            case 'z':
                monstparse(20, false, _1030);
                break;
            case 'x':
                monstparse(21, false, _1031);
                break;
            case 'c':
                monstparse(22, false, _1032);
                break;
            case 'v':
                monstparse(23, false, _1033);
                break;
            case 'b':
                monstparse(24, false, _1034);
                break;
            case 'n':
                monstparse(25, false, _1035);
                break;
            case 'm':
                monstparse(26, false, _1036);
                break;
            case ',':
                monstparse(27, false, _1037);
                break;
            case '.':
                monstparse(28, false, _1038);
                break;
            case '/':
                monstparse(29, false, _1039);
                break;

            case "'":
                monstparse(31, false, _1044);
                break;
        }
    }
});

// override right-click
document.addEventListener('contextmenu', e => {
    e.preventDefault();
});
