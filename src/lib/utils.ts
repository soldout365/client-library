import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BookCategoryType } from "@/types/book-category.type"
import type { BookCategoryTreeType } from "@/types/book-category.type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert flat array of categories to tree structure
 * Groups child categories into their parent categories
 */
export function convertCategoriesToTree(
	categories: BookCategoryType[]
): BookCategoryTreeType[] {
	// Filter parent categories (parent_id === null)
	const parentCategories = categories
		.filter((cat) => cat.parent_id === null)
		.map(({ parent_id, ...rest }) => rest) // Remove parent_id from parent categories

	// For each parent, find and attach its children
	return parentCategories.map((parent) => {
		const children = categories
			.filter((cat) => cat.parent_id === parent.id)
			.map(({ parent_id, ...rest }) => rest) // Remove parent_id from children

		return {
			...parent,
			...(children.length > 0 && { children })
		}
	})
}
