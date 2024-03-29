import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions'

interface FetchRecentQuestionsUseCaseParams {
  page: number
}

type FetchRecentQuestionsUseCaseReturn = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseParams): Promise<FetchRecentQuestionsUseCaseReturn> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
