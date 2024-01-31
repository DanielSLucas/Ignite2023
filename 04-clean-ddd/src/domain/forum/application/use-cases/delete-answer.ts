import { AnswersRepository } from '../repositories/answers'

interface DeleteAnswerUseCaseParams {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseReturn = void

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseParams): Promise<DeleteAnswerUseCaseReturn> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
