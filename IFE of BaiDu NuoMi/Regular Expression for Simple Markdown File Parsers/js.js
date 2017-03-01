/**
 * marked - a markdown parser
 * https://https://github.com/Boyden/IFE/new/master/IFE%20of%20BaiDu%20NuoMi
 */
 window.onload = parser;
 function parser () {
 	String.prototype.splitWithNoSpace = function(separator, limit){
 		var temp = this.split(separator, limit);
 		(temp[0]===''||temp[0]===' ')?temp.shift():temp;
 		(temp[temp.length-1]===''||temp[temp.length-1]===' ')?temp.pop():temp;
 		return temp;
 	};
 	var updateString = function (string, str) {
 		if (str!==null){
 			string = string.replace(str, ' ');
 		}
 		return string;
 	}
 	var parseLink = function (arr) {
 		var linkReg = /\([http|https]+\:.*\)/;
 		var titleReg = /\[.*\]/;
 		var temp = '<a href="';
 		var link = '';
 		var title = '';
 		arr.forEach(function(element, index) {
 			link = linkReg.exec(element)[0].split('');
 			link.pop();
 			link.shift();
 			link = link.join('');
 			title = titleReg.exec(element)[0].split('');
 			title.pop()
 			title.shift();
 			title = title.join('');
 			arr[index] = temp + link + '">'+ title +"</a>";
 		});
 		arr = arr.join('	');
 		return arr;
 	}
 	var modifyTag = function (tag, decorator) {
 		for (let i = 0; i < tag.length; i++) {
 			tag[i] = tag[i].replace(decorator, ' ');
 			tag[i] = tag[i].slice(1, tag[i].length);
 			if (tag[i][tag.length-1]==="'"||tag[tag.length-1]==="`") {
 				tag[i] = tag[i].slice(tag[i].length - 3, tag[i].length);
 			}
 		}

 	}
 	var string = document.getElementById('content').value,
 		str = undefined,
 		array = string.splitWithNoSpace(/\n+/),
 		results = [],
 		match = [],
 		obj = {
 			head:"",
 			h1: [],
 			h2: [],
 			h3: [],
 			h4: [],
 			h5: [],
 			h6: [],
 			ul: [],
 			ol: [],
 			code: [],
 			blockquote: [],
 			link: [],
 			text: ""
 		},
 		block = {
 			h1: /^ *#[^#].*\n*$/gm,
 			h2: /^ *#{2}[^#].*\n*$/gm,
 			h3: /^ *#{3}[^#].*\n*$/gm,
 			h4: /^ *#{4}[^#].*\n*$/gm,
 			h5: /^ *#{5}[^#].*\n*$/gm,
 			h6: /^ *#{6,}[^#].*\n*$/gm,
 			ul: /^ *[*|+|-][^\n]*\n*$/gm,
 			ol: /^ *\d\.[^\n]*\n*$/gm,
 			code: /^ *['|`]{3}[^\n]*(\n.*)* *['|`]{3}$/gm,
 			blockquote: /^ *>.*\n*$/gm,
 			link: /\[.*\]\((http|https)+\:+.*\)/gm
 		};
 	str = string;
 	match[1] = block.h1.exec(string);

 	match[2] = block.h2.exec(string);

 	match[3] = block.h3.exec(string);

 	match[4] = block.h4.exec(string);

 	match[5] = block.h5.exec(string);

 	match[6] = block.h6.exec(string);

 	match[7] = block.ul.exec(string);

 	match[8] = block.ol.exec(string);

 	match[9] = block.code.exec(string);

 	match[10] = block.blockquote.exec(string);

 	match[11] = block.link.exec(str);

 	for (let i = 1; i < 11; i++) {
 		if (match[i]!==null) {
 			string = updateString(string, match[i][0]);
 		}
 	}
 	for (let i in block) {
 			block[i].lastIndex = 0;
 		}

 	while(match[1]||match[2]||match[3]||match[4]||match[5]||match[6]||match[7]||match[8]||match[9]||match[10]){
 		if (match[1]!==null&&match[1][0]!==obj.h1[obj.h1.length-1])
 			obj.h1.push(match[1][0]);
 		if (match[2]!==null&&match[2][0]!==obj.h2[obj.h2.length-1])
 			obj.h2.push(match[2][0]);
 		if (match[3]!==null&&match[3][0]!==obj.h3[obj.h3.length-1])
 			obj.h3.push(match[3][0]);
 		if (match[4]!==null&&match[4][0]!==obj.h4[obj.h4.length-1])
 			obj.h4.push(match[4][0]);
 		if (match[5]!==null&&match[5][0]!==obj.h5[obj.h5.length-1])
 			obj.h5.push(match[5][0]);
 		if (match[6]!==null&&match[6][0]!==obj.h6[obj.h6.length-1])
 			obj.h6.push(match[6][0]);
 		if (match[7]!==null&&match[7][0]!==obj.ul[obj.ul.length-1])
 			obj.ul.push(match[7][0]);
 		if (match[8]!==null&&match[8][0]!==obj.ol[obj.ol.length-1])
 			obj.ol.push(match[8][0]);
 		if (match[9]!==null&&match[9][0]!==obj.code[obj.code.length-1])
 			obj.code.push(match[9][0]);
 		if (match[10]!==null&&match[10][0]!==obj.blockquote[obj.blockquote.length-1])
 			obj.blockquote.push(match[10][0]);


 		match[1] = block.h1.exec(string);

 		match[2] = block.h2.exec(string);

 		match[3] = block.h3.exec(string);

 		match[4] = block.h4.exec(string);

 		match[5] = block.h5.exec(string);

 		match[6] = block.h6.exec(string);

 		match[7] = block.ul.exec(string);

 		match[8] = block.ol.exec(string);

 		match[9] = block.code.exec(string);

 		match[10] = block.blockquote.exec(string);


 		for (let i = 1; i < 11; i++) {
 			if (match[i]!==null) {
 				string = updateString(string, match[i][0]);
 			}
 		}
 		for (let i in block) {
 			block[i].lastIndex = 0;
 		}

 	}
 	while (match[11]) {
 		if (match[11]!==null&&match[11][0]!==obj.link[obj.link.length-1])
 			obj.link.push(match[11][0]);
 		match[11] = block.link.exec(str);
 	}
 	obj.text = string;
 	modifyTag(obj.h1,'#');
 	modifyTag(obj.h2,'##');
 	modifyTag(obj.h3,'###');
 	modifyTag(obj.h4,'####');
 	modifyTag(obj.h5,'#####');
 	modifyTag(obj.h6,'######');
 	modifyTag(obj.ul,/^ *[*|+|-] */);
 	modifyTag(obj.ol,/^ *\d\. */);
 	modifyTag(obj.code, /^ *['|`]{3}[^\n]*$/gm);
 	modifyTag(obj.blockquote, '>');
 	obj.text = 'Text:' + obj.text.split(/\s+/gm).join(' ');
 	if (obj.h1[0]!=null) {
 		obj.h1[0] = '<h1>Headers:' + obj.h1[0];
 		obj.h1[obj.h1.length-1] = obj.h1[obj.h1.length-1] + '</h1>';
 		obj.h1 = obj.h1.join('</h1><h1>');
 	} else {
 		obj.h1 = '';
 	}
 	
 	if (obj.h2[0]!=null) {
 		obj.h2[0] = '<h2>' + obj.h2[0];
 		obj.h2[obj.h2.length-1] = obj.h2[obj.h2.length-1] + '</h2>';
 		obj.h2 = obj.h2.join('</h2><h2>');
 	} else {
 		obj.h2 = '';
 	}

 	if (obj.h3[0]!=null) {
 		obj.h3[0] = '<h3>' + obj.h3[0];
 		obj.h3[obj.h3.length-1] = obj.h3[obj.h3.length-1] + '</h3>';
 		obj.h3 = obj.h3.join('</h3><h3>');
 	}else {
 		obj.h3 = '';
 	}

 	if (obj.h4[0]!=null) {
 		obj.h4[0] = '<h4>' + obj.h4[0];
 		obj.h4[obj.h4.length-1] = obj.h4[obj.h4.length-1] + '</h4>';
 		obj.h4 = obj.h4.join('</h4><h4>');
 	} else {
 		obj.h4='';
 	}

 	if (obj.h5[0]!=null) {
 		obj.h5[0] = '<h5>' + obj.h5[0];
 		obj.h5[obj.h5.length-1] = obj.h5[obj.h5.length-1] + '</h5>';
 		obj.h5 = obj.h5.join('</h5><h5>');
 	} else {
 		obj.h5 = '';
 	}

 	if (obj.h6[0]!=null) {
 		obj.h6[0] = '<h6>' + obj.h6[0];
 		obj.h6[obj.h6.length-1] = obj.h6[obj.h6.length-1] + '</h6>';
 		obj.h6 = obj.h6.join('</h6><h6>');
 	} else {
 		obj.h6 = '';
 	}


 	obj.head = obj.h1+obj.h2+obj.h3+obj.h4+obj.h5+obj.h6;

 	if (obj.ul!=null) {
 		obj.ul[0] = '<li>' + obj.ul[0];
 		obj.ul[obj.ul.length-1] = obj.ul[obj.ul.length-1] + '</li>';
 		obj.ul = obj.ul.join('</li><li>');
 	}else {
 		obj.ul = null;
 	}

 	if (obj.ol!=null) {
 		obj.ol[0] = '<li>' + obj.ol[0];
 		obj.ol[obj.ol.length-1] = obj.ol[obj.ol.length-1] + '</li>';
 		obj.ol = obj.ol.join('</li><li>');
 	} else {
 		obj.ol = '';
 	}

 	if (obj.link!=null) {
 		obj.link = parseLink(obj.link);
 	} else {
 		obj.link = '';
 	}
 	document.getElementById('header').innerHTML = obj.head;
 	document.getElementById('pureText').innerHTML = obj.text;
 	document.getElementById('order').innerHTML = obj.ol;
 	document.getElementById('unorder').innerHTML = obj.ul;
 	document.getElementById('blockquote').innerHTML = 'Blockquote:' + obj.blockquote;
 	document.getElementById('link').innerHTML = 'Link:' + obj.link;
 	document.getElementById('code').innerHTML = "Codes:" + obj.code;
 	console.dir(obj);
 }

