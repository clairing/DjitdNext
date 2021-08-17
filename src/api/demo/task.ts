import { defHttp } from '/@/utils/http/axios';

enum Api {
  START_TIMER_JOB = '/api/timer/start-timer-job',
  STOP_TIMER_JOB = '/api/timer/stop-timer-job',
}

//定时任务启动
/**
 * @description: Get sample options value
 */
export function startTimerJob() {
  return defHttp.get({ url: Api.START_TIMER_JOB });
}

// 定时任务暂停任务
export function stopTimerJob() {
  return defHttp.get({ url: Api.STOP_TIMER_JOB });
}
