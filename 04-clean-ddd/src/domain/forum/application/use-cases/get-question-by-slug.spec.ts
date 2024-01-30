import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    inMemoryQuestionsRepository.create(
      Question.create({
        authorId: new UniqueEntityID('1'),
        title: 'Example question title',
        content: 'Example question content',
      }),
    )

    const { question } = await sut.execute({ slug: 'example-question-title' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Example question title')
  })

  it('should not be able to get a question by slug if not exists', async () => {
    await expect(() => {
      return sut.execute({ slug: 'non-existent-question-slug' })
    }).rejects.toBeInstanceOf(Error)
  })
})
