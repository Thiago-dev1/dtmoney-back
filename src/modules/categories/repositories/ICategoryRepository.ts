import ICategory from '../../../models/interfaces/ICategory'

export default interface ICategoryRepository {
	create(title: string): Promise<ICategory>
	getByTitle(title: string): Promise<ICategory>
	listAll(): Promise<ICategory[]>
	// delete(id: string): Promise<void>
	// update(id: string, title: string): Promise<void>
	// findById(id: string): Promise<ICategory>
}
