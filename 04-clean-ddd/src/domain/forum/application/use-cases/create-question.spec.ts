import { QuestionsRepository } from '../repositories/questions'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRespository: QuestionsRepository = {
  create: vi.fn(),
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRespository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Example question title',
    content: 'Example question content',
  })

  expect(question).toBeTruthy()
})
