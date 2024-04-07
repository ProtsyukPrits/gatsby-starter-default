import React, { useState } from "react"
import { Datepicker } from "headless-datetimepicker"
import classNames from "classnames"
import { Chevron } from "../components/icons"

const ukrainianMonths = {
  January: "Січень",
  February: "Лютий",
  March: "Березень",
  April: "Квітень",
  May: "Травень",
  June: "Червень",
  July: "Липень",
  August: "Серпень",
  September: "Вересень",
  October: "Жовтень",
  November: "Листопад",
  December: "Грудень",
}

const ukrainianDaysOfWeek = {
  Sunday: "Нд",
  Monday: "Пн",
  Tuesday: "Вт",
  Wednesday: "Ср",
  Thursday: "Чт",
  Friday: "Пт",
  Saturday: "Сб",
}

const IndexPage = () => {
  const [value, setValue] = useState(null)
  // Функція, що повертає перше число поточного місяця
  const getFirstDayOfMonth = date => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1)
  }

  // Визначаємо перше число поточного місяця
  const firstDayOfMonth = getFirstDayOfMonth(new Date())

  // Якщо перше число - середа або пізніше, то знаходимо перше понеділок місяця
  if (firstDayOfMonth.getDay() > 2) {
    firstDayOfMonth.setDate(
      firstDayOfMonth.getDate() + (8 - firstDayOfMonth.getDay())
    )
  }

  return (
    <div>
      <Datepicker startOfWeek={1} value={value} onChange={setValue}>
        <Datepicker.Picker
          defaultType="day"
          alwaysOpen
          className=" p-4 dark:bg-gray-800 dark:text-gray-300 w-[482px]"
        >
          {({ monthName, year }) => (
            <>
              <div className="flex w-full items-center justify-between space-x-6 rtl:space-x-reverse">
                <div className="flex">
                  <Datepicker.Button
                    action="toggleMonth"
                    className="leading-2 p-2 text-lg rounded-lg font-semibold cursor-auto	"
                  >
                    {ukrainianMonths[monthName]}
                  </Datepicker.Button>
                  <Datepicker.Button
                    action="toggleYear"
                    className="leading-2 p-2 text-lg rounded-lg font-semibold cursor-auto	"
                  >
                    {year}
                  </Datepicker.Button>
                </div>
                <div className="flex gap-x-5">
                  <Datepicker.Button
                    action="prev"
                    className="rounded-full p-2 text-sm font-medium rotate-180 rtl:rotate-180"
                  >
                    <Chevron className="hover:fill-blue-400" />
                  </Datepicker.Button>

                  <Datepicker.Button
                    action="next"
                    className="rounded-full p-2 text-sm font-medium rtl:rotate-180"
                  >
                    <Chevron className="hover:fill-blue-400" />
                  </Datepicker.Button>
                </div>
              </div>
              <Datepicker.Items
                className={({ type }) =>
                  classNames(
                    "grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth pt-6",
                    type === "day" && "grid-cols-7",
                    type === "month" && "grid-cols-3",
                    type === "year" && "max-h-[274px] grid-cols-4"
                  )
                }
              >
                {({ items }) =>
                  items.map(item => (
                    <Datepicker.Item
                      key={item.key}
                      item={item}
                      className={classNames(
                        "grid items-center justify-center rounded-full  text-sm font-medium select-none",
                        item.isHeader
                          ? "cursor-default"
                          : "hover:bg-blue-600 hover:text-white",
                        "isInCurrentMonth" in item && item.isInCurrentMonth
                          ? "text-gray-500"
                          : "",
                        item.type === "day" && "h-8 w-8",
                        item.isSelected && "bg-blue-600 text-white",
                        item.isToday && "border border-gray-500"
                      )}
                      action={
                        item.type === "day"
                          ? "close"
                          : item.type === "month"
                          ? "showDay"
                          : "showMonth"
                      }
                    >
                      {item.isHeader
                        ? ukrainianDaysOfWeek[item.text]
                        : item.text}
                    </Datepicker.Item>
                  ))
                }
              </Datepicker.Items>
              {/* <Datepicker.Button
                action="today"
                className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600 hover:text-white"
              >
                Today
              </Datepicker.Button> */}
            </>
          )}
        </Datepicker.Picker>
      </Datepicker>
    </div>
  )
}

export default IndexPage
