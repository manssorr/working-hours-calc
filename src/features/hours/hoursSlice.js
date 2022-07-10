import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maximum: 20,
  minimum: 15,
  sarPerHour: 75,
  sarPerLE: 5.0,
  classA: {
    hours: 0,
    percentage: 100
  },
  classB: {
    hours: 0,
    percentage: 75
  },
  classC: {
    hours: 0,
    percentage: 50
  }
};

export const hoursReducer = createSlice({
  name: "hours",
  initialState,
  reducers: {
    handleSpecChange: (state, action) => {
      const { name, value } = action.payload;

      state[name] = Number(value);
    },
    handleClassesChangeValue: (state, action) => {
      const { name, value } = action.payload;
      state[name].hours = Number(value);
    },
    handleClassesChangePercentage: (state, action) => {
      const { name, value } = action.payload;
      state[name].percentage = Number(value);
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  handleSpecChange,
  handleClassesChangeValue,
  handleClassesChangePercentage
} = hoursReducer.actions;

export default hoursReducer.reducer;

// Selectors exports here

export const selectState = (state) => state.hours;
export const selectMaxHours = (state) => state.hours.maximum;
export const selectMinHours = (state) => state.hours.minimum;
export const selectsarPerHour = (state) => state.hours.sar;
export const selectSarPerLE = (state) => state.hours.sarPerLE;

export const selectDirects = (state) => {
  return {
    min: state.hours.minimum,
    max: state.hours.maximum,
    sarPerHour: state.hours.sarPerHour,
    sarPerLE: state.hours.sarPerLE
  };
};

export const selectClassA = (state) => state.hours.classA;
export const selectClassAHours = (state) => state.hours.classA.hours;
export const selectClassAPercentage = (state) => state.hours.classA.percentage;
export const selectClassATotal = (state) =>
  state.hours.classA.hours * state.hours.classA.percentage;

export const selectClassB = (state) => state.hours.classB;
export const selectClassBHours = (state) => state.hours.classB.hours;
export const selectClassBPercentage = (state) => state.hours.classB.percentage;
export const selectClassBTotal = (state) =>
  state.hours.classB.hours * state.hours.classB.percentage;

export const selectClassC = (state) => state.hours.classC;
export const selectClassCHours = (state) => state.hours.classC.hours;
export const selectClassCPercentage = (state) => state.hours.classC.percentage;
export const selectClassCTotal = (state) =>
  state.hours.classC.hours * (state.hours.classC.percentage / 100);

export const selectClasses = (state) => {
  return {
    classA: {
      hours: state.hours.classA.hours,
      percentage: state.hours.classA.percentage
    },
    classB: {
      hours: state.hours.classB.hours,
      percentage: state.hours.classB.percentage
    },
    classC: {
      hours: state.hours.classC.hours,
      percentage: state.hours.classC.percentage
    }
  };
};

export const selectTotal = (state) => {
  return {
    classATotal:
      state.hours.classA.hours * (state.hours.classA.percentage / 100),
    classBTotal:
      state.hours.classB.hours * (state.hours.classB.percentage / 100),
    classCTotal:
      state.hours.classC.hours * (state.hours.classC.percentage / 100),
    total: (
      state.hours.classA.hours * (state.hours.classA.percentage / 100) +
      state.hours.classB.hours * (state.hours.classB.percentage / 100) +
      state.hours.classC.hours * (state.hours.classC.percentage / 100)
    ).toFixed(2)
  };
};
