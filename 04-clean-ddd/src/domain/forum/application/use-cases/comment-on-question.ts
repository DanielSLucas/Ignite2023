import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentOnQuestionUseCaseParams {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseReturn = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseParams): Promise<CommentOnQuestionUseCaseReturn> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
