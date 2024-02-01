import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionUseCaseParams {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseParams): Promise<DeleteQuestionUseCaseReturn> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
