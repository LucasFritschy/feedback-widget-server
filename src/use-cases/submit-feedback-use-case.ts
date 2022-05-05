import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) { }

  async execute({type, comment, screenshot}: SubmitFeedbackUseCaseRequest): Promise<void> {
    await this.feedbacksRepository.create({ type, comment, screenshot })
    await this.mailAdapter.sendMail({
      subject: `Feedback do usuário: ${type}`,
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Novo feedback de ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
      ].join('\n')
    })
  }
}