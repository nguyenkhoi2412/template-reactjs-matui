import axios from "@utils/axio.instance";
import { Helpers } from "@utils/helpers";

export default {
  /*
   * GET: type/getbyno/:pageno&:pagesize&:sort
   */
  getByPageNo(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(Helpers.parseObjectsToQueryString(`type/getbypageno/`, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  /*
   * GET: type/getbysite/:type_id
   */
  getBySite(site_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`type/getbysite/` + site_id)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * POST: type/insertnew
   */
  insertnew(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`type/insertnew/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  /*
   * PUT: type/update
   */
  update(params) {
    return new Promise((resolve, reject) => {
      axios
        .put(`type/update/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  /*
   * DELETE: type/delete
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`type/delete/` + id)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
