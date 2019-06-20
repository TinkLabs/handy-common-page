import axios from 'axios';
// import handleError from './handleError';

/**
 * @param method            HTTP method
 * @param url               URL
 * @param bodyParams        HTTP Body
 * @param urlParams         URL Params
 */
export default function(method, url, { bodyParams = {}, urlParams = {} }) {
  // api cache
  let paramStr = url;
  Object.keys(urlParams).forEach(key => {
    paramStr += `${key}${urlParams[key]}`;
  });
  if (localStorage.getItem(paramStr)) {
    return Promise.resolve(JSON.parse(localStorage.getItem(paramStr)));
  } else {
    const axiosCMS = axios.create({
      retry: 5,
      retryDelay: 1000,
      timeout: 10000,
      headers: {
        'content-type': 'text/plain',
      },
    });

    // 带有自动重试功能的响应拦截器
    axiosCMS.interceptors.response.use(
      // 成功后处理
      response => {
        if (response.status === 200) {
          // api cache
          if (!localStorage.getItem(paramStr)) {
            localStorage.setItem(paramStr, JSON.stringify(response));
          }
          // why can't return response.data ?
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      // 错误处理，可以设置为匿名函数
      function axiosRetryInterceptor(err) {
        var config = err.config;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) {
        //   handleError(err);
          return Promise.reject(err.response);
        }

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
          // Reject with the error
        //   handleError(err);
          // reject with error
          return Promise.reject(err.response);
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        var backoff = new Promise(function(resolve) {
          setTimeout(function() {
            resolve();
          }, config.retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function() {
          return axiosCMS(config);
        });
      }
    );

    return axiosCMS.request({
      method: method,
      url: url,
      params: urlParams,
      data: bodyParams,
    });
  }
}
