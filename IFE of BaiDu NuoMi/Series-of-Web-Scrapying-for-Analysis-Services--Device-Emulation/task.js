
// phantomjs ../task.js keyword deviceName
//Ex:phantomjs C://task.js IFE iPhone6
var t = Date.now();
var page = require('webpage').create();
var system = require('system');
var fs = require("fs");
phantom.outputEncoding="gbk";
var settings = {
  encoding: "utf8",
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
};
var obj = {},result = {},
    configDevice = {
                      iPhone5:{
                        width:320,
                        height:568
                      },
                      iPhone6:{
                        width:375,
                        height:667
                      },
                      iPhone6Plus:{
                        width:414,
                        height:736
                      }
                    };

if (system.args.length === 1||system.args.length === 2) {
    console.log('Error: No Keyword Or Device Name.');
    phantom.exit();
  }else {
      if (configDevice[system.args[2]]===undefined) {
          console.log("Wrong Or Non-Exist Device Names, Supported:iPhone5, iPhone6, iPhone6Plus");
          phantom.exit();
      }
      page.viewportSize = configDevice[system.args[2]];
      system.args[1] = encodeURI(system.args[1]);
      console.log('https://www.baidu.com/s?ie=utf-8&f=8&wd='+system.args[1]);
      page.open(encodeURI('https://www.baidu.com/s?ie=utf-8&f=8&wd='+system.args[1]), settings, function(status) {
        if (status !== 'success') {
          obj.code = 0; //Status Code, 1 for success, 0 for failed
          obj.msg = "failed"; //Returned Message
          obj.word = system.args[1]; //Scrapying Keyword
          obj.device = system.args[2]; //Device Name
          obj.time = 0; //Time Consumed
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
          result.device = system.args[2];
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
