import { userConstants } from "../constants/user.constants";

export function users(
  state = {
    tableVisible: false,
    tableSpinner: false,
    tabindexval: 0,

    jobSpinner: false,
    jobVisible: false,
    job: []
  },
  action
) {
  switch (action.type) {
    case userConstants.GET_ALL_JOB:
      console.log("in getall dispatch");

      return {
        ...state,
        tableSpinner: true
      };

    case userConstants.GET_ALL_JOB_SUCCESS:
      let tbIndex;
      if(state.tabindexval===1){tbIndex=1}
      else{tbIndex=state.tabindexval+1}
      return {
        ...state,
        jobs: [...action.data],
        tableSpinner: false,
        tableVisible: true,
        tabindexval: state.tabindexval+1
      };

    case userConstants.GET_ALL_JOB_FAILURE:
      return{
        ...state,
        tableSpinner:false
      }


      case userConstants.GET_PREV_ALL_JOB_SUCCESS:
      return {
        ...state,
        jobs: [...action.data],
        tableSpinner: false,
        tableVisible: true,
        tabindexval: state.tabindexval-1
      };

      case userConstants.GET_SINGLE_JOB:
        return{
          ...state,
          jobSpinner: true
        };

      case userConstants.GET_SINGLE_JOB_SUCCESS:
          return{
            ...state,
            jobSpinner: false,
            jobVisible: true,
            job: [...action.data]
          };
      case userConstants.GET_SINGLE_JOB_FAILURE:
            return{
              ...state,
              jobSpinner: false
            };

    default:
      return state;
  }
}
