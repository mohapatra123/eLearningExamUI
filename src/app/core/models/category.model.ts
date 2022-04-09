export interface Category {
    id: number;
    name: string;
    isActive: boolean;
}

export interface SubCategory{
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    duration: number;
    isActive: boolean;
}

export interface CategoryList{
    categoryId: number,
    categoryName: string
}

export interface Question{
    id: number;
    subCategoryId: number;
    content: string;
    isActive: boolean;
    option: string[];
    answer: number[];
    selectedAnswer: number[];
}

export interface Option{
    id: number,
    value: string
}