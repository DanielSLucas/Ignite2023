import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions'

interface GetQuestionBySlugUseCaseParams {
  slug: string
}

interface GetQuestionBySlugUseCaseReturn {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseReturn> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
