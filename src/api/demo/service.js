
// 数据服务界面
import request from '@/utils/request'
const url = "http://192.168.1.106:8050/api/"

// 主服务项 启动暂停
export function operate(data) {
  return request({
    url: url + "masterservice/operate/" + data.type + '/' + data.id,
    method: "post",
  })
}
// 子服务项 启动暂停
export function subOperate(data) {
  return request({
    url: url + "sublistservice/operate/" + data.type + '/' + data.id,
    method: "post",
  })
}

//租户级别 启动暂停
export function tOperate(data) {
  return request({
    url: url + "grantrecord/operate/" + data.type + '/' + data.id,
    method: "post",
  })
}



// // 定时任务暂停任务
// export function stopjob(data) {
//   return request({
//     url: url + "operate/"+data.type+'/'+data.id,
//     method: "post",
//     data
//   })
// }


