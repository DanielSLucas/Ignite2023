import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments'

interface FetchQuestionCommentsUseCaseParams {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseReturn = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseParams): Promise<FetchQuestionCommentsUseCaseReturn> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
