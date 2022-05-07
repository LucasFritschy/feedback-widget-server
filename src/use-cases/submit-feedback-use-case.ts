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

  async execute(request: SubmitFeedbackUseCaseRequest): Promise<void> {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Screenshot must be a base64 encoded PNG image')
    }

    await this.feedbacksRepository.create({ type, comment, screenshot })
    await this.mailAdapter.sendMail({
      subject: `Feedback do usuário: ${type}`,
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Novo feedback de ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`
      ].join('\n')
    })
  }
}