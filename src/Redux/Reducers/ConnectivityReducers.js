const initialState = {
    metamaskAddress: "",
    metamaskBalance: "",
    metamaskNetwork: "",
    LaunchpadList: [],
    metamaskConnect: false,
  };
  
  export function ConnectivityReducer(state = initialState, action) {
    switch (action.type) {
      case "WALLET_DISCONNECT":
        return {
          metamaskBalance: "",
          metamaskNetwork: "",
          metamaskConnect: false,
          referURL: "",
        };
      case "LAUNCHPAD_LIST":
        return {
          LaunchpadList: action.payload,
        };
      default:
        return state;
    }
  }