import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers'

const fakeAnswersRespository: AnswersRepository = {
  create: vi.fn()
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRespository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '1',
    instructorId: '1'
  })

  expect(answer.content).toEqual('Nova resposta')
})