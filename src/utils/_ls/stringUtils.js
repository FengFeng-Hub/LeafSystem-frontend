export const isEmpty = (str) => {
    return (!str || str === '') && str !== 0
}

export const isNotEmpty = (str) => {
    return !isEmpty(str)
}