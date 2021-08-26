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