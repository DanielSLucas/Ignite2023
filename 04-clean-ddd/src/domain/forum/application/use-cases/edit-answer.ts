import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers'

interface EditAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseReturn {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseParams): Promise<EditAnswerUseCaseReturn> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
