import { useEffect, useReducer } from "react";
import { Button } from "react-daisyui";

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
  selectTotal,
  selectDirects,
  reset,
  handleSpecChange,
  handleClassesChangeValue,
  handleClassesChangePercentage
} from "./features/hours/hoursSlice";
import Badge from "./components/Badge";

export default function App() {
  const dispatch = useDispatch();

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    dispatch(reset());
    forceUpdate();

    console.log("🚀 ~ App reseted 🚽");
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

  return (
    <>
      {/* Container */}
      <div
        className="
        grid grid-cols-2
        "
      >
        {/* Left side */}
        <div className="flex flex-row flex-wrap justify-center items-start mt-4">
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
                  isInt={true}
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
          <Button onClick={handleClick}>🚀</Button>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-start flex-wrap justify-center items-center">
          {/* Badges */}
          <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-12 m-4">
            <Badge
              title="Total"
              type="main"
              value={total}
              max={max}
              min={min}
            />
            <Badge title="max" value={max} />
            <Badge title="min" value={min} />
            <Badge title="ClassA" value={classATotal} />
            <Badge title="ClassB" value={classBTotal} />
            <Badge title="ClassC" value={classCTotal} />
          </div>

          {/* Dashboard */}
          <div className="flex flex-col flex-wrap m-1">
            {/* Progresses  */}
            <LineProgress
              percentageA={(classATotal / max) * 100}
              percentageB={(classBTotal / max) * 100}
              percentageC={(classCTotal / max) * 100}
            />
            <div className="flex flex-row flex-wrap mt-4 justify-center items-center flex-grow">
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
      </div>
    </>
  );
}
