import { useEffect, useReducer, useState } from "react";
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

  const [reseted, setReseted] = useState(false);

  function handleClick() {
    dispatch(reset());
    setReseted((e) => !e);
    console.log("🚀 ~ App Reset-ed 🚽");
  }

  const { max, min, sarPerHour, sarPerLE } = useSelector(selectDirects);

  const { classATotal, classBTotal, classCTotal, total } =
    useSelector(selectTotal);

  const { classA, classB, classC } = useSelector(selectClasses);

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
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          width: "100vw"
        }}
        className="
        grid grid-flow-col auto-cols-min md:md:auto-cols-max
        gap-4
        max-w-full
        md:h-full        "
      >
        {/* Left side */}
        <div className=" flex flex-row flex-wrap justify-center items-center mt-4">
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
                reset={reseted}
              />

              <InputMaxMin
                title="Minimum"
                name="minimum"
                val={min}
                onChange={handleOne}
                max={max}
                min={min}
                type="min"
                reset={reseted}
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
                  reset={reseted}
                />
                <InputItem
                  title="SAR/LE"
                  name="sarPerLE"
                  val={sarPerLE}
                  onChange={handleOne}
                  reset={reseted}
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
                reset={reseted}
              />
              {/* A Percentage */}
              <InputPercentage
                title="A %"
                name="classA"
                val={classA.percentage}
                onChange={handleTwo}
                reset={reseted}
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
                reset={reseted}
              />
              {/* B Percentage */}
              <InputPercentage
                title="B %"
                name="classB"
                val={classB.percentage}
                onChange={handleTwo}
                reset={reseted}
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
                reset={reseted}
              />
              {/* C Percentage */}
              <InputPercentage
                title="C %"
                name="classC"
                val={classC.percentage}
                onChange={handleTwo}
                reset={reseted}
              />
            </LineWrapper>
          </Wrapper>
          <Button onClick={handleClick}>🚀</Button>
        </div>

        {/* Right side */}
        <div className=" flex flex-col flex-wrap justify-center items-center">
          {/* Badges */}
          <div
            className="flex flex-col gap-6 flex-wrap justify-center mt-4
            w-full
          "
          >
            <LineProgress
              className="mx-4 mb-4"
              percentageA={(classATotal / max) * 100}
              percentageB={(classBTotal / max) * 100}
              percentageC={(classCTotal / max) * 100}
            />
            <Badge
              className="mx-4"
              title="Total"
              type="main"
              value={total}
              max={max}
              min={min}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4 m-4">
            <Badge title="max" value={ifNotNaNGetZero(max).toFixed(2)} />
            <Badge title="min" value={ifNotNaNGetZero(min).toFixed(2)} />
            <Badge
              title="ClassA"
              value={ifNotNaNGetZero(classATotal).toFixed(2)}
            />
            <Badge
              title="ClassB"
              value={ifNotNaNGetZero(classBTotal).toFixed(2)}
            />
            <Badge
              title="ClassC"
              value={ifNotNaNGetZero(classCTotal).toFixed(2)}
            />
          </div>

          {/* Dashboard */}
          <div className="flex flex-col flex-wrap m-1">
            {/* Progresses  */}
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
