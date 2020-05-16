import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../helpers/history";

const login = (username, password) => {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

const register = (user) => {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
};

const getAllJob = (req) => {
  return (dispatch) => {
    dispatch(submit());

    userService.getAllJob(req).then(
      (data) => {
        if (data.length > 0) {
          console.log("in getall job user actions");
          console.log(data);
          dispatch(success(data));
        } else {
          dispatch(failure("No Job Posting Found"));
          dispatch(alertActions.error("No Job Posting Found"));

          setTimeout(() => {
            dispatch(alertActions.clear());
          }, 3000);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));

        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    );
  };

  function submit(data) {
    return { type: userConstants.GET_ALL_JOB, data };
  }
  function success(data) {
    return { type: userConstants.GET_ALL_JOB_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_ALL_JOB_FAILURE, error };
  }
};

const getPrevAllJob = (req) => {
  return (dispatch) => {
    dispatch(submit());

    userService.getAllJob(req).then(
      (data) => {
        if (data.length > 0) {
          dispatch(success(data));
        } else {
          dispatch(failure("No Job Posting Found"));
          dispatch(alertActions.error("No Job Posting Found"));
          setTimeout(() => {
            dispatch(alertActions.clear());
          }, 3000);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    );
  };

  function submit(data) {
    return { type: userConstants.GET_ALL_JOB, data };
  }
  function success(data) {
    return { type: userConstants.GET_PREV_ALL_JOB_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_ALL_JOB_FAILURE, error };
  }
};

const getSingleJob = (url) => {
  return (dispatch) => {
    dispatch(submit());

    userService.getSingleJob(url).then(
      (data) => {
        if (data.length > 0) {
          dispatch(success(data));
        } else {
          dispatch(failure("No Job Posting Found"));
          dispatch(alertActions.error("No Job Posting Found"));
          setTimeout(() => {
            dispatch(alertActions.clear());
          }, 3000);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    );
  };

  function submit(data) {
    return { type: userConstants.GET_SINGLE_JOB, data };
  }
  function success(data) {
    return { type: userConstants.GET_SINGLE_JOB_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_SINGLE_JOB_FAILURE, error };
  }
};

const singleJobClick = (job) => {
  return (dispatch) => {
    dispatch(submit(job));
  };

  function submit(job) {
    return { type: userConstants.GET_SINGLE_JOB, job };
  }
};

export const userActions = {
  login,
  logout,
  register,
  getAllJob,
  getPrevAllJob,
  getSingleJob,
  singleJobClick,
};
