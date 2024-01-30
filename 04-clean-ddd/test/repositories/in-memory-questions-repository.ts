import { QuestionsRepository } from '@/domain/forum/application/repositories/questions'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<Question> {
    this.items.push(question)

    return question
  }
}
