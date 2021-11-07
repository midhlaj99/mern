export default function authReducer(state={},action)

{
 switch (action.type) {
    case "AUTH_SET_DATA": {
      return { ...state,...action.payload }
    }
     case "AUTH_ALL_REQUEST": {
      return { ...state,...action.payload }
    }
    case "AUTH_ALL_SUCCESS": {
      return { ...state, ...action.payload }
    }
    case "AUTH_ALL_FAILED": {
      return { ...state, ...action.payload }
    }
    default: {
      return { ...state }
    }

  }
}