import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteQuestionCommentUseCaseParams {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseParams): Promise<DeleteQuestionCommentUseCaseReturn> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
