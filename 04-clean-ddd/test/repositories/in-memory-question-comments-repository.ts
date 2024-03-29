import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<QuestionComment> {
    this.items.push(questionComment)

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString(),
    )

    this.items.splice(questionCommentIndex, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) return null

    return questionComment
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questioncomments = this.items
      .filter(
        (questioncomment) =>
          questioncomment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return questioncomments
  }
}
