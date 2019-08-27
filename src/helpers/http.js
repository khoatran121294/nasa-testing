import axios from "axios";
import qs from "qs";
import _ from "lodash";
import AppConfig from "../config";

axios.defaults.baseURL = AppConfig.baseUrl;
axios.defaults.timeout = 90000;

const http = {
  get(url, params, config = {}) {
    return axios.get(
      url,
      _.assign({}, config, {
        params,
        paramsSerializer: _params => {
          return qs.stringify(_params, { arrayFormat: "repeat" });
        }
      })
    );
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  }
};

export default http;
