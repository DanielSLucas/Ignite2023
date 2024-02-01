import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteAnswerUseCaseParams {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseParams): Promise<DeleteAnswerUseCaseReturn> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
