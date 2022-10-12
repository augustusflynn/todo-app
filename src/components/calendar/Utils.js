import moment from "moment";

export const initialState = {
  showYearTable: false,
  showMonthTable: false,
  showDateTable: true,
  dateObject: moment(),
  allmonths: moment.months()
};

const UPDATE_STATE = "UPDATE_STATE";

export const dispatchUpdateState = (payload) => ({ type: UPDATE_STATE, payload: payload })

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      throw new Error("Lỗi thực thi");
  }
}