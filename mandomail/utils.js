const generateConfig = (url, accessToken) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };

const postConfig = (url, accessToken) => {
    return {
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
      data: data,
    };
  };
  
module.exports = { 
    generateConfig,
    postConfig,
};