/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(
  date: moment.MomentInput = null,
  format = DATE_TIME_FORMAT
): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = null, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

export function formatToZh() {
  const now = new Date(),
    hour = now.getHours();
  if (hour < 6) {
    return '凌晨好！';
  } else if (hour < 9) {
    return '早上好！';
  } else if (hour < 12) {
    return '上午好！';
  } else if (hour < 14) {
    return '中午好！';
  } else if (hour < 17) {
    return '下午好！';
  } else if (hour < 19) {
    return '傍晚好！';
  } else if (hour < 22) {
    return '晚上好！';
  } else {
    return '夜里好！';
  }
}
export const dateUtil = moment;
