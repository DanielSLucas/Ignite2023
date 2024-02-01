import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers'

interface FetchQuestionAnswersUseCaseParams {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseReturn = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseParams): Promise<FetchQuestionAnswersUseCaseReturn> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
