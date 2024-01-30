import { QuestionsRepository } from '@/domain/forum/application/repositories/questions'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async create(question: Question): Promise<Question> {
    this.items.push(question)

    return question
  }
}
