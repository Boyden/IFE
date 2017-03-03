
// phantomjs --output-encoding=gbk ../task.js keyword
var webPage = require('webpage');
var page = webPage.create();
var system = require('system');
var settings = {
  encoding: "utf8"
};
var address;
var obj = {
       code: undefined, //Status Code, 1 for success, 0 for failed
       msg: system.args[1], //Returned Message
       word: undefined, //Scrapying Keyword
       time: undefined, //Time Consumed
       dataList:[] // List of Scrapying Results
     };
     if (system.args.length === 1) {
      console.log('Error: No Keyword:');
      phantom.exit();
    }else {
      address = system.args[1];
      page.open('https://www.baidu.com/s?ie=utf-8&wd='+address, settings, function(status) {
        var t = Date.now();
        if (status !== 'success') {
          obj.code = 0;
          obj.time = 0;
          obj.msg = "failed";
          obj.word = address;
          console.log('received: ' + JSON.stringify(obj));
          phantom.exit();
        } else {
          var doc = page.evaluate(function() {
                var obj = {
                  code: 1, //Status Code, 1 for success, 0 for failed
                  msg: "success", //Returned Message
                  word: address, //Scrapying Keyword
                  time: undefined, //Time Consumed
                  dataList:[] // List of Scrapying Results
                }, arr = {};
                var text = document.getElementsByClassName('c-container');
                for (var i = 0; i < text.length; i++) {
                  arr.title = text[i].children[0].children[0].innerText;
                  arr.info = text[i].children[1].innerText;
                  arr.link = text[i].children[0].children[0].href;
                  arr.pic = text[i].children[1].children[0].children[0].children[0].src;
                  obj.dataList.push(arr);
                }
                return JSON.stringify(obj);
              });
          console.log("received:" + doc);
          phantom.exit();

        };

      });
    }