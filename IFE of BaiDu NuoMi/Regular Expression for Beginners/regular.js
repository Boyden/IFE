var reg1 = /((?:\D?)((13[0-9])|(15[0-9])|(18[0-9])|(147)|(145)|(17[3-8])|(149))\d{8}(?:\D?))/g;
//Other Solutions
//var reg1 = /(?=\d)(1[358][0-9]|14[579]|17[3-8])\d{8}(?=\D)/g;
var str1 = "18812011232 ";
var str2 = "18812312 ";
var str3  = "12345678909";
console.log(reg1.test(str1));
console.log(reg1.test(str2));
console.log(reg1.test(str3));
var reg2 = /(?:\b(\w+)\b\s+\1\b\s+)(\b(\w+)\b)|(\b(\w+)\b)(?:\b(\w+)\b\s+\1\b\s+)/g;
var str4 = "foo foo bar   ";
var str5 = "foo bar foo  ";
var str6 = "foo  barbar bar";
console.log(reg2.test(str4));
console.log(reg2.test(str5));
console.log(reg2.test(str6));
