import { AnswersRepository } from '@/domain/forum/application/repositories/answers'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer)

    return answer
  }
}