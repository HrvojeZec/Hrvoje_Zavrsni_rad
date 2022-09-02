import { Input, Select, SimpleGrid, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import React, { useState } from "react";

import { capitalize } from "../../../utils/string.utils";

function calculateMaxYear(minYears) {
    return dayjs().startOf("day").subtract(minYears, "years").year();
}

function generateNumberArray(min, size) {
    return Array(size + 1)
        .fill()
        .map((v, i) => i + min);
}

function generateSelectOptions(arr) {
    return arr.map((it) => ({ value: it.toString(), label: it.toString() }));
}

function getMonthDisplayName(month) {
    const monthStr = (month + 1).toString().padStart(2, "0");
    return capitalize(dayjs(`2000-${monthStr}-01`).format("MMMM"));
}

function generateMonthOptions(arr) {
    return arr.map((it) => ({ value: it.toString(), label: getMonthDisplayName(it) }));
}

export function DateOfBirthSelect({ label, minYears, value, readOnly, error, onChange }) {
    console.log({ label, minYears, value, readOnly, error });
    const date = value ? dayjs(value) : undefined;
    console.log(date);
    console.log(date?.year()?.toString());
    const [selectedYear, setSelectedYear] = useState(date?.year()?.toString());
    const [selectedMonth, setSelectedMonth] = useState(date?.month()?.toString());
    const [selectedDay, setSelectedDay] = useState(date?.date()?.toString());

    const maxYear = calculateMaxYear(minYears);

    const dayValues = generateNumberArray(1, 30);
    const monthValues = generateNumberArray(0, 11); // Months are 0-based, e.g. Jan = 0, Feb = 1, ...
    const yearValues = generateNumberArray(1900, maxYear - 1900).reverse();

    function handleOnChange(yearStr, monthStr, dayStr) {
        if (yearStr === undefined || monthStr === undefined || dayStr === undefined) {
            return;
        }
        onChange(new Date(parseInt(yearStr), parseInt(monthStr), parseInt(dayStr)));
    }

    if (readOnly) {
        return (
            <Input.Wrapper label={label}>
                <SimpleGrid cols={3}>
                    <TextInput value={selectedDay} readOnly={readOnly} />
                    <TextInput value={getMonthDisplayName(selectedMonth)} readOnly={readOnly} />
                    <TextInput value={selectedYear} readOnly={readOnly} />
                </SimpleGrid>
            </Input.Wrapper>
        );
    }

    return (
        <Input.Wrapper label={label} error={error}>
            <SimpleGrid cols={3}>
                <Select
                    value={selectedDay}
                    data={generateSelectOptions(dayValues)}
                    readOnly={readOnly}
                    onChange={(day) => {
                        setSelectedDay(day);
                        handleOnChange(selectedYear, selectedMonth, day);
                    }}
                />
                <Select
                    value={selectedMonth}
                    data={generateMonthOptions(monthValues)}
                    readOnly={readOnly}
                    onChange={(month) => {
                        setSelectedMonth(month);
                        handleOnChange(selectedYear, month, selectedDay);
                    }}
                />
                <Select
                    value={selectedYear}
                    data={generateSelectOptions(yearValues)}
                    readOnly={readOnly}
                    onChange={(year) => {
                        setSelectedYear(year);
                        handleOnChange(year, selectedMonth, selectedDay);
                    }}
                />
            </SimpleGrid>
        </Input.Wrapper>
    );
}
