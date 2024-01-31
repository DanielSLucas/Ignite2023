import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers'

interface FetchQuestionAnswersUseCaseParams {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseReturn {
  answers: Answer[]
}

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

    return { answers }
  }
}
