import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface AnswerQuestionUseCaseParams {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseReturn {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseParams): Promise<AnswerQuestionUseCaseReturn> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}