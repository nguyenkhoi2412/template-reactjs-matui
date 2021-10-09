import axios from "@utils/axio.instance";
import { Helpers } from "@utils/helpers";

export default {
  /*
   * GET: {dynamic}/getbyno/:pageno&:pagesize&:sort
   */
  getByPageNo(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(Helpers.parseObjectsToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * POST: {dynamic}/insertnew
   */
  insertnew(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  /*
   * PUT: {dynamic}/update
   */
  update(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  /*
   * DELETE: {dynamic}/delete
   */
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url + params._id)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
