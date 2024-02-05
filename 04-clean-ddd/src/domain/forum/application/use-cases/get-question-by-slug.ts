import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'

interface GetQuestionBySlugUseCaseParams {
  slug: string
}

type GetQuestionBySlugUseCaseReturn = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseReturn> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
