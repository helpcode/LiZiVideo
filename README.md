# 梨视频 Api接口

![log.png](log.png)

## 1：请求基地址

[http://127.0.0.1:3000](http://127.0.0.1:3000)

## 2：获取分类的分页数据

| 地址 | 请求方式 | 参数 |
| :------| ------: | :------: |
| /getTypeList | GET | type 分类id(string)，startPage 请求的页码(默认12，递增12倍数，0，12，24...) |


> type 分类id 取值参考

| type 分类名 | type 分类id |
| :-----| -----: |
| 新知 | 10 | 
| 社会 | 1 | 
| 世界 | 2 | 
| 体育 | 9 | 
| 生活 | 5 | 
| 科技 | 8 | 
| 娱乐 | 4 | 
| 财富 | 3 | 
| 汽车 | 31 | 
| 美食 | 6 | 
| 音乐 | 59 | 
| 财富 | 3 | 
| 财富 | 3 | 

- 示例：

[http://127.0.0.1:3000/getTypeList?type=8&startPage=0](http://127.0.0.1:3000/getTypeList?type=8&startPage=0)



## 3：进入对应视频的详情(查看文章&播放视频)

| 地址 | 请求方式 | 参数 |
| :------| ------: | :------: |
| /info | GET | id 视频id，getTypeList 接口的id参数 |

- 示例：

[http://127.0.0.1:3000/info?id=1597715](http://127.0.0.1:3000/info?id=1597715)
