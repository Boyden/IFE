
// phantomjs ../task.js keyword
var t = Date.now();
var page = require('webpage').create();
var system = require('system');
var fs = require("fs");
var settings = {
  encoding: "utf8"
};
var obj = {
       code: undefined, //Status Code, 1 for success, 0 for failed
       msg: undefined, //Returned Message
       word: undefined, //Scrapying Keyword
       time: undefined, //Time Consumed
       dataList:[] // List of Scrapying Results
     },
     result = {};
phantom.outputEncoding="gbk";
if (system.args.length === 1) {
    console.log('Error: No Keyword.');
    phantom.exit();
  }else {
      system.args[1] = encodeURI(system.args[1]);
      console.log('https://www.baidu.com/s?ie=utf-8&f=8&wd='+system.args[1]);
      page.open(encodeURI('https://www.baidu.com/s?ie=utf-8&f=8&wd='+system.args[1]), settings, function(status) {
        if (status !== 'success') {
          obj.code = 0;
          obj.time = 0;
          obj.msg = "failed";
          obj.word = system.args[1];
          console.log('received: ' + JSON.stringify(obj));
          phantom.exit();
        } else {
          var doc = page.evaluate(function() {
            var obj = [], arr = {};
                var text = document.getElementsByClassName('c-container');
                for (var i = 0; i < text.length; i++) {
                  arr = {};
                  if (text[i].querySelector('h3 a')) {
                    arr.title = text[i].querySelector('h3 a').innerText;
                    arr.info = text[i].children[1].innerText;
                    arr.link = text[i].querySelector('h3 a').href;
                    if (text[i].querySelector('img')) {
                      arr.pic = text[i].querySelector('img').src;
                    } else {
                      arr.pic = 'none';
                    }
                    obj.push(arr);
                  }
                }
                return obj;
              });
          result.code = 1;
          result.msg = "success";
          result.word = system.args[1];
          t = (Date.now() - t)/1000 + 'seconds';
          result.time = t;
          result.dataList = doc;
          result = JSON.stringify(result, undefined, 4);
          console.log("received:" + result);
          var file=fs.open('result.json','w');
          file.write(result);
          file.close();
          phantom.exit();

        };

      });
}
