export type FilterCategoryApi ={
    id: number,
    title: string
}

export type FilterCategoryModel = {
    key: string,
    value: string
}

export const normalizeFilterCategoryApi = (from: FilterCategoryApi): FilterCategoryModel => ({
    key: String(from.id),
    value: from.title
})