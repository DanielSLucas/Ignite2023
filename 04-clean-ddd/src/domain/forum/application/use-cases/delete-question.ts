import { QuestionsRepository } from '../repositories/questions'

interface DeleteQuestionUseCaseParams {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseReturn = void

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseParams): Promise<DeleteQuestionUseCaseReturn> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
