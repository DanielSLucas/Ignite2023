import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentOnAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseReturn = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseParams): Promise<CommentOnAnswerUseCaseReturn> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
