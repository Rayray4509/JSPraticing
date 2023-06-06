function filter_array(testArray) {
    let index = -1,
        arrLength = testArray ? testArray.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arrLength) {
        let value = testArray[index];
        if (value != null && value !== '' && value !== undefined && !isNaN(value)  && value !== false && value !== 0) {
            result[++resIndex] = value;
        }
    }

    return result;
}
filter_array([NaN, 0, 15, false, -22, '',undefined, 47, null]); // [15, -22, 47]