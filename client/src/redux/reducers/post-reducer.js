export default function postReducer(state={},action)

{
 switch (action.type) {
    case "SET_POST_DATA": {
      return { ...state, ...action.payload };
    }
    case "POST_ALL_REQUEST": {
      return { ...state,...action.payload }
    }
    case "POST_ALL_SUCCESS": {
      return { ...state, ...action.payload }
    }
    case "POST_ALL_FAILED": {
      return { ...state, ...action.payload }
    }
    default: {
      return { ...state }
    }

  }
}