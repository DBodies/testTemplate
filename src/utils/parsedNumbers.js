const parseNumber = (number, defaultNumber) => {
    const isString = typeof number === 'string'
    if(!isString) return defaultNumber
    const parsedNumber = parseInt(number)
    if(Number.isNaN(parsedNumber)) {
        return defaultNumber
    }
    return parsedNumber
}
export const parsePaginationParams = (query) => {
    const {page, perPage} = query

    const parsedPage = parseNumber(page, 1)
    const parsedPerPage = parseNumber(perPage, 10)

    return {
        page: parsedPage,
        perPage: parsedPerPage
    }
}

export const calculatePaginationData = (count, page, perPage) => {
    const totalPage = Math.ceil(count / perPage)
    const hasPreviousPage = page !== 1
    const hasNextPage = Boolean(totalPage - page)

    return {
        page,
        perPage,
        totalItems: count,
        totalPage,
        hasPreviousPage,
        hasNextPage
    }
}