import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers"

interface AnswerQuestionUseCaseParams {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseParams) {
    const answer = new Answer({
      content, 
      authorId: instructorId, 
      questionId
    })

    await this.answersRepository.create(answer)

    return answer
  }
}