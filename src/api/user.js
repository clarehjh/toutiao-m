import request from "@/utils/request";

export const login = data => {
  return request({
    method: "POST",
    url: "/app/v1_0/authorizations",
    data
  });
};

/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`
  });
};

/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user"
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user/channels"
  });
};

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/user/channels/${channelId}`
  });
};

/**
 * 关注用户
 */
export const addFollow = userId => {
  return request({
    method: "POST",
    url: "/app/v1_0/user/followings",
    data: {
      target: userId
    }
  });
};

/**
 * 取消关注用户
 */
export const deleteFollow = userId => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/user/followings/${userId}`
  });
};

/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user/profile"
  });
};

/**
 * 修改用户个人资料
 */
export const updateUserProfile = data => {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/profile",
    data
  });
};

/**
 * 修改用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/photo",
    data
  });
};

/**
 * 获取用户的关注列表
 */
export function getFollowingsByUser(userId, params) {
  return request({
    method: "GET",
    url: "/app/v1_0/user/followings",
    params,
    data: {
      target: userId.toString()
    }
  });
}

/**
 * 获取用户的粉丝列表
 */
export function getFollowersByUser(userId, params) {
  return request({
    method: "GET",
    url: "/app/v1_0/user/followers",
    params,
    data: {
      target: userId.toString()
    }
  });
}
