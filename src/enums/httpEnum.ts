/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  NOCONTENTSUCCESS = 204,
  ERROR = 403,
  NOAUTH = 401,
  NOPREMISSION = 403,
  TIMEOUT = 500,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'POST',
  DELETE = 'POST',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
