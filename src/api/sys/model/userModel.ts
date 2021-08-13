/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
// export interface LoginResultModel {
//   userId: string | number;
//   token: string;
//   role: RoleInfo;
// }
export interface LoginResultModel {
  code: string | number;
  data: string;
  extra: strinng | null;
  message: string;
  success: bool;
  timestamp: number;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  roleIds: array;
  // 用户id
  userId: string | number;
  // 用户名
  userName: string;
  // 真实名字
  // realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  //账户
  account: string;
  //超级管理员
  superAdmin: bool;
  // 菜单样式
  menuStyle: bool;
}
