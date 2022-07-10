import { useEffect, useReducer } from "react";
import { Button, Divider } from "react-daisyui";

import { saveState } from "./browser-storage";
import { debounce } from "debounce";
import { store } from "./store";

import {
  InputHours,
  InputMaxMin,
  InputItem,
  InputPercentage,
  InputView
} from "./components/InputItems";
import LineProgress from "./components/Progresses/LineProgress";
import RingProgress from "./components/Progresses/RingProgress";
import LineWrapper from "./components/Wrappers/LineWrapper";
import Wrapper from "./components/Wrappers/Wrapper";
import colors from "./assets/colors";

import { useDispatch, useSelector } from "react-redux";
import {
  selectClasses,
  selectMaxHours,
  selectMinHours,
  selectTotal,
  selectSarPerHour,
  selectSarPerLE,
  handleSpecChange,
  handleClassesChangeValue,
  handleClassesChangePercentage,
  selectDirects
} from "./features/hours/hoursSlice";
import Badge from "./components/Badge";

export default function App() {
  const dispatch = useDispatch();

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  const { max, min, sarPerHour, sarPerLE } = useSelector(selectDirects);

  const { classATotal, classBTotal, classCTotal, total } =
    useSelector(selectTotal);

  const { classA, classB, classC } = useSelector(selectClasses);

  useEffect(() => console.log("re-render because max changed:", max), [max]);

  const handleOne = (name, value, type) => {
    dispatch(handleSpecChange({ name, value }));
  };

  const handleTwo = (name, value, title) => {
    title.includes("Hours")
      ? dispatch(handleClassesChangeValue({ name, value }))
      : dispatch(handleClassesChangePercentage({ name, value }));
  };

  const ifNotNaNGetZero = (value) => (isNaN(value) ? 0 : value);

  // here we subscribe to the store changes
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );

  return (
    <>
      {/* Container */}
      <div
        className="
          flex
          flex-row
          justify-center
          flex-wrap
          w-full
        "
      >
        {/* Left side */}
        <div className="flex flex-row items-start flex-wrap">
          {/* Hours */}
          <Wrapper title="Hours">
            <LineWrapper>
              <InputMaxMin
                title="Maximum"
                name="maximum"
                val={max}
                onChange={handleOne}
                max={max}
                min={min}
                type="max"
              />

              <InputMaxMin
                title="Minimum"
                name="minimum"
                val={min}
                onChange={handleOne}
                max={max}
                min={min}
                type="min"
              />
            </LineWrapper>

            {/* Money */}
            <Wrapper title="Income">
              <LineWrapper>
                <InputItem
                  title="SAR/Hour"
                  name="sarPerHour"
                  val={sarPerHour}
                  onChange={handleOne}
                />
                <InputItem
                  title="SAR/LE"
                  name="sarPerLE"
                  val={sarPerLE}
                  onChange={handleOne}
                />
                <InputView
                  title="Salary/SR"
                  val={sarPerHour * total}
                  unit="SR"
                />
                {/* <InputView
                  title="Salary/LE"
                  val={sarPerHour * total * sarPerLE}
                  unit="LE"
                /> */}
              </LineWrapper>
            </Wrapper>
          </Wrapper>

          {/* Classes */}
          <Wrapper title="Classes">
            <LineWrapper>
              {/* A Hours */}
              <InputHours
                title="A Hours"
                name="classA"
                val={classA.hours}
                onChange={handleTwo}
                total={total}
                max={max}
                isConditional={true}
              />
              {/* A Percentage */}
              <InputPercentage
                title="A %"
                name="classA"
                val={classA.percentage}
                onChange={handleTwo}
              />
            </LineWrapper>
            <LineWrapper>
              {/* B Hours */}
              <InputHours
                title="B Hours"
                name="classB"
                val={classB.hours}
                onChange={handleTwo}
                total={total}
                max={max}
                isConditional={true}
              />
              {/* B Percentage */}
              <InputPercentage
                title="B %"
                name="classB"
                val={classB.percentage}
                onChange={handleTwo}
              />
            </LineWrapper>
            <LineWrapper>
              {/* C Hours */}
              <InputHours
                title="C Hours"
                name="classC"
                val={classC.hours}
                onChange={handleTwo}
                total={total}
                max={max}
                isConditional={true}
              />
              {/* C Percentage */}
              <InputPercentage
                title="C %"
                name="classC"
                val={classC.percentage}
                onChange={handleTwo}
              />
            </LineWrapper>
          </Wrapper>
        </div>
        <Button onClick={handleClick}>🚀</Button>
        <Divider vertical={true} />

        {/* Right side */}
        <div>
          {/* Badges */}

          <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-12">
            <Badge title="Total" type="main" value={total} />
            <Badge title="max" value={max} />
            <Badge title="min" value={min} />
            <Badge title="ClassA" value={classATotal} />
            <Badge title="ClassB" value={classBTotal} />
            <Badge title="ClassC" value={classCTotal} />
          </div>

          {/* Progresses  */}
          <LineProgress
            percentageA={(classATotal / max) * 100}
            percentageB={(classBTotal / max) * 100}
            percentageC={(classCTotal / max) * 100}
          />

          {/* Dashboard */}
          <div className="flex flex-row flex-wrap">
            <RingProgress
              title="Class A"
              color={colors.classA}
              percent={ifNotNaNGetZero(
                ((classATotal / total) * 100).toFixed(0)
              )}
            />
            <RingProgress
              title="Class B"
              color={colors.classB}
              percent={ifNotNaNGetZero(
                ((classBTotal / total) * 100).toFixed(0)
              )}
            />
            <RingProgress
              title="Class C"
              color={colors.classC}
              percent={ifNotNaNGetZero(
                ((classCTotal / total) * 100).toFixed(0)
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
