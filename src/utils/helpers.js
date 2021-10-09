import CircularProgress from "@material-ui/core/CircularProgress";
// import * as _ from "lodash";

export class Helpers {
  static Spinner() {
    return (
      <React.Fragment>
        <div className="pos-center">
          <CircularProgress disableShrink />
        </div>
      </React.Fragment>
    );
  }

  //#region check
  static checkIsNotNull(data) {
    return data !== undefined && data !== null && data !== "" && data.length;
  }
  // static responseCheck: (res) => {
  //   // if(res)

  //   // const responseJson = {
  //   //   code: 200,
  //   //   status: "ok",
  //   //   message: "ok",
  //   //   results: data,
  //   // };

  //   // const mergedData = {
  //   //   ...responseJson,
  //   //   ...additionalData,
  //   // };

  //   // res.status(200).json(mergedData);
  // },
  //#endregion
  //#region objects
  // keys: as a string example to use: getValueObjects(object, "a.b.c.d")
  static getValueObjects = (object, keys) =>
    keys.split(".").reduce((o, k) => (o || {})[k], object);

  static parseObjectsToQueryString = (url, params) =>
    url +
    Object.keys(params)
      .map((key) => params[key])
      .join("&");

  static diffObjects = (newObj, oldObj) => {
    let diff = Object.keys(newObj).reduce((diff, key) => {
      if (newObj[key] === oldObj[key]) return diff;
      return {
        ...diff,
        [key]: newObj[key],
      };
    }, {});
    return diff;
    //! use lodash here?
    // return _.reduce(
    //   newObj,
    //   function (result, value, key) {
    //     if (!_.isEqual(value, oldObj[key])) {
    //       if (_.isArray(value)) {
    //         result[key] = [];
    //         _.forEach(value, function (innerObjFrom1, index) {
    //           if (_.isNil(oldObj[key][index])) {
    //             result[key].push(innerObjFrom1);
    //           } else {
    //             let changes = Helpers.diffObjects(
    //               innerObjFrom1,
    //               oldObj[key][index]
    //             );
    //             if (!_.isEmpty(changes)) {
    //               result[key].push(changes);
    //             }
    //           }
    //         });
    //       }
    //       // else if (_.isObject(value)) {
    //       //   result[key] = Helpers.diffObjects(value, oldObj[key]);
    //       // }
    //       else {
    //         result[key] = value;
    //       }
    //     }
    //     return result;
    //   },
    //   {}
    // );
  };

  static diffArrayObjects = (current, otherArray, filterKey = "_id") => {
    return current.filter(
      ({ [filterKey]: currentKey }) =>
        !otherArray.some(({ [filterKey]: otherKey }) => currentKey === otherKey)
    );
  };
  //#endregion

  //#region simulator
  static simulateNetworkRequest(timer = 2000) {
    return new Promise((resolve) => setTimeout(resolve, timer));
  }
  //#endregion

  //#region stored
  static useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to React.useState so logic is only executed once
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of React.useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as React.useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }
  //#endregion

  //#region validation
  static validatePassword(value) {
    if (value.length < 6) {
      return "Password should be at-least 6 characters.";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
    ) {
      return "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.";
    }
    return true;
  }
  //#endregion

  //#region convert
  static convertToCurrency(value, decimal_point = 0, dot = ",") {
    return value
      .toFixed(decimal_point)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + dot);
  }
  //#endregion
}
