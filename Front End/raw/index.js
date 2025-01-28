"use strict";
const div = () => document.createElement("div");
const p = () => document.createElement("p");
const table = () => document.createElement("table");
const td = () => document.createElement("td");
const th = () => document.createElement("th");
const tr = () => document.createElement("tr");
const root = document.getElementById("root");
let inputtype = 1;
let keyguide = false;
let dooropen = false;
let datamode = false;
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
// 100
let _100 = tr();
_100.className = "interface h";
// 1000
let _1000 = th();
_1000.innerHTML = "Monster 1";
_1000.className = "interface";
_100.appendChild(_1000);
// 1001
let _1001 = th();
_1001.innerHTML = "Monster 2";
_1001.className = "interface";
_100.appendChild(_1001);
// 1002
let _1002 = th();
_1002.innerHTML = "Monster 3";
_1002.className = "interface";
_100.appendChild(_1002);
// 1003
let _1003 = th();
_1003.innerHTML = "Monster 4";
_1003.className = "interface";
_100.appendChild(_1003);
// 1004
let _1004 = th();
_1004.innerHTML = "Monster 5";
_1004.className = "interface";
_100.appendChild(_1004);
// 1005
let _1005 = th();
_1005.innerHTML = "Monster 6";
_1005.className = "interface";
_100.appendChild(_1005);
// 1006
let _1006 = th();
_1006.innerHTML = "Monster 7";
_1006.className = "interface";
_100.appendChild(_1006);
// 1007
let _1007 = th();
_1007.innerHTML = "Monster 8";
_1007.className = "interface";
_100.appendChild(_1007);
// 1008
let _1008 = th();
_1008.innerHTML = "Monster 9";
_1008.className = "interface";
_100.appendChild(_1008);
// 1009
let _1009 = th();
_1009.innerHTML = "Monster 10";
_1009.className = "interface";
_100.appendChild(_1009);
_10.appendChild(_100);
// 101
let _101 = tr();
_101.className = "interface";
// 1010
let _1010 = td();
_1010.innerHTML = "Power";
_1010.className = "interface";
_101.appendChild(_1010);
// 1011
let _1011 = td();
_1011.innerHTML = "Power";
_1011.className = "interface";
_101.appendChild(_1011);
// 1012
let _1012 = td();
_1012.innerHTML = "Power";
_1012.className = "interface";
_101.appendChild(_1012);
// 1013
let _1013 = td();
_1013.innerHTML = "Power";
_1013.className = "interface";
_101.appendChild(_1013);
// 1014
let _1014 = td();
_1014.innerHTML = "Power";
_1014.className = "interface";
_101.appendChild(_1014);
// 1015
let _1015 = td();
_1015.innerHTML = "Power";
_1015.className = "interface";
_101.appendChild(_1015);
// 1016
let _1016 = td();
_1016.innerHTML = "Power";
_1016.className = "interface";
_101.appendChild(_1016);
// 1017
let _1017 = td();
_1017.innerHTML = "Power";
_1017.className = "interface";
_101.appendChild(_1017);
// 1018
let _1018 = td();
_1018.innerHTML = "Power";
_1018.className = "interface";
_101.appendChild(_1018);
// 1019
let _1019 = td();
_1019.innerHTML = "Power";
_1019.className = "interface";
_101.appendChild(_1019);
_10.appendChild(_101);
// 102
let _102 = tr();
_102.className = "interface";
// 1020
let _1020 = td();
_1020.innerHTML = "Activate";
_1020.className = "interface";
_102.appendChild(_1020);
// 1021
let _1021 = td();
_1021.innerHTML = "Activate";
_1021.className = "interface";
_102.appendChild(_1021);
// 1022
let _1022 = td();
_1022.innerHTML = "Activate";
_1022.className = "interface";
_102.appendChild(_1022);
// 1023
let _1023 = td();
_1023.innerHTML = "Activate";
_1023.className = "interface";
_102.appendChild(_1023);
// 1024
let _1024 = td();
_1024.innerHTML = "Activate";
_1024.className = "interface";
_102.appendChild(_1024);
// 1025
let _1025 = td();
_1025.innerHTML = "Activate";
_1025.className = "interface";
_102.appendChild(_1025);
// 1026
let _1026 = td();
_1026.innerHTML = "Activate";
_1026.className = "interface";
_102.appendChild(_1026);
// 1027
let _1027 = td();
_1027.innerHTML = "Activate";
_1027.className = "interface";
_102.appendChild(_1027);
// 1028
let _1028 = td();
_1028.innerHTML = "Activate";
_1028.className = "interface";
_102.appendChild(_1028);
// 1029
let _1029 = td();
_1029.innerHTML = "Activate";
_1029.className = "interface";
_102.appendChild(_1029);
_10.appendChild(_102);
// 103
let _103 = tr();
_103.className = "interface";
// 1030
let _1030 = td();
_1030.innerHTML = "Alternate Activate";
_1030.className = "interface";
_103.appendChild(_1030);
// 1031
let _1031 = td();
_1031.innerHTML = "Alternate Activate";
_1031.className = "interface";
_103.appendChild(_1031);
// 1032
let _1032 = td();
_1032.innerHTML = "Alternate Activate";
_1032.className = "interface";
_103.appendChild(_1032);
// 1033
let _1033 = td();
_1033.innerHTML = "Alternate Activate";
_1033.className = "interface";
_103.appendChild(_1033);
// 1034
let _1034 = td();
_1034.innerHTML = "Alternate Activate";
_1034.className = "interface";
_103.appendChild(_1034);
// 1035
let _1035 = td();
_1035.innerHTML = "Alternate Activate";
_1035.className = "interface";
_103.appendChild(_1035);
// 1036
let _1036 = td();
_1036.innerHTML = "Alternate Activate";
_1036.className = "interface";
_103.appendChild(_1036);
// 1037
let _1037 = td();
_1037.innerHTML = "Alternate Activate";
_1037.className = "interface";
_103.appendChild(_1037);
// 1038
let _1038 = td();
_1038.innerHTML = "Alternate Activate";
_1038.className = "interface";
_103.appendChild(_1038);
// 1039
let _1039 = td();
_1039.innerHTML = "Alternate Activate";
_1039.className = "interface";
_103.appendChild(_1039);
_10.appendChild(_103);
// 104
let _104 = tr();
_104.className = "interface";
// 1040
let _1040 = td();
_1040.innerHTML = `Key Guide (=): ${keyguide ? "On" : "Off"}`;
_1040.className = "interface";
_1040.colSpan = 2;
_104.appendChild(_1040);
// 1041
let _1041 = td();
_1041.innerHTML = `GUI Update: ${datamode ? "Wait for data" : "Instant"}`;
_1041.className = "interface";
_1041.colSpan = 2;
_104.appendChild(_1041);
// 1042
let _1042 = td();
_1042.innerHTML = "R E S E T";
_1042.className = "interface";
_1042.colSpan = 2;
_104.appendChild(_1042);
// 1043
let _1043 = td();
_1043.innerHTML = `Door: ${dooropen ? "Open" : "Closed"}`;
_1043.className = "interface";
_1043.colSpan = 2;
_104.appendChild(_1043);
// 1044
let _1044 = td();
_1044.innerHTML = "Garbage";
_1044.className = "interface";
_1044.colSpan = 2;
_104.appendChild(_1044);
_10.appendChild(_104);
_1.appendChild(_10);
root.appendChild(_1);
// 2
let _2 = div();
_2.className = "type";
// 20
let _20 = table();
_20.className = "type";
// 200
let _200 = tr();
// 2000
let _2000 = td();
_2000.innerHTML = "Keyboard";
_2000.className = "type";
_200.appendChild(_2000);
// 2001
let _2001 = td();
_2001.innerHTML = "GUI";
_2001.className = "type active";
_200.appendChild(_2001);
// 2002
let _2002 = td();
_2002.innerHTML = "Website";
_2002.className = "type";
_200.appendChild(_2002);
_20.appendChild(_200);
_2.appendChild(_20);
root.appendChild(_2);
