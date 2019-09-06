var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/**
 * 接口访问地址
 * http://app.pearvideo.com/clt/jsp/v2/content.jsp?contId=1597715
 * 传入 getTypeList 接口中的 id 字段
 */
router.get('/info', function(req, res, next) {
  var id = req.query.id;
  var options = {
    url: `http://app.pearvideo.com/clt/jsp/v2/content.jsp?contId=${id}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
      'Host': 'app.pearvideo.com',
      'Cookie': 'JSESSIONID=A30AAF76CF8CBD740F91A7025EA5714D; PEAR_UUID=12958b65-4dfc-4c04-b565-c3ab9b4be51b; UM_distinctid=16d07a281f10-0ef2e67c68cf8e-38637501-100200-16d07a281f2283; Hm_lvt_9707bc8d5f6bba210e7218b8496f076a=1567791154,1567793946,1567793953; PV_APP=srv-pv-prod-portal3; Hm_lpvt_9707bc8d5f6bba210e7218b8496f076a=1567796636; __ads_session=lkY74KZEWAnpL+MAGQA=',
      'Upgrade-Insecure-Requests': 1,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    }
  };
  request(options, function (error, response, body) {
    console.log(body)
    res.json(JSON.parse(body))
  })
});

router.get('/getTypeList', function(req, res, next) {
  var type = req.query.type;
  var startPage = req.query.startPage;
  var data = []

  requestData(baseUrl(type,startPage), $ => {
    $(".categoryem .vervideo-bd").each(function()  {
      data.push({
        id: (($(this).find(".vervideo-lilink").attr("href")).split("_"))[1],
        title: $(this).find(".vervideo-title").text(),
        img: $(this).find(".img").attr("style").match(/background-image: url\(([\s\S]*?)\);/)[1],
        time: $(this).find(".cm-duration").text(),
        author: $(this).find(".column").text(),
        like: $(this).find(".fav").text()
      })
    })
    res.json(data)
  })

});

/**
 * 请求地址，并返回 cheerio 对象
 * @param {*} url 需要请求的网址
 * @param {*} callback 回调函数
 */
function requestData(url, callback) {
  request(url, function (error, response, body) {
    callback(cheerio.load(body))
  })
}

function baseUrl (categoryId,startPage) {
  return `https://www.pearvideo.com/category_loading.jsp?reqType=5&categoryId=${categoryId}&start=${startPage}`
}


module.exports = router;
